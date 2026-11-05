#include "resnet/linear.hpp"

#include "resnet/algorithms.hpp"
#include "resnet/check.hpp"
#include "resnet/init.hpp"

#include <thrust/execution_policy.h>

namespace resnet {
namespace {

// Row-major GEMM expressed with cuBLAS's column-major kernel.
// Memory of a row-major (rows, cols) matrix is a column-major (cols, rows) matrix.
//
// Forward:  Y[n, m] = sum_k X[n, k] * W[m, k]
//   Ycm(M, N) = Wcm(K, M)^T * Xcm(K, N)
// Backward dX: dXcm(K, N) = Wcm(K, M) * dYcm(M, N)
// Backward dW: dWcm(K, M) = Xcm(K, N) * dYcm(M, N)^T

template <typename T>
void gemm(cublasHandle_t handle, cublasOperation_t trans_a, cublasOperation_t trans_b, int m, int n, int k,
          const T* a, int lda, const T* b, int ldb, T* c, int ldc, T alpha, T beta);

template <>
void gemm<float>(cublasHandle_t handle, cublasOperation_t trans_a, cublasOperation_t trans_b, int m, int n,
                 int k, const float* a, int lda, const float* b, int ldb, float* c, int ldc, float alpha,
                 float beta) {
  RESNET_CUBLAS_CHECK(cublasSgemm(handle, trans_a, trans_b, m, n, k, &alpha, a, lda, b, ldb, &beta, c, ldc));
}

template <>
void gemm<double>(cublasHandle_t handle, cublasOperation_t trans_a, cublasOperation_t trans_b, int m, int n,
                  int k, const double* a, int lda, const double* b, int ldb, double* c, int ldc, double alpha,
                  double beta) {
  RESNET_CUBLAS_CHECK(cublasDgemm(handle, trans_a, trans_b, m, n, k, &alpha, a, lda, b, ldb, &beta, c, ldc));
}

template <typename T>
__global__ void bias_grad_kernel(const T* grad, T* out, int batch, int width) {
  const int m = static_cast<int>(blockIdx.x * blockDim.x + threadIdx.x);
  if (m >= width) return;
  T sum = 0;
  for (int n = 0; n < batch; ++n) {
    sum += grad[static_cast<std::size_t>(n) * static_cast<std::size_t>(width) + m];
  }
  out[m] = sum;
}

}  // namespace

template <typename T>
Linear<T>::Linear(CudnnContext& ctx, const LinearConfig& config)
    : ctx_(&ctx),
      in_features_(config.in_features),
      out_features_(config.out_features),
      bias_(config.bias) {
  if (in_features_ <= 0 || out_features_ <= 0) throw Error("invalid Linear config");
  const std::size_t wn = static_cast<std::size_t>(out_features_) * static_cast<std::size_t>(in_features_);
  weight_ = Tensor<T>({out_features_, in_features_}, true);
  weight_.from_host(he_normal<T>(wn, in_features_, config.seed));
  if (bias_) {
    bias_ = Tensor<T>({out_features_}, true);
    bias_.from_host(constant_fill<T>(static_cast<std::size_t>(out_features_), T(0)));
  }
}

template <typename T>
Tensor<T>& Linear<T>::forward(const Tensor<T>& input) {
  if (input.rank() < 2) throw Error("Linear expects rank >= 2 with batch at dim 0");
  int features = 1;
  for (int i = 1; i < input.rank(); ++i) features *= input.dim(i);
  if (features != in_features_) throw Error("Linear feature size mismatch");
  batch_ = input.dim(0);
  if (batch_ <= 0) throw Error("Linear got an empty batch");
  input_shape_ = input.shape();
  saved_input_.resize({batch_, in_features_});
  output_.resize({batch_, out_features_});
  saved_input_.copy_from_device(input.data());

  const int n = batch_;
  const int m = out_features_;
  const int k = in_features_;
  gemm<T>(ctx_->cublas(), CUBLAS_OP_T, CUBLAS_OP_N, m, n, k, weight_.data(), k, saved_input_.data(), k,
          output_.data(), m, T(1), T(0));
  if (bias_) bias_add(thrust::device, output_.data(), bias_.data(), n, m);
  return output_;
}

template <typename T>
Tensor<T>& Linear<T>::backward(const Tensor<T>& grad_out) {
  if (batch_ < 0) throw Error("Linear::backward called before forward");
  if (grad_out.numel() != output_.numel()) throw Error("Linear gradient shape mismatch");
  const int n = batch_;
  const int m = out_features_;
  const int k = in_features_;
  grad_input_.resize(input_shape_);
  gemm<T>(ctx_->cublas(), CUBLAS_OP_N, CUBLAS_OP_N, k, n, m, weight_.data(), k, grad_out.data(), m,
          grad_input_.data(), k, T(1), T(0));
  gemm<T>(ctx_->cublas(), CUBLAS_OP_N, CUBLAS_OP_T, k, m, n, saved_input_.data(), k, grad_out.data(), m,
          weight_.grad(), k, T(1), T(0));
  if (bias_) {
    const int threads = 128;
    const int blocks = (m + threads - 1) / threads;
    bias_grad_kernel<T><<<blocks, threads>>>(grad_out.data(), bias_.grad(), n, m);
    RESNET_CUDA_CHECK(cudaGetLastError());
  }
  return grad_input_;
}

template <typename T>
void Linear<T>::collect_parameters(const std::string& prefix, std::vector<NamedParam<T>>& out) {
  out.push_back({prefix + ".weight", &weight_});
  if (bias_) out.push_back({prefix + ".bias", &bias_});
}

template class Linear<float>;
template class Linear<double>;

}  // namespace resnet
