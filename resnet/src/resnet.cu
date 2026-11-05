#include "resnet/resnet.hpp"

#include "resnet/init.hpp"

#include <string>

namespace resnet {

template <typename T>
std::string ResNet<T>::join(const std::string& prefix, const std::string& leaf) {
  return prefix.empty() ? leaf : prefix + "." + leaf;
}

template <typename T>
ResNet<T>::ResNet(CudnnContext& ctx, const ArchSpec& arch, int in_channels, int num_classes,
                  std::uint64_t seed)
    : ctx_(&ctx),
      arch_(arch),
      in_channels_(in_channels),
      num_classes_(num_classes),
      conv1_(ctx, Conv2dConfig{in_channels, arch.conv1_channels, arch.conv1_kernel, arch.conv1_stride,
                               arch.conv1_pad, false, mix_seed(seed, 1)}),
      bn1_(ctx, BatchNormConfig{arch.conv1_channels}),
      gap_(ctx, PoolKind::GlobalAvg) {
  if (in_channels <= 0 || num_classes <= 0) throw Error("ResNet channels and classes must be positive");
  if (arch.num_stages <= 0 || arch.num_stages > 4) throw Error("ResNet stage count must be 1..4");
  if (arch.max_pool) max_pool_ = std::make_unique<Pool2d<T>>(ctx, PoolKind::Max, 3, 2, 1);

  std::uint64_t cursor = mix_seed(seed, 2);
  int channels = arch.conv1_channels;
  stages_.resize(static_cast<std::size_t>(arch.num_stages));
  for (int s = 0; s < arch.num_stages; ++s) {
    const BlockSpec& spec = arch.stages[s];
    if (spec.blocks <= 0 || spec.channels <= 0 || spec.stride <= 0) throw Error("invalid ResNet stage");
    auto& stage = stages_[static_cast<std::size_t>(s)];
    stage.reserve(static_cast<std::size_t>(spec.blocks));
    for (int b = 0; b < spec.blocks; ++b) {
      const int stride = b == 0 ? spec.stride : 1;
      stage.push_back(std::make_unique<BasicBlock<T>>(ctx, channels, spec.channels, stride, cursor));
      channels = spec.channels;
    }
  }
  fc_in_ = channels;
  fc_ = std::make_unique<Linear<T>>(ctx, LinearConfig{fc_in_, num_classes_, true, mix_seed(seed, 3)});
}

template <typename T>
void ResNet<T>::train(bool mode) {
  Module<T>::train(mode);
  conv1_.train(mode);
  bn1_.train(mode);
  if (max_pool_) max_pool_->train(mode);
  for (auto& stage : stages_) {
    for (auto& block : stage) block->train(mode);
  }
  fc_->train(mode);
}

template <typename T>
Tensor<T>& ResNet<T>::forward(const Tensor<T>& input) {
  if (input.rank() != 4) throw Error("ResNet expects NCHW images");
  if (input.dim(1) != in_channels_) throw Error("ResNet input channel mismatch");
  Tensor<T>* h = &relu_.forward(bn1_.forward(conv1_.forward(input)));
  if (max_pool_) h = &max_pool_->forward(*h);
  for (auto& stage : stages_) {
    for (auto& block : stage) h = &block->forward(*h);
  }
  h = &gap_.forward(*h);
  return fc_->forward(*h);
}

template <typename T>
Tensor<T>& ResNet<T>::backward(const Tensor<T>& grad_logits) {
  fc_->backward(grad_logits);
  gap_.backward(fc_->grad_input());
  const Tensor<T>* grad = &gap_.grad_input();
  for (int s = static_cast<int>(stages_.size()) - 1; s >= 0; --s) {
    auto& stage = stages_[static_cast<std::size_t>(s)];
    for (int b = static_cast<int>(stage.size()) - 1; b >= 0; --b) {
      stage[static_cast<std::size_t>(b)]->backward(*grad);
      grad = &stage[static_cast<std::size_t>(b)]->grad_input();
    }
  }
  if (max_pool_) {
    max_pool_->backward(*grad);
    grad = &max_pool_->grad_input();
  }
  relu_.backward(*grad);
  bn1_.backward(relu_.grad_input());
  conv1_.backward(bn1_.grad_input());
  return conv1_.grad_input();
}

template <typename T>
void ResNet<T>::zero_grad() {
  std::vector<NamedParam<T>> params;
  collect_parameters("", params);
  for (NamedParam<T>& param : params) {
    if (param.tensor->requires_grad()) param.tensor->zero_grad();
  }
}

template <typename T>
void ResNet<T>::collect_parameters(const std::string& prefix, std::vector<NamedParam<T>>& out) {
  conv1_.collect_parameters(join(prefix, "conv1"), out);
  bn1_.collect_parameters(join(prefix, "bn1"), out);
  for (int s = 0; s < static_cast<int>(stages_.size()); ++s) {
    auto& stage = stages_[static_cast<std::size_t>(s)];
    for (int b = 0; b < static_cast<int>(stage.size()); ++b) {
      const std::string name = join(prefix, "layer" + std::to_string(s + 1) + "." + std::to_string(b));
      stage[static_cast<std::size_t>(b)]->collect_parameters(name, out);
    }
  }
  fc_->collect_parameters(join(prefix, "fc"), out);
}

template <typename T>
ResNet<T> make_resnet(CudnnContext& ctx, const ArchSpec& arch, int in_channels, int num_classes,
                      std::uint64_t seed) {
  return ResNet<T>(ctx, arch, in_channels, num_classes, seed);
}

template class ResNet<float>;
template class ResNet<double>;
template ResNet<float> make_resnet<float>(CudnnContext&, const ArchSpec&, int, int, std::uint64_t);
template ResNet<double> make_resnet<double>(CudnnContext&, const ArchSpec&, int, int, std::uint64_t);

}  // namespace resnet
