#include "resnet/batch_norm.hpp"

#include "resnet/init.hpp"

namespace resnet {

template <typename T>
BatchNorm<T>::BatchNorm(CudnnContext& ctx, const BatchNormConfig& config)
    : ctx_(&ctx), channels_(config.channels), eps_(config.eps), momentum_(config.momentum) {
  if (channels_ <= 0) throw Error("BatchNorm channels must be positive");
  if (eps_ <= 0.0 || momentum_ < 0.0 || momentum_ > 1.0) throw Error("invalid BatchNorm config");
  const std::size_t c = static_cast<std::size_t>(channels_);
  scale_ = Tensor<T>({channels_}, true);
  bias_ = Tensor<T>({channels_}, true);
  running_mean_ = Tensor<T>({channels_}, false);
  running_var_ = Tensor<T>({channels_}, false);
  saved_mean_ = Tensor<T>({channels_}, false);
  saved_inv_var_ = Tensor<T>({channels_}, false);
  scale_.from_host(constant_fill<T>(c, T(1)));
  bias_.from_host(constant_fill<T>(c, T(0)));
  running_mean_.from_host(constant_fill<T>(c, T(0)));
  running_var_.from_host(constant_fill<T>(c, T(1)));
}

template <typename T>
void BatchNorm<T>::configure(const Tensor<T>& input) {
  if (input.rank() != 4) throw Error("BatchNorm expects NCHW");
  if (input.dim(1) != channels_) throw Error("BatchNorm channel mismatch");
  const int n = input.dim(0);
  const int h = input.dim(2);
  const int w = input.dim(3);
  if (n <= 0 || h <= 0 || w <= 0) throw Error("BatchNorm got an empty input");
  if (n == cached_n_ && h == cached_h_ && w == cached_w_) return;
  RESNET_CUDNN_CHECK(cudnnSetTensor4dDescriptor(x_desc_.get(), CUDNN_TENSOR_NCHW, cudnn_dtype<T>(), n,
                                                channels_, h, w));
  RESNET_CUDNN_CHECK(cudnnDeriveBNTensorDescriptor(bn_desc_.get(), x_desc_.get(), CUDNN_BATCHNORM_SPATIAL));
  output_.resize(input.shape());
  grad_input_.resize(input.shape());
  saved_input_.resize(input.shape());
  cached_n_ = n;
  cached_h_ = h;
  cached_w_ = w;
}

template <typename T>
Tensor<T>& BatchNorm<T>::forward(const Tensor<T>& input) {
  configure(input);
  saved_input_.copy_from_device(input.data());
  const T one = T(1);
  const T zero = T(0);
  if (this->training()) {
    RESNET_CUDNN_CHECK(cudnnBatchNormalizationForwardTraining(
        ctx_->cudnn(), CUDNN_BATCHNORM_SPATIAL, &one, &zero, x_desc_.get(), saved_input_.data(), x_desc_.get(),
        output_.data(), bn_desc_.get(), scale_.data(), bias_.data(), momentum_, running_mean_.data(),
        running_var_.data(), eps_, saved_mean_.data(), saved_inv_var_.data()));
  } else {
    RESNET_CUDNN_CHECK(cudnnBatchNormalizationForwardInference(
        ctx_->cudnn(), CUDNN_BATCHNORM_SPATIAL, &one, &zero, x_desc_.get(), saved_input_.data(), x_desc_.get(),
        output_.data(), bn_desc_.get(), scale_.data(), bias_.data(), running_mean_.data(), running_var_.data(),
        eps_));
  }
  return output_;
}

template <typename T>
Tensor<T>& BatchNorm<T>::backward(const Tensor<T>& grad_out) {
  if (!this->training()) throw Error("BatchNorm::backward requires train mode");
  if (cached_n_ < 0) throw Error("BatchNorm::backward called before forward");
  if (grad_out.numel() != output_.numel()) throw Error("BatchNorm gradient shape mismatch");
  const T one = T(1);
  const T zero = T(0);
  RESNET_CUDNN_CHECK(cudnnBatchNormalizationBackward(
      ctx_->cudnn(), CUDNN_BATCHNORM_SPATIAL, &one, &zero, &one, &zero, x_desc_.get(), saved_input_.data(),
      x_desc_.get(), grad_out.data(), x_desc_.get(), grad_input_.data(), bn_desc_.get(), scale_.data(),
      scale_.grad(), bias_.grad(), eps_, saved_mean_.data(), saved_inv_var_.data()));
  return grad_input_;
}

template <typename T>
void BatchNorm<T>::collect_parameters(const std::string& prefix, std::vector<NamedParam<T>>& out) {
  out.push_back({prefix + ".weight", &scale_});
  out.push_back({prefix + ".bias", &bias_});
  out.push_back({prefix + ".running_mean", &running_mean_});
  out.push_back({prefix + ".running_var", &running_var_});
}

template class BatchNorm<float>;
template class BatchNorm<double>;

}  // namespace resnet
