#pragma once

#include "resnet/context.hpp"
#include "resnet/descriptors.hpp"
#include "resnet/module.hpp"

namespace resnet {

struct BatchNormConfig {
  int channels = 1;
  double eps = 1e-5;
  double momentum = 0.1;  // cuDNN exponential average factor
};

// Spatial batch-norm (per-channel), cuDNN training and inference paths.
// Affine scale/bias require grad. Running mean/var are checkpointed buffers.
template <typename T>
class BatchNorm : public Module<T> {
 public:
  BatchNorm(CudnnContext& ctx, const BatchNormConfig& config);
  Tensor<T>& forward(const Tensor<T>& input);
  Tensor<T>& backward(const Tensor<T>& grad_out);
  Tensor<T>& grad_input() { return grad_input_; }
  void collect_parameters(const std::string& prefix, std::vector<NamedParam<T>>& out) override;

 private:
  void configure(const Tensor<T>& input);

  CudnnContext* ctx_ = nullptr;
  int channels_ = 0;
  double eps_ = 1e-5;
  double momentum_ = 0.1;
  int cached_n_ = -1;
  int cached_h_ = -1;
  int cached_w_ = -1;

  TensorDescriptor x_desc_;
  TensorDescriptor bn_desc_;
  Tensor<T> scale_;
  Tensor<T> bias_;
  Tensor<T> running_mean_;
  Tensor<T> running_var_;
  Tensor<T> saved_mean_;
  Tensor<T> saved_inv_var_;
  Tensor<T> output_;
  Tensor<T> grad_input_;
  Tensor<T> saved_input_;
};

}  // namespace resnet
