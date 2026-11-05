#include "resnet/conv2d.hpp"

#include "resnet/geometry.hpp"
#include "resnet/init.hpp"

namespace resnet {
namespace {

template <typename T>
bool fwd_workspace(cudnnHandle_t handle, const cudnnTensorDescriptor_t x, const cudnnFilterDescriptor_t w,
                   const cudnnConvolutionDescriptor_t conv, const cudnnTensorDescriptor_t y,
                   cudnnConvolutionFwdAlgo_t algo, std::size_t& bytes) {
  return cudnnGetConvolutionForwardWorkspaceSize(handle, x, w, conv, y, algo, &bytes) ==
         CUDNN_STATUS_SUCCESS;
}

template <typename T>
bool bwd_data_workspace(cudnnHandle_t handle, const cudnnFilterDescriptor_t w,
                        const cudnnTensorDescriptor_t dy, const cudnnConvolutionDescriptor_t conv,
                        const cudnnTensorDescriptor_t dx, cudnnConvolutionBwdDataAlgo_t algo,
                        std::size_t& bytes) {
  return cudnnGetConvolutionBackwardDataWorkspaceSize(handle, w, dy, conv, dx, algo, &bytes) ==
         CUDNN_STATUS_SUCCESS;
}

template <typename T>
bool bwd_filter_workspace(cudnnHandle_t handle, const cudnnTensorDescriptor_t x,
                          const cudnnTensorDescriptor_t dy, const cudnnConvolutionDescriptor_t conv,
                          const cudnnFilterDescriptor_t dw, cudnnConvolutionBwdFilterAlgo_t algo,
                          std::size_t& bytes) {
  return cudnnGetConvolutionBackwardFilterWorkspaceSize(handle, x, dy, conv, dw, algo, &bytes) ==
         CUDNN_STATUS_SUCCESS;
}

}  // namespace

template <typename T>
Conv2d<T>::Conv2d(CudnnContext& ctx, const Conv2dConfig& config)
    : ctx_(&ctx),
      in_channels_(config.in_channels),
      out_channels_(config.out_channels),
      kernel_(config.kernel),
      stride_(config.stride),
      pad_(config.pad),
      bias_(config.bias) {
  if (in_channels_ <= 0 || out_channels_ <= 0 || kernel_ <= 0 || stride_ <= 0 || pad_ < 0) {
    throw Error("invalid Conv2d config");
  }
  RESNET_CUDNN_CHECK(cudnnSetFilter4dDescriptor(w_desc_.get(), cudnn_dtype<T>(), CUDNN_TENSOR_NCHW,
                                                out_channels_, in_channels_, kernel_, kernel_));
  RESNET_CUDNN_CHECK(cudnnSetConvolution2dDescriptor(conv_desc_.get(), pad_, pad_, stride_, stride_, 1, 1,
                                                     CUDNN_CROSS_CORRELATION, cudnn_dtype<T>()));
  RESNET_CUDNN_CHECK(cudnnSetConvolutionMathType(conv_desc_.get(), CUDNN_DEFAULT_MATH));

  const std::size_t weight_n =
      static_cast<std::size_t>(out_channels_) * in_channels_ * kernel_ * kernel_;
  weight_ = Tensor<T>({out_channels_, in_channels_, kernel_, kernel_}, true);
  weight_.from_host(he_normal<T>(weight_n, in_channels_ * kernel_ * kernel_, config.seed));
  if (bias_) {
    bias_ = Tensor<T>({out_channels_}, true);
    bias_.from_host(constant_fill<T>(static_cast<std::size_t>(out_channels_), T(0)));
    RESNET_CUDNN_CHECK(cudnnSetTensor4dDescriptor(bias_desc_.get(), CUDNN_TENSOR_NCHW, cudnn_dtype<T>(), 1,
                                                  out_channels_, 1, 1));
  }
}

template <typename T>
void Conv2d<T>::configure(const Tensor<T>& input) {
  if (input.rank() != 4) throw Error("Conv2d expects NCHW");
  if (input.dim(1) != in_channels_) throw Error("Conv2d channel mismatch");
  const ShapeKey key{input.dim(0), input.dim(1), input.dim(2), input.dim(3)};
  if (key.n <= 0 || key.h <= 0 || key.w <= 0) throw Error("Conv2d got an empty input");
  if (key == key_) return;

  const int expect_h = conv2d_out(key.h, kernel_, stride_, pad_);
  const int expect_w = conv2d_out(key.w, kernel_, stride_, pad_);
  if (expect_h <= 0 || expect_w <= 0) {
    throw Error("convolution spatial size collapsed; use the mnist arch on 28x28 or a larger image");
  }

  RESNET_CUDNN_CHECK(cudnnSetTensor4dDescriptor(x_desc_.get(), CUDNN_TENSOR_NCHW, cudnn_dtype<T>(), key.n,
                                                key.c, key.h, key.w));
  int on = 0, oc = 0, oh = 0, ow = 0;
  RESNET_CUDNN_CHECK(
      cudnnGetConvolution2dForwardOutputDim(conv_desc_.get(), x_desc_.get(), w_desc_.get(), &on, &oc, &oh, &ow));
  if (on != key.n || oc != out_channels_ || oh != expect_h || ow != expect_w) {
    throw Error("cuDNN spatial size disagrees with conv2d_out");
  }
  RESNET_CUDNN_CHECK(
      cudnnSetTensor4dDescriptor(y_desc_.get(), CUDNN_TENSOR_NCHW, cudnn_dtype<T>(), on, oc, oh, ow));

  const cudnnConvolutionFwdAlgo_t fwd_algos[] = {
      CUDNN_CONVOLUTION_FWD_ALGO_IMPLICIT_GEMM,
      CUDNN_CONVOLUTION_FWD_ALGO_IMPLICIT_PRECOMP_GEMM,
      CUDNN_CONVOLUTION_FWD_ALGO_GEMM,
  };
  bool found = false;
  for (cudnnConvolutionFwdAlgo_t algo : fwd_algos) {
    std::size_t bytes = 0;
    if (fwd_workspace<T>(ctx_->cudnn(), x_desc_.get(), w_desc_.get(), conv_desc_.get(), y_desc_.get(), algo,
                         bytes)) {
      fwd_algo_ = algo;
      fwd_workspace_ = bytes;
      found = true;
      break;
    }
  }
  if (!found) throw Error("no cuDNN forward convolution algorithm for this shape");

  const cudnnConvolutionBwdDataAlgo_t data_algos[] = {
      CUDNN_CONVOLUTION_BWD_DATA_ALGO_0,
      CUDNN_CONVOLUTION_BWD_DATA_ALGO_1,
  };
  found = false;
  for (cudnnConvolutionBwdDataAlgo_t algo : data_algos) {
    std::size_t bytes = 0;
    if (bwd_data_workspace<T>(ctx_->cudnn(), w_desc_.get(), y_desc_.get(), conv_desc_.get(), x_desc_.get(),
                              algo, bytes)) {
      bwd_data_algo_ = algo;
      bwd_data_workspace_ = bytes;
      found = true;
      break;
    }
  }
  if (!found) throw Error("no cuDNN backward-data convolution algorithm for this shape");

  const cudnnConvolutionBwdFilterAlgo_t filter_algos[] = {
      CUDNN_CONVOLUTION_BWD_FILTER_ALGO_0,
      CUDNN_CONVOLUTION_BWD_FILTER_ALGO_1,
      CUDNN_CONVOLUTION_BWD_FILTER_ALGO_3,
  };
  found = false;
  for (cudnnConvolutionBwdFilterAlgo_t algo : filter_algos) {
    std::size_t bytes = 0;
    if (bwd_filter_workspace<T>(ctx_->cudnn(), x_desc_.get(), y_desc_.get(), conv_desc_.get(), w_desc_.get(),
                                algo, bytes)) {
      bwd_filter_algo_ = algo;
      bwd_filter_workspace_ = bytes;
      found = true;
      break;
    }
  }
  if (!found) throw Error("no cuDNN backward-filter convolution algorithm for this shape");

  output_.resize({on, oc, oh, ow});
  grad_input_.resize({key.n, key.c, key.h, key.w});
  saved_input_.resize({key.n, key.c, key.h, key.w});
  key_ = key;
}

template <typename T>
Tensor<T>& Conv2d<T>::forward(const Tensor<T>& input) {
  configure(input);
  saved_input_.copy_from_device(input.data());
  const T one = T(1);
  const T zero = T(0);
  void* work = ctx_->workspace(fwd_workspace_);
  RESNET_CUDNN_CHECK(cudnnConvolutionForward(ctx_->cudnn(), &one, x_desc_.get(), saved_input_.data(),
                                             w_desc_.get(), weight_.data(), conv_desc_.get(), fwd_algo_, work,
                                             fwd_workspace_, &zero, y_desc_.get(), output_.data()));
  if (bias_) {
    RESNET_CUDNN_CHECK(cudnnAddTensor(ctx_->cudnn(), &one, bias_desc_.get(), bias_.data(), &one, y_desc_.get(),
                                      output_.data()));
  }
  return output_;
}

template <typename T>
Tensor<T>& Conv2d<T>::backward(const Tensor<T>& grad_out) {
  if (key_.n < 0) throw Error("Conv2d::backward called before forward");
  if (grad_out.numel() != output_.numel()) throw Error("Conv2d gradient shape mismatch");
  const T one = T(1);
  const T zero = T(0);
  const std::size_t filter_bytes = bwd_filter_workspace_ > bwd_data_workspace_ ? bwd_filter_workspace_ : bwd_data_workspace_;
  void* work = ctx_->workspace(filter_bytes);
  RESNET_CUDNN_CHECK(cudnnConvolutionBackwardFilter(
      ctx_->cudnn(), &one, x_desc_.get(), saved_input_.data(), y_desc_.get(), grad_out.data(), conv_desc_.get(),
      bwd_filter_algo_, work, bwd_filter_workspace_, &zero, w_desc_.get(), weight_.grad()));
  if (bias_) {
    RESNET_CUDNN_CHECK(cudnnConvolutionBackwardBias(ctx_->cudnn(), &one, y_desc_.get(), grad_out.data(), &zero,
                                                    bias_desc_.get(), bias_.grad()));
  }
  RESNET_CUDNN_CHECK(cudnnConvolutionBackwardData(
      ctx_->cudnn(), &one, w_desc_.get(), weight_.data(), y_desc_.get(), grad_out.data(), conv_desc_.get(),
      bwd_data_algo_, work, bwd_data_workspace_, &zero, x_desc_.get(), grad_input_.data()));
  return grad_input_;
}

template <typename T>
void Conv2d<T>::collect_parameters(const std::string& prefix, std::vector<NamedParam<T>>& out) {
  out.push_back({prefix + ".weight", &weight_});
  if (bias_) out.push_back({prefix + ".bias", &bias_});
}

template class Conv2d<float>;
template class Conv2d<double>;

}  // namespace resnet
