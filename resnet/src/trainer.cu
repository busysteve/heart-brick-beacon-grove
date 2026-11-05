#include "resnet/trainer.hpp"

#include "resnet/loss.hpp"
#include "resnet/optimizer.hpp"
#include "resnet/checkpoint.hpp"

#include <algorithm>
#include <chrono>
#include <iostream>
#include <numeric>
#include <random>
#include <utility>

namespace resnet {
namespace {

template <typename T>
T run_split(ResNet<T>& model, const MnistSplit& split, int batch_size, bool training, LossWorkspace<T>& loss_ws,
            DeviceBuffer<int>& labels_d, Tensor<T>& images, SgdMomentum<T>* sgd, AdamW<T>* adam, T& mean_loss,
            int log_interval, std::uint64_t seed, int epoch) {
  std::vector<int> order(static_cast<std::size_t>(split.size()));
  std::iota(order.begin(), order.end(), 0);
  if (training) {
    std::mt19937 rng(static_cast<std::uint32_t>(seed + static_cast<std::uint64_t>(epoch) * 9973u));
    std::shuffle(order.begin(), order.end(), rng);
    model.train(true);
  } else {
    model.eval();
  }

  const int classes = model.num_classes();
  long long correct = 0;
  long long seen = 0;
  double loss_sum = 0;
  int batches = 0;
  int since_log = 0;
  double window_loss = 0;
  HostBatch host;
  Tensor<T> grad;
  std::vector<NamedParam<T>> params;
  if (training) model.collect_parameters("", params);

  for (int begin = 0; begin < split.size(); begin += batch_size) {
    const int batch = std::min(batch_size, split.size() - begin);
    fill_batch(split, order, begin, batch, host);
    for (int i = 0; i < batch; ++i) {
      const int label = host.labels[static_cast<std::size_t>(i)];
      if (label < 0 || label >= classes) {
        throw Error("label " + std::to_string(label) + " outside 0.." + std::to_string(classes - 1));
      }
    }
    images.resize({batch, 1, split.rows, split.cols});
    images.from_host(host.images);
    labels_d.resize(static_cast<std::size_t>(batch));
    labels_d.copy_from_host(host.labels.data(), static_cast<std::size_t>(batch));

    Tensor<T>& logits = model.forward(images);
    if (logits.rank() != 2 || logits.dim(0) != batch || logits.dim(1) != classes) {
      throw Error("model logits are not [batch, classes]");
    }

    T* grad_ptr = nullptr;
    if (training) {
      grad.resize({batch, classes});
      grad_ptr = grad.data();
    }
    const T loss = softmax_cross_entropy_cuda<T>(logits.data(), labels_d.data(), grad_ptr, batch, classes, loss_ws);
    const int hit = count_correct_cuda<T>(logits.data(), labels_d.data(), batch, classes, loss_ws);
    correct += hit;
    seen += batch;
    loss_sum += static_cast<double>(loss);
    ++batches;
    window_loss += static_cast<double>(loss);
    ++since_log;

    if (training) {
      model.zero_grad();
      model.backward(grad);
      if (adam != nullptr) adam->step(params);
      else sgd->step(params);
      if (log_interval > 0 && since_log >= log_interval) {
        std::cout << "  epoch " << epoch << "  step " << (begin / batch_size + 1) << "  loss "
                  << (window_loss / since_log) << "  lr " << (adam != nullptr ? adam->lr() : sgd->lr())
                  << std::endl;
        window_loss = 0;
        since_log = 0;
      }
    }
  }
  mean_loss = batches == 0 ? T(0) : static_cast<T>(loss_sum / batches);
  if (seen == 0) return T(0);
  return static_cast<T>(static_cast<double>(correct) / static_cast<double>(seen));
}

}  // namespace

template <typename T>
std::vector<EpochStats<T>> train_mnist(CudnnContext&, ResNet<T>& model, const MnistSplit& train,
                                       const MnistSplit* test, const TrainConfig<T>& config) {
  if (train.size() <= 0) throw Error("training split is empty");
  if (config.epochs <= 0 || config.batch_size <= 0) throw Error("epochs and batch size must be positive");
  if (train.rows <= 0 || train.cols <= 0) throw Error("MNIST spatial size is invalid");

  SgdMomentum<T> sgd(config.lr, config.momentum, config.weight_decay);
  AdamW<T> adam(config.lr, config.weight_decay);
  SgdMomentum<T>* sgd_ptr = config.adamw ? nullptr : &sgd;
  AdamW<T>* adam_ptr = config.adamw ? &adam : nullptr;

  LossWorkspace<T> loss_ws;
  DeviceBuffer<int> labels;
  Tensor<T> images;
  std::vector<EpochStats<T>> history;
  history.reserve(static_cast<std::size_t>(config.epochs));
  T best_accuracy = -1;
  bool saved = false;

  std::cout << "train " << train.size() << "  test " << (test != nullptr ? test->size() : 0) << "  batch "
            << config.batch_size << "  arch " << model.spec().name << std::endl;

  for (int epoch = 1; epoch <= config.epochs; ++epoch) {
    if (config.epochs >= 4 && (epoch == config.epochs / 2 || epoch == (3 * config.epochs) / 4)) {
      const T next = (adam_ptr != nullptr ? adam_ptr->lr() : sgd_ptr->lr()) * T(0.1);
      if (adam_ptr != nullptr) adam_ptr->set_lr(next);
      else sgd_ptr->set_lr(next);
      std::cout << "learning rate -> " << next << std::endl;
    }
    const auto t0 = std::chrono::steady_clock::now();
    T train_loss = 0;
    const T train_acc = run_split<T>(model, train, config.batch_size, true, loss_ws, labels, images, sgd_ptr,
                                     adam_ptr, train_loss, config.log_interval, config.seed, epoch);
    T test_acc = -1;
    if (test != nullptr && test->size() > 0) {
      T ignored = 0;
      test_acc = run_split<T>(model, *test, config.batch_size, false, loss_ws, labels, images, nullptr, nullptr,
                              ignored, 0, config.seed, epoch);
      model.train(true);
    }
    const double seconds = std::chrono::duration<double>(std::chrono::steady_clock::now() - t0).count();
    std::cout << "epoch " << epoch << "/" << config.epochs << "  loss " << train_loss << "  train_acc "
              << train_acc;
    if (test_acc >= T(0)) std::cout << "  test_acc " << test_acc;
    std::cout << "  " << seconds << "s" << std::endl;

    EpochStats<T> stats;
    stats.epoch = epoch;
    stats.mean_loss = train_loss;
    stats.train_accuracy = train_acc;
    stats.test_accuracy = test_acc;
    stats.seconds = seconds;
    history.push_back(stats);

    const bool improved = test_acc >= T(0) && test_acc >= best_accuracy;
    const bool last = epoch == config.epochs;
    if (!config.checkpoint.empty() && (improved || (test == nullptr && last) || (test_acc < T(0) && last))) {
      if (improved) best_accuracy = test_acc;
      save_module<T>(config.checkpoint, model);
      saved = true;
      std::cout << "wrote " << config.checkpoint << std::endl;
    }
  }
  (void)saved;
  return history;
}

template std::vector<EpochStats<float>> train_mnist<float>(CudnnContext&, ResNet<float>&, const MnistSplit&,
                                                           const MnistSplit*, const TrainConfig<float>&);
template std::vector<EpochStats<double>> train_mnist<double>(CudnnContext&, ResNet<double>&, const MnistSplit&,
                                                             const MnistSplit*, const TrainConfig<double>&);

}  // namespace resnet
