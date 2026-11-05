#pragma once

#include "resnet/context.hpp"
#include "resnet/descriptors.hpp"
#include "resnet/module.hpp"

#include <cstdint>

namespace resnet {

struct Conv2dConfig {
  int in_channels = 1;
  int out_channels = 1;
  int kernel = 3;
  int stride = 1;
  int pad = 1;
  bool bias = false;
  std::uint64_t seed = 0;
};

// NCHW cross-correlation via cuDNN. Weights are KCRS: [out, in, kH, kW].
// Activations are cached by copy so backward does not depend on the caller
// keeping the input tensor alive.
template <typename T>
class Conv2d : public Module<T> {
 public:
  Conv2d(CudnnContext& ctx, const Conv2dConfig& config);
  Tensor<T>& forward(const Tensor<T>& input);
  Tensor<T>& backward(const Tensor<T>& grad_out);
  Tensor<T>& grad_input() { return grad_input_; }
  void collect_parameters(const std::string& prefix, std::vector<NamedParam<T>>& out) override;

 private:
  struct ShapeKey {
    int n = -1, c = -1, h = -1, w = -1;
    bool operator==(const ShapeKey& other) const {
      return n == other.n && c == other.c && h == other.h && w == other.w;
    }
  };

  void configure(const Tensor<T>& input);

  CudnnContext* ctx_ = nullptr;
  int in_channels_ = 0;
  int out_channels_ = 0;
  int kernel_ = 0;
  int stride_ = 0;
  int pad_ = 0;
  bool bias_ = false;
  ShapeKey key_{};
  cudnnConvolutionFwdAlgo_t fwd_algo_ = CUDNN_CONVOLUTION_FWD_ALGO_IMPLICIT_GEMM;
  cudnnConvolutionBwdDataAlgo_t bwd_data_algo_ = CUDNN_CONVOLUTION_BWD_DATA_ALGO_0;
  cudnnConvolutionBwdFilterAlgo_t bwd_filter_algo_ = CUDNN_CONVOLUTION_BWD_FILTER_ALGO_0;
  std::size_t fwd_workspace_ = 0;
  std::size_t bwd_data_workspace_ = 0;
  std::size_t bwd_filter_workspace_ = 0;

  TensorDescriptor x_desc_;
  TensorDescriptor y_desc_;
  TensorDescriptor bias_desc_;
  FilterDescriptor w_desc_;
  ConvDescriptor conv_desc_;

  Tensor<T> weight_;
  Tensor<T> bias_;
  Tensor<T> output_;
  Tensor<T> grad_input_;
  Tensor<T> saved_input_;
};

}  // namespace resnet
