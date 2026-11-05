#pragma once

#include "resnet/error.hpp"

#include <cublas_v2.h>
#include <cuda_runtime.h>
#include <cudnn.h>

#include <sstream>
#include <string>

namespace resnet {

inline void throw_check(const std::string& kind, const std::string& detail, const char* expr,
                        const char* file, int line) {
  std::ostringstream os;
  os << kind << " error: " << detail << " (" << expr << ") at " << file << ":" << line;
  throw Error(os.str());
}

inline void check_cuda(cudaError_t status, const char* expr, const char* file, int line) {
  if (status != cudaSuccess) {
    throw_check("CUDA", cudaGetErrorString(status), expr, file, line);
  }
}

inline void check_cudnn(cudnnStatus_t status, const char* expr, const char* file, int line) {
  if (status != CUDNN_STATUS_SUCCESS) {
    throw_check("cuDNN", cudnnGetErrorString(status), expr, file, line);
  }
}

inline void check_cublas(cublasStatus_t status, const char* expr, const char* file, int line) {
  if (status == CUBLAS_STATUS_SUCCESS) return;
  const char* name = "unknown";
  switch (status) {
    case CUBLAS_STATUS_NOT_INITIALIZED: name = "NOT_INITIALIZED"; break;
    case CUBLAS_STATUS_ALLOC_FAILED: name = "ALLOC_FAILED"; break;
    case CUBLAS_STATUS_INVALID_VALUE: name = "INVALID_VALUE"; break;
    case CUBLAS_STATUS_ARCH_MISMATCH: name = "ARCH_MISMATCH"; break;
    case CUBLAS_STATUS_MAPPING_ERROR: name = "MAPPING_ERROR"; break;
    case CUBLAS_STATUS_EXECUTION_FAILED: name = "EXECUTION_FAILED"; break;
    case CUBLAS_STATUS_INTERNAL_ERROR: name = "INTERNAL_ERROR"; break;
    case CUBLAS_STATUS_NOT_SUPPORTED: name = "NOT_SUPPORTED"; break;
    case CUBLAS_STATUS_LICENSE_ERROR: name = "LICENSE_ERROR"; break;
    default: break;
  }
  throw_check("cuBLAS", name, expr, file, line);
}

template <typename T>
cudnnDataType_t cudnn_dtype();

template <>
inline cudnnDataType_t cudnn_dtype<float>() {
  return CUDNN_DATA_FLOAT;
}
template <>
inline cudnnDataType_t cudnn_dtype<double>() {
  return CUDNN_DATA_DOUBLE;
}

}  // namespace resnet

#define RESNET_CUDA_CHECK(expr) ::resnet::check_cuda((expr), #expr, __FILE__, __LINE__)
#define RESNET_CUDNN_CHECK(expr) ::resnet::check_cudnn((expr), #expr, __FILE__, __LINE__)
#define RESNET_CUBLAS_CHECK(expr) ::resnet::check_cublas((expr), #expr, __FILE__, __LINE__)
