#include "resnet/loss.hpp"

#include "resnet/algorithms.hpp"
#include "resnet/check.hpp"

#include <thrust/execution_policy.h>
#include <thrust/reduce.h>

namespace resnet {
namespace {

template <typename T>
__global__ void cross_entropy_kernel(const T* logits, const int* labels, T* grad, T* per_example, int batch,
                                     int classes) {
  const int n = static_cast<int>(blockIdx.x * blockDim.x + threadIdx.x);
  if (n >= batch) return;
  T loss = 0;
  const T inv_n = T(1) / static_cast<T>(batch);
  T* grad_row = grad == nullptr ? nullptr : grad + static_cast<std::size_t>(n) * static_cast<std::size_t>(classes);
  softmax_cross_entropy_row(logits + static_cast<std::size_t>(n) * static_cast<std::size_t>(classes), labels[n],
                            classes, inv_n, loss, grad_row);
  per_example[n] = loss;
}

template <typename T>
__global__ void accuracy_kernel(const T* logits, const int* labels, int* correct, int batch, int classes) {
  const int n = static_cast<int>(blockIdx.x * blockDim.x + threadIdx.x);
  if (n >= batch) return;
  const int pred =
      argmax_row(logits + static_cast<std::size_t>(n) * static_cast<std::size_t>(classes), classes);
  if (pred == labels[n]) atomicAdd(correct, 1);
}

}  // namespace

template <typename T>
T softmax_cross_entropy_cuda(const T* logits, const int* labels, T* grad, int batch, int classes,
                             LossWorkspace<T>& workspace) {
  if (batch <= 0 || classes <= 0) throw Error("cross-entropy batch and classes must be positive");
  workspace.per_example.resize(static_cast<std::size_t>(batch));
  const int threads = 128;
  const int blocks = (batch + threads - 1) / threads;
  cross_entropy_kernel<T><<<blocks, threads>>>(logits, labels, grad, workspace.per_example.data(), batch, classes);
  RESNET_CUDA_CHECK(cudaGetLastError());
  const T sum = thrust::reduce(thrust::device, workspace.per_example.data(),
                               workspace.per_example.data() + batch, T(0));
  return sum / static_cast<T>(batch);
}

template <typename T>
int count_correct_cuda(const T* logits, const int* labels, int batch, int classes,
                       LossWorkspace<T>& workspace) {
  if (batch <= 0 || classes <= 0) throw Error("accuracy batch and classes must be positive");
  workspace.counter.resize(1);
  workspace.counter.zero();
  const int threads = 128;
  const int blocks = (batch + threads - 1) / threads;
  accuracy_kernel<T><<<blocks, threads>>>(logits, labels, workspace.counter.data(), batch, classes);
  RESNET_CUDA_CHECK(cudaGetLastError());
  int correct = 0;
  workspace.counter.copy_to_host(&correct, 1);
  return correct;
}

template float softmax_cross_entropy_cuda<float>(const float*, const int*, float*, int, int,
                                                 LossWorkspace<float>&);
template double softmax_cross_entropy_cuda<double>(const double*, const int*, double*, int, int,
                                                   LossWorkspace<double>&);
template int count_correct_cuda<float>(const float*, const int*, int, int, LossWorkspace<float>&);
template int count_correct_cuda<double>(const double*, const int*, int, int, LossWorkspace<double>&);

}  // namespace resnet
