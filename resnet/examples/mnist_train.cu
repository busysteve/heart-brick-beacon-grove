#include "resnet/all.hpp"

#include <cstdint>
#include <iostream>
#include <string>

namespace {

void usage() {
  std::cerr
      << "mnist_train --data DIR | --synthetic N [options]\n"
      << "  --data DIR          uncompressed IDX directory\n"
      << "  --synthetic N       class-conditional digits instead of IDX files\n"
      << "  --arch mnist|resnet18\n"
      << "  --epochs N          default 5\n"
      << "  --batch N           default 128\n"
      << "  --lr F              default 0.05 (SGD) \n"
      << "  --momentum F        default 0.9\n"
      << "  --weight-decay F    default 1e-4\n"
      << "  --adamw             AdamW instead of momentum SGD\n"
      << "  --seed N            default 1\n"
      << "  --checkpoint PATH   write the best (or final) weights\n"
      << "  --resume PATH       load a checkpoint before training\n";
}

bool take(int& i, int argc, char** argv, std::string& out) {
  if (i + 1 >= argc) return false;
  out = argv[++i];
  return true;
}

}  // namespace

int main(int argc, char** argv) {
  std::string data;
  std::string arch_name = "mnist";
  std::string checkpoint;
  std::string resume;
  int epochs = 5;
  int batch = 128;
  int synthetic = 0;
  float lr = 0.05f;
  float momentum = 0.9f;
  float weight_decay = 1e-4f;
  std::uint64_t seed = 1;
  bool adamw = false;

  for (int i = 1; i < argc; ++i) {
    const std::string arg = argv[i];
    std::string value;
    if (arg == "--help" || arg == "-h") {
      usage();
      return 0;
    } else if (arg == "--adamw") {
      adamw = true;
    } else if (arg == "--data" && take(i, argc, argv, value)) {
      data = value;
    } else if (arg == "--arch" && take(i, argc, argv, value)) {
      arch_name = value;
    } else if (arg == "--checkpoint" && take(i, argc, argv, value)) {
      checkpoint = value;
    } else if (arg == "--resume" && take(i, argc, argv, value)) {
      resume = value;
    } else if (arg == "--epochs" && take(i, argc, argv, value)) {
      epochs = std::stoi(value);
    } else if (arg == "--batch" && take(i, argc, argv, value)) {
      batch = std::stoi(value);
    } else if (arg == "--synthetic" && take(i, argc, argv, value)) {
      synthetic = std::stoi(value);
    } else if (arg == "--lr" && take(i, argc, argv, value)) {
      lr = std::stof(value);
    } else if (arg == "--momentum" && take(i, argc, argv, value)) {
      momentum = std::stof(value);
    } else if (arg == "--weight-decay" && take(i, argc, argv, value)) {
      weight_decay = std::stof(value);
    } else if (arg == "--seed" && take(i, argc, argv, value)) {
      seed = std::stoull(value);
    } else {
      usage();
      return 2;
    }
  }
  if (data.empty() && synthetic <= 0) {
    usage();
    return 2;
  }

  resnet::ArchSpec arch{};
  if (!resnet::arch_by_name(arch_name.c_str(), arch)) {
    std::cerr << "unknown arch '" << arch_name << "'\n";
    return 2;
  }

  resnet::MnistSplit train_split;
  resnet::MnistSplit test_split;
  if (synthetic > 0) {
    const int test_n = synthetic / 5 > 32 ? synthetic / 5 : 32;
    train_split = resnet::make_synthetic_digits(synthetic, static_cast<std::uint32_t>(seed));
    test_split = resnet::make_synthetic_digits(test_n, static_cast<std::uint32_t>(seed + 17));
  } else {
    train_split = resnet::load_mnist_split(data + "/train-images-idx3-ubyte", data + "/train-labels-idx1-ubyte");
    test_split = resnet::load_mnist_split(data + "/t10k-images-idx3-ubyte", data + "/t10k-labels-idx1-ubyte");
  }

  resnet::CudnnContext ctx;
  resnet::ResNet<float> model = resnet::make_resnet<float>(ctx, arch, 1, 10, seed);
  std::vector<resnet::NamedParam<float>> params;
  model.collect_parameters("", params);
  long long trainable = 0;
  long long buffers = 0;
  for (const resnet::NamedParam<float>& param : params) {
    const long long n = static_cast<long long>(param.tensor->numel());
    if (param.tensor->requires_grad()) trainable += n;
    else buffers += n;
    std::cout << (param.tensor->requires_grad() ? "param " : "buffer ") << param.name << "  " << n << "\n";
  }
  const long long expect = resnet::trainable_parameter_count(arch, 1, 10);
  if (trainable != expect) {
    std::cerr << "trainable count " << trainable << " does not match the architecture spec " << expect << "\n";
    return 1;
  }
  std::cout << "trainable " << trainable << "  bn buffers " << buffers << "  fc_in " << model.fc_in_features()
            << "\n";

  if (!resume.empty()) {
    resnet::load_module<float>(resume, model);
    std::cout << "loaded " << resume << "\n";
  }

  resnet::TrainConfig<float> config;
  config.epochs = epochs;
  config.batch_size = batch;
  config.lr = lr;
  config.momentum = momentum;
  config.weight_decay = weight_decay;
  config.checkpoint = checkpoint;
  config.seed = seed;
  config.adamw = adamw;
  resnet::train_mnist<float>(ctx, model, train_split, &test_split, config);
  return 0;
}
