#pragma once

#include "resnet/mnist.hpp"
#include "resnet/resnet.hpp"

#include <cstdint>
#include <string>
#include <vector>

namespace resnet {

template <typename T>
struct TrainConfig {
  int epochs = 5;
  int batch_size = 128;
  T lr = T(0.05);
  T momentum = T(0.9);
  T weight_decay = T(1e-4);
  int log_interval = 20;
  std::string checkpoint;  // overwritten whenever test accuracy improves, or at the end
  std::uint64_t seed = 1;
  bool adamw = false;
};

template <typename T>
struct EpochStats {
  int epoch = 0;
  T mean_loss = 0;
  T train_accuracy = 0;
  T test_accuracy = -1;  // negative when no test split was passed
  double seconds = 0;
};

// Full-batch-loop trainer. Images are NCHW with a single channel taken from
// the split. Labels outside [0, num_classes) throw. The context and the model
// are the caller's; this function does not own them.
template <typename T>
std::vector<EpochStats<T>> train_mnist(CudnnContext& ctx, ResNet<T>& model, const MnistSplit& train,
                                       const MnistSplit* test, const TrainConfig<T>& config);

}  // namespace resnet
