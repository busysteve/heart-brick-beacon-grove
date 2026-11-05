#include "resnet/context.hpp"

#include "resnet/check.hpp"

namespace resnet {

CudnnContext::CudnnContext() {
  RESNET_CUDNN_CHECK(cudnnCreate(&cudnn_));
  RESNET_CUBLAS_CHECK(cublasCreate(&cublas_));
  RESNET_CUBLAS_CHECK(cublasSetMathMode(cublas_, CUBLAS_DEFAULT_MATH));
}

CudnnContext::~CudnnContext() {
  if (workspace_ != nullptr) cudaFree(workspace_);
  if (cublas_ != nullptr) cublasDestroy(cublas_);
  if (cudnn_ != nullptr) cudnnDestroy(cudnn_);
}

void* CudnnContext::workspace(std::size_t bytes) {
  if (bytes <= workspace_cap_) return workspace_;
  if (workspace_ != nullptr) {
    cudaFree(workspace_);
    workspace_ = nullptr;
    workspace_cap_ = 0;
  }
  if (bytes == 0) return nullptr;
  RESNET_CUDA_CHECK(cudaMalloc(&workspace_, bytes));
  workspace_cap_ = bytes;
  return workspace_;
}

}  // namespace resnet
