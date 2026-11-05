#pragma once

#include "resnet/context.hpp"
#include "resnet/module.hpp"

#include <cstdint>

namespace resnet {

struct LinearConfig {
  int in_features = 1;
  int out_features = 1;
  bool bias = true;
  std::uint64_t seed = 0;
};

// Y = X W^T + b. X is row-major [N, K] or NCHW with K = C*H*W.
// The GEMM itself is cuBLAS (column-major view of the same bytes).
// Bias add and bias grad stay in a Thrust loop / a small reduction kernel.
template <typename T>
class Linear : public Module<T> {
 public:
  Linear(CudnnContext& ctx, const LinearConfig& config);
  Tensor<T>& forward(const Tensor<T>& input);
  Tensor<T>& backward(const Tensor<T>& grad_out);
  Tensor<T>& grad_input() { return grad_input_; }
  int out_features() const { return out_features_; }
  void collect_parameters(const std::string& prefix, std::vector<NamedParam<T>>& out) override;

 private:
  CudnnContext* ctx_ = nullptr;
  int in_features_ = 0;
  int out_features_ = 0;
  bool bias_ = true;
  int batch_ = -1;
  Tensor<T> weight_;  // [out, in]
  Tensor<T> bias_;    // [out]
  Tensor<T> output_;
  Tensor<T> grad_input_;
  Tensor<T> saved_input_;
  std::vector<int> input_shape_;
};

}  // namespace resnet
