#pragma once

#include "resnet/context.hpp"
#include "resnet/descriptors.hpp"
#include "resnet/module.hpp"

namespace resnet {

enum class PoolKind { Max, GlobalAvg };

// Max pool uses a fixed window. Global average pool sets the window to the
// current HxW so the output is N,C,1,1 (cuDNN average, exclude padding).
template <typename T>
class Pool2d : public Module<T> {
 public:
  Pool2d(CudnnContext& ctx, PoolKind kind, int kernel = 0, int stride = 0, int pad = 0);
  Tensor<T>& forward(const Tensor<T>& input);
  Tensor<T>& backward(const Tensor<T>& grad_out);
  Tensor<T>& grad_input() { return grad_input_; }
  void collect_parameters(const std::string& prefix, std::vector<NamedParam<T>>& out) override;

 private:
  void configure(const Tensor<T>& input);

  CudnnContext* ctx_ = nullptr;
  PoolKind kind_ = PoolKind::Max;
  int kernel_ = 0;
  int stride_ = 0;
  int pad_ = 0;
  int cached_n_ = -1;
  int cached_c_ = -1;
  int cached_h_ = -1;
  int cached_w_ = -1;
  PoolDescriptor pool_desc_;
  TensorDescriptor x_desc_;
  TensorDescriptor y_desc_;
  Tensor<T> output_;
  Tensor<T> grad_input_;
  Tensor<T> saved_input_;
};

}  // namespace resnet
