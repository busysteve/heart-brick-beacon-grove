#pragma once

#include "resnet/tensor.hpp"

namespace resnet {

template <typename T>
struct LossWorkspace {
  DeviceBuffer<T> per_example;
  DeviceBuffer<int> counter;
};

// Device softmax cross-entropy. The per-row math is softmax_cross_entropy_row
// from algorithms.hpp (the same function the host policy tests). Gradient is
// the mean over the batch. Returns the mean NLL and synchronizes.
template <typename T>
T softmax_cross_entropy_cuda(const T* logits, const int* labels, T* grad, int batch, int classes,
                             LossWorkspace<T>& workspace);

template <typename T>
int count_correct_cuda(const T* logits, const int* labels, int batch, int classes,
                       LossWorkspace<T>& workspace);

}  // namespace resnet
