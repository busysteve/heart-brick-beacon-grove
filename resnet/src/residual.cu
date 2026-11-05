#include "resnet/residual.hpp"

#include "resnet/algorithms.hpp"
#include "resnet/init.hpp"

#include <thrust/execution_policy.h>

namespace resnet {

template <typename T>
std::uint64_t BasicBlock<T>::take(std::uint64_t& seed) {
  const std::uint64_t value = seed;
  seed = mix_seed(seed, 0xD1B54A32D192ED03ULL);
  return value;
}

template <typename T>
BasicBlock<T>::BasicBlock(CudnnContext& ctx, int in_channels, int out_channels, int stride,
                          std::uint64_t& seed)
    : conv1_(ctx, Conv2dConfig{in_channels, out_channels, 3, stride, 1, false, take(seed)}),
      bn1_(ctx, BatchNormConfig{out_channels}),
      conv2_(ctx, Conv2dConfig{out_channels, out_channels, 3, 1, 1, false, take(seed)}),
      bn2_(ctx, BatchNormConfig{out_channels}) {
  if (stride != 1 || in_channels != out_channels) {
    down_conv_ = std::make_unique<Conv2d<T>>(
        ctx, Conv2dConfig{in_channels, out_channels, 1, stride, 0, false, take(seed)});
    down_bn_ = std::make_unique<BatchNorm<T>>(ctx, BatchNormConfig{out_channels});
  }
}

template <typename T>
void BasicBlock<T>::train(bool mode) {
  Module<T>::train(mode);
  conv1_.train(mode);
  bn1_.train(mode);
  conv2_.train(mode);
  bn2_.train(mode);
  if (down_conv_) down_conv_->train(mode);
  if (down_bn_) down_bn_->train(mode);
}

template <typename T>
Tensor<T>& BasicBlock<T>::forward(const Tensor<T>& input) {
  input_shape_ = input.shape();
  Tensor<T>& hidden = relu1_.forward(bn1_.forward(conv1_.forward(input)));
  Tensor<T>& residual = bn2_.forward(conv2_.forward(hidden));
  if (down_conv_) {
    Tensor<T>& skip = down_bn_->forward(down_conv_->forward(input));
    if (skip.numel() != residual.numel()) throw Error("residual branch sizes differ");
    sum_.resize(residual.shape());
    add(thrust::device, residual.data(), skip.data(), sum_.data(), residual.numel());
  } else {
    if (input.numel() != residual.numel()) throw Error("identity shortcut shape mismatch");
    sum_.resize(residual.shape());
    add(thrust::device, residual.data(), input.data(), sum_.data(), residual.numel());
  }
  return relu_out_.forward(sum_);
}

template <typename T>
Tensor<T>& BasicBlock<T>::backward(const Tensor<T>& grad_out) {
  relu_out_.backward(grad_out);
  const Tensor<T>& grad_sum = relu_out_.grad_input();
  bn2_.backward(grad_sum);
  conv2_.backward(bn2_.grad_input());
  relu1_.backward(conv2_.grad_input());
  bn1_.backward(relu1_.grad_input());
  conv1_.backward(bn1_.grad_input());
  grad_input_.resize(input_shape_);
  if (down_conv_) {
    down_bn_->backward(grad_sum);
    down_conv_->backward(down_bn_->grad_input());
    add(thrust::device, conv1_.grad_input().data(), down_conv_->grad_input().data(), grad_input_.data(),
        grad_input_.numel());
  } else {
    add(thrust::device, conv1_.grad_input().data(), grad_sum.data(), grad_input_.data(), grad_input_.numel());
  }
  return grad_input_;
}

template <typename T>
void BasicBlock<T>::collect_parameters(const std::string& prefix, std::vector<NamedParam<T>>& out) {
  conv1_.collect_parameters(prefix + ".conv1", out);
  bn1_.collect_parameters(prefix + ".bn1", out);
  conv2_.collect_parameters(prefix + ".conv2", out);
  bn2_.collect_parameters(prefix + ".bn2", out);
  if (down_conv_) down_conv_->collect_parameters(prefix + ".downsample.0", out);
  if (down_bn_) down_bn_->collect_parameters(prefix + ".downsample.1", out);
}

template class BasicBlock<float>;
template class BasicBlock<double>;

}  // namespace resnet
