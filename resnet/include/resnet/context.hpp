#pragma once

#include <cstddef>

#include <cublas_v2.h>
#include <cudnn.h>

namespace resnet {

// One cuDNN handle, one cuBLAS handle, and a grow-only workspace.
// Not thread-safe. Must outlive every layer that captured this pointer.
class CudnnContext {
 public:
  CudnnContext();
  ~CudnnContext();
  CudnnContext(const CudnnContext&) = delete;
  CudnnContext& operator=(const CudnnContext&) = delete;

  cudnnHandle_t cudnn() const { return cudnn_; }
  cublasHandle_t cublas() const { return cublas_; }
  void* workspace(std::size_t bytes);

 private:
  cudnnHandle_t cudnn_ = nullptr;
  cublasHandle_t cublas_ = nullptr;
  void* workspace_ = nullptr;
  std::size_t workspace_cap_ = 0;
};

}  // namespace resnet
