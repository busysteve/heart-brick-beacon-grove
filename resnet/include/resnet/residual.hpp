#pragma once

#include "resnet/activation.hpp"
#include "resnet/batch_norm.hpp"
#include "resnet/conv2d.hpp"

#include <memory>

namespace resnet {

// y = ReLU(F(x) + S(x))
// F is conv3x3-bn-relu-conv3x3-bn. S is identity, or 1x1 conv + bn when
// the stride or the channel count changes. Addition is the Thrust `add` algorithm.
template <typename T>
class BasicBlock : public Module<T> {
 public:
  BasicBlock(CudnnContext& ctx, int in_channels, int out_channels, int stride, std::uint64_t& seed);
  Tensor<T>& forward(const Tensor<T>& input);
  Tensor<T>& backward(const Tensor<T>& grad_out);
  Tensor<T>& grad_input() { return grad_input_; }
  void train(bool mode) override;
  void collect_parameters(const std::string& prefix, std::vector<NamedParam<T>>& out) override;

 private:
  static std::uint64_t take(std::uint64_t& seed);

  Conv2d<T> conv1_;
  BatchNorm<T> bn1_;
  ReLU<T> relu1_;
  Conv2d<T> conv2_;
  BatchNorm<T> bn2_;
  ReLU<T> relu_out_;
  std::unique_ptr<Conv2d<T>> down_conv_;
  std::unique_ptr<BatchNorm<T>> down_bn_;
  Tensor<T> sum_;
  Tensor<T> grad_input_;
  std::vector<int> input_shape_;
};

}  // namespace resnet
