#include "resnet/pooling.hpp"

#include "resnet/geometry.hpp"

namespace resnet {

template <typename T>
Pool2d<T>::Pool2d(CudnnContext& ctx, PoolKind kind, int kernel, int stride, int pad)
    : ctx_(&ctx), kind_(kind), kernel_(kernel), stride_(stride), pad_(pad) {
  if (kind_ == PoolKind::Max && (kernel_ <= 0 || stride_ <= 0 || pad_ < 0)) {
    throw Error("invalid max-pool config");
  }
}

template <typename T>
void Pool2d<T>::configure(const Tensor<T>& input) {
  if (input.rank() != 4) throw Error("Pool2d expects NCHW");
  const int n = input.dim(0);
  const int c = input.dim(1);
  const int h = input.dim(2);
  const int w = input.dim(3);
  if (n <= 0 || c <= 0 || h <= 0 || w <= 0) throw Error("Pool2d got an empty input");
  if (n == cached_n_ && c == cached_c_ && h == cached_h_ && w == cached_w_) return;

  int k_h = kernel_;
  int k_w = kernel_;
  int s_h = stride_;
  int s_w = stride_;
  int p_h = pad_;
  int p_w = pad_;
  cudnnPoolingMode_t mode = CUDNN_POOLING_MAX;
  if (kind_ == PoolKind::GlobalAvg) {
    k_h = h;
    k_w = w;
    s_h = 1;
    s_w = 1;
    p_h = 0;
    p_w = 0;
    mode = CUDNN_POOLING_AVERAGE_COUNT_EXCLUDE_PADDING;
  }
  const int expect_h = pool2d_out(h, k_h, s_h, p_h);
  const int expect_w = pool2d_out(w, k_w, s_w, p_w);
  if (expect_h <= 0 || expect_w <= 0) throw Error("pooling spatial size collapsed");

  RESNET_CUDNN_CHECK(cudnnSetPooling2dDescriptor(pool_desc_.get(), mode, CUDNN_NOT_PROPAGATE_NAN, k_h, k_w,
                                                 p_h, p_w, s_h, s_w));
  RESNET_CUDNN_CHECK(
      cudnnSetTensor4dDescriptor(x_desc_.get(), CUDNN_TENSOR_NCHW, cudnn_dtype<T>(), n, c, h, w));
  int on = 0, oc = 0, oh = 0, ow = 0;
  RESNET_CUDNN_CHECK(
      cudnnGetPooling2dForwardOutputDim(pool_desc_.get(), x_desc_.get(), &on, &oc, &oh, &ow));
  if (on != n || oc != c || oh != expect_h || ow != expect_w) {
    throw Error("cuDNN pooling size disagrees with pool2d_out");
  }
  RESNET_CUDNN_CHECK(
      cudnnSetTensor4dDescriptor(y_desc_.get(), CUDNN_TENSOR_NCHW, cudnn_dtype<T>(), on, oc, oh, ow));
  output_.resize({on, oc, oh, ow});
  grad_input_.resize(input.shape());
  saved_input_.resize(input.shape());
  cached_n_ = n;
  cached_c_ = c;
  cached_h_ = h;
  cached_w_ = w;
}

template <typename T>
Tensor<T>& Pool2d<T>::forward(const Tensor<T>& input) {
  configure(input);
  saved_input_.copy_from_device(input.data());
  const T one = T(1);
  const T zero = T(0);
  RESNET_CUDNN_CHECK(cudnnPoolingForward(ctx_->cudnn(), pool_desc_.get(), &one, x_desc_.get(),
                                         saved_input_.data(), &zero, y_desc_.get(), output_.data()));
  return output_;
}

template <typename T>
Tensor<T>& Pool2d<T>::backward(const Tensor<T>& grad_out) {
  if (cached_n_ < 0) throw Error("Pool2d::backward called before forward");
  if (grad_out.numel() != output_.numel()) throw Error("Pool2d gradient shape mismatch");
  const T one = T(1);
  const T zero = T(0);
  RESNET_CUDNN_CHECK(cudnnPoolingBackward(ctx_->cudnn(), pool_desc_.get(), &one, y_desc_.get(), output_.data(),
                                          y_desc_.get(), grad_out.data(), x_desc_.get(), saved_input_.data(),
                                          &zero, x_desc_.get(), grad_input_.data()));
  return grad_input_;
}

template <typename T>
void Pool2d<T>::collect_parameters(const std::string&, std::vector<NamedParam<T>>&) {}

template class Pool2d<float>;
template class Pool2d<double>;

}  // namespace resnet
