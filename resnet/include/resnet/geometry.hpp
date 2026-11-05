#pragma once

#include <cstdint>
#include <cstring>

namespace resnet {

// Spatial helpers shared by the host tests and the CUDA model builder.
// Keep these formulas identical to the cuDNN NCHW conv / pool descriptors
// (dilation 1, cross-correlation).

constexpr int conv2d_out(int input, int kernel, int stride, int pad, int dilation = 1) {
  return (input + 2 * pad - dilation * (kernel - 1) - 1) / stride + 1;
}

constexpr int pool2d_out(int input, int kernel, int stride, int pad) {
  return (input + 2 * pad - kernel) / stride + 1;
}

struct BlockSpec {
  int blocks = 0;
  int channels = 0;
  int stride = 1;  // stride of the first block in the stage; later blocks use 1
};

// At most four stages. Unused tail entries have blocks == 0.
struct ArchSpec {
  const char* name;
  int conv1_channels;
  int conv1_kernel;
  int conv1_stride;
  int conv1_pad;
  bool max_pool;  // ImageNet stem: 3x3, stride 2, pad 1, after conv1+bn+relu
  int num_stages;
  BlockSpec stages[4];
};

// CIFAR-style stem on 28x28 grayscale. No max-pool (MNIST is already small).
inline ArchSpec mnist_arch() {
  ArchSpec a{"mnist", 16, 3, 1, 1, false, 3, {}};
  a.stages[0] = {2, 16, 1};
  a.stages[1] = {2, 32, 2};
  a.stages[2] = {2, 64, 2};
  return a;
}

// torchvision ResNet-18 stem and stages. BasicBlock, expansion 1.
inline ArchSpec resnet18_arch() {
  ArchSpec a{"resnet18", 64, 7, 2, 3, true, 4, {}};
  a.stages[0] = {2, 64, 1};
  a.stages[1] = {2, 128, 2};
  a.stages[2] = {2, 256, 2};
  a.stages[3] = {2, 512, 2};
  return a;
}

// Returns false when `name` is not "mnist" or "resnet18".
inline bool arch_by_name(const char* name, ArchSpec& out) {
  if (name != nullptr && std::strcmp(name, "resnet18") == 0) {
    out = resnet18_arch();
    return true;
  }
  if (name != nullptr && std::strcmp(name, "mnist") == 0) {
    out = mnist_arch();
    return true;
  }
  return false;
}

struct Spatial {
  int height = 0;
  int width = 0;
  int channels = 0;
};

// Trace conv1 (+ optional max-pool) and each stage's strided 3x3.
// The second 3x3 inside a basic block has stride 1 and does not change size.
inline Spatial spatial_after(const ArchSpec& arch, int height, int width) {
  Spatial s;
  s.height = conv2d_out(height, arch.conv1_kernel, arch.conv1_stride, arch.conv1_pad);
  s.width = conv2d_out(width, arch.conv1_kernel, arch.conv1_stride, arch.conv1_pad);
  if (arch.max_pool) {
    s.height = pool2d_out(s.height, 3, 2, 1);
    s.width = pool2d_out(s.width, 3, 2, 1);
  }
  s.channels = arch.conv1_channels;
  for (int stage = 0; stage < arch.num_stages; ++stage) {
    const int stride = arch.stages[stage].stride;
    s.height = conv2d_out(s.height, 3, stride, 1);
    s.width = conv2d_out(s.width, 3, stride, 1);
    s.channels = arch.stages[stage].channels;
  }
  return s;
}

inline long long conv_params(int in_c, int out_c, int kernel, bool bias) {
  long long n = static_cast<long long>(out_c) * in_c * kernel * kernel;
  if (bias) n += out_c;
  return n;
}

inline int bn_affine_params(int channels) { return channels * 2; }

inline long long basic_block_params(int in_c, int out_c, int stride) {
  long long n = conv_params(in_c, out_c, 3, false) + bn_affine_params(out_c);
  n += conv_params(out_c, out_c, 3, false) + bn_affine_params(out_c);
  if (stride != 1 || in_c != out_c) {
    n += conv_params(in_c, out_c, 1, false) + bn_affine_params(out_c);
  }
  return n;
}

// Trainable tensors only (conv/linear weights, BN gamma+beta, linear bias).
// Running mean/var are checkpointed but are not parameters.
inline long long trainable_parameter_count(const ArchSpec& arch, int in_channels, int num_classes) {
  long long n = conv_params(in_channels, arch.conv1_channels, arch.conv1_kernel, false);
  n += bn_affine_params(arch.conv1_channels);
  int channels = arch.conv1_channels;
  for (int stage = 0; stage < arch.num_stages; ++stage) {
    for (int block = 0; block < arch.stages[stage].blocks; ++block) {
      const int stride = block == 0 ? arch.stages[stage].stride : 1;
      const int out_c = arch.stages[stage].channels;
      n += basic_block_params(channels, out_c, stride);
      channels = out_c;
    }
  }
  n += static_cast<long long>(channels) * num_classes + num_classes;
  return n;
}

}  // namespace resnet
