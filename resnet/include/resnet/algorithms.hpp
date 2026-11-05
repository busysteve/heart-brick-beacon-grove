#pragma once

// Execution-policy algorithms. The scalar step is shared by the host policy
// (unit-tested, no GPU) and the Thrust device policy (training). One definition
// of the math, two loops — the same shape as the standard <algorithm> header.

#include <cmath>
#include <cstddef>
#include <cstdint>

#if defined(__CUDACC__)
#include <thrust/execution_policy.h>
#include <thrust/fill.h>
#include <thrust/for_each.h>
#include <thrust/iterator/counting_iterator.h>
#include <thrust/reduce.h>
#include <thrust/transform.h>
#endif

namespace resnet {

#if defined(__CUDACC__)
#define RESNET_HD __host__ __device__
#else
#define RESNET_HD
#endif

struct host_policy_t {};
inline constexpr host_policy_t host_policy{};

RESNET_HD inline float hd_sqrt(float x) { return sqrtf(x); }
RESNET_HD inline double hd_sqrt(double x) { return sqrt(x); }
RESNET_HD inline float hd_exp(float x) { return expf(x); }
RESNET_HD inline double hd_exp(double x) { return exp(x); }
RESNET_HD inline float hd_log(float x) { return logf(x); }
RESNET_HD inline double hd_log(double x) { return log(x); }

template <typename T>
RESNET_HD void sgd_momentum_at(T& param, T grad, T& velocity, T lr, T momentum, T weight_decay) {
  const T g = grad + weight_decay * param;
  velocity = momentum * velocity + g;
  param -= lr * velocity;
}

// Decoupled weight decay (AdamW). bias_correction_* is (1 - beta^t), computed once per step.
template <typename T>
RESNET_HD void adamw_at(T& param, T grad, T& first_moment, T& second_moment, T lr, T beta1, T beta2,
                        T eps, T weight_decay, T bias_correction_1, T bias_correction_2) {
  param -= lr * weight_decay * param;
  first_moment = beta1 * first_moment + (T(1) - beta1) * grad;
  second_moment = beta2 * second_moment + (T(1) - beta2) * grad * grad;
  const T mhat = first_moment / bias_correction_1;
  const T vhat = second_moment / bias_correction_2;
  param -= lr * mhat / (hd_sqrt(vhat) + eps);
}

template <typename T>
RESNET_HD T add_at(T a, T b) {
  return a + b;
}

template <typename T>
RESNET_HD T relu_at(T x) {
  return x > T(0) ? x : T(0);
}

template <typename T>
RESNET_HD T relu_backward_at(T x, T grad) {
  return x > T(0) ? grad : T(0);
}

// Stable log-softmax cross-entropy for one row.
// inv_n is 1/N so the written gradient is the mean over the batch.
// loss is the un-normalized per-example NLL; the caller averages it.
template <typename T>
RESNET_HD void softmax_cross_entropy_row(const T* logits, int label, int classes, T inv_n, T& loss,
                                         T* grad_row) {
  T max_logit = logits[0];
  for (int c = 1; c < classes; ++c) {
    if (logits[c] > max_logit) max_logit = logits[c];
  }
  T sum = 0;
  for (int c = 0; c < classes; ++c) sum += hd_exp(logits[c] - max_logit);
  loss = max_logit + hd_log(sum) - logits[label];
  if (grad_row != nullptr) {
    for (int c = 0; c < classes; ++c) {
      const T p = hd_exp(logits[c] - max_logit) / sum;
      const T target = (c == label) ? T(1) : T(0);
      grad_row[c] = (p - target) * inv_n;
    }
  }
}

template <typename T>
RESNET_HD int argmax_row(const T* row, int classes) {
  int best_index = 0;
  T best = row[0];
  for (int c = 1; c < classes; ++c) {
    if (row[c] > best) {
      best = row[c];
      best_index = c;
    }
  }
  return best_index;
}

template <typename T>
void sgd_momentum(host_policy_t, T* params, const T* grads, T* velocity, std::size_t n, T lr,
                  T momentum, T weight_decay) {
  for (std::size_t i = 0; i < n; ++i) {
    sgd_momentum_at(params[i], grads[i], velocity[i], lr, momentum, weight_decay);
  }
}

template <typename T>
void adamw(host_policy_t, T* params, const T* grads, T* first_moment, T* second_moment, std::size_t n,
           T lr, T beta1, T beta2, T eps, T weight_decay, T bias_correction_1, T bias_correction_2) {
  for (std::size_t i = 0; i < n; ++i) {
    adamw_at(params[i], grads[i], first_moment[i], second_moment[i], lr, beta1, beta2, eps,
             weight_decay, bias_correction_1, bias_correction_2);
  }
}

template <typename T>
void add(host_policy_t, const T* a, const T* b, T* out, std::size_t n) {
  for (std::size_t i = 0; i < n; ++i) out[i] = add_at(a[i], b[i]);
}

template <typename T>
void relu(host_policy_t, const T* in, T* out, std::size_t n) {
  for (std::size_t i = 0; i < n; ++i) out[i] = relu_at(in[i]);
}

template <typename T>
void relu_backward(host_policy_t, const T* input, const T* grad_out, T* grad_in, std::size_t n) {
  for (std::size_t i = 0; i < n; ++i) grad_in[i] = relu_backward_at(input[i], grad_out[i]);
}

template <typename T>
void bias_add(host_policy_t, T* data, const T* bias, int batch, int width) {
  for (int n = 0; n < batch; ++n) {
    for (int w = 0; w < width; ++w) data[static_cast<std::size_t>(n) * width + w] += bias[w];
  }
}

template <typename T>
void fill(host_policy_t, T* data, std::size_t n, T value) {
  for (std::size_t i = 0; i < n; ++i) data[i] = value;
}

// Mean softmax cross-entropy. When grad != nullptr it is filled with dL/dlogits
// of that mean (already divided by batch).
template <typename T>
T softmax_cross_entropy(host_policy_t, const T* logits, const int* labels, T* grad, int batch,
                        int classes) {
  T sum = 0;
  const T inv_n = T(1) / static_cast<T>(batch);
  for (int n = 0; n < batch; ++n) {
    T loss = 0;
    T* grad_row = grad == nullptr ? nullptr : grad + static_cast<std::size_t>(n) * classes;
    softmax_cross_entropy_row(logits + static_cast<std::size_t>(n) * classes, labels[n], classes,
                              inv_n, loss, grad_row);
    sum += loss;
  }
  return sum / static_cast<T>(batch);
}

template <typename T>
int count_correct(host_policy_t, const T* logits, const int* labels, int batch, int classes) {
  int correct = 0;
  for (int n = 0; n < batch; ++n) {
    const int pred = argmax_row(logits + static_cast<std::size_t>(n) * classes, classes);
    if (pred == labels[n]) ++correct;
  }
  return correct;
}

#if defined(__CUDACC__)

template <typename T>
struct SgdMomentumFn {
  T* params;
  const T* grads;
  T* velocity;
  T lr, momentum, weight_decay;
  __host__ __device__ void operator()(std::size_t i) const {
    sgd_momentum_at(params[i], grads[i], velocity[i], lr, momentum, weight_decay);
  }
};

template <typename T>
struct AdamWFn {
  T* params;
  const T* grads;
  T* first_moment;
  T* second_moment;
  T lr, beta1, beta2, eps, weight_decay, bias_correction_1, bias_correction_2;
  __host__ __device__ void operator()(std::size_t i) const {
    adamw_at(params[i], grads[i], first_moment[i], second_moment[i], lr, beta1, beta2, eps,
             weight_decay, bias_correction_1, bias_correction_2);
  }
};

template <typename T>
struct AddFn {
  const T* a;
  const T* b;
  T* out;
  __host__ __device__ void operator()(std::size_t i) const { out[i] = add_at(a[i], b[i]); }
};

template <typename T>
struct ReluFn {
  const T* in;
  T* out;
  __host__ __device__ void operator()(std::size_t i) const { out[i] = relu_at(in[i]); }
};

template <typename T>
struct ReluBackwardFn {
  const T* input;
  const T* grad_out;
  T* grad_in;
  __host__ __device__ void operator()(std::size_t i) const {
    grad_in[i] = relu_backward_at(input[i], grad_out[i]);
  }
};

template <typename T>
struct BiasAddFn {
  T* data;
  const T* bias;
  int width;
  __host__ __device__ void operator()(std::size_t i) const { data[i] += bias[i % static_cast<std::size_t>(width)]; }
};

template <typename Derived, typename T>
void sgd_momentum(const thrust::execution_policy<Derived>& policy, T* params, const T* grads,
                  T* velocity, std::size_t n, T lr, T momentum, T weight_decay) {
  if (n == 0) return;
  thrust::for_each(policy, thrust::counting_iterator<std::size_t>(0),
                   thrust::counting_iterator<std::size_t>(n),
                   SgdMomentumFn<T>{params, grads, velocity, lr, momentum, weight_decay});
}

template <typename Derived, typename T>
void adamw(const thrust::execution_policy<Derived>& policy, T* params, const T* grads,
           T* first_moment, T* second_moment, std::size_t n, T lr, T beta1, T beta2, T eps,
           T weight_decay, T bias_correction_1, T bias_correction_2) {
  if (n == 0) return;
  thrust::for_each(policy, thrust::counting_iterator<std::size_t>(0),
                   thrust::counting_iterator<std::size_t>(n),
                   AdamWFn<T>{params, grads, first_moment, second_moment, lr, beta1, beta2, eps,
                              weight_decay, bias_correction_1, bias_correction_2});
}

template <typename Derived, typename T>
void add(const thrust::execution_policy<Derived>& policy, const T* a, const T* b, T* out,
         std::size_t n) {
  if (n == 0) return;
  thrust::for_each(policy, thrust::counting_iterator<std::size_t>(0),
                   thrust::counting_iterator<std::size_t>(n), AddFn<T>{a, b, out});
}

template <typename Derived, typename T>
void relu(const thrust::execution_policy<Derived>& policy, const T* in, T* out, std::size_t n) {
  if (n == 0) return;
  thrust::for_each(policy, thrust::counting_iterator<std::size_t>(0),
                   thrust::counting_iterator<std::size_t>(n), ReluFn<T>{in, out});
}

template <typename Derived, typename T>
void relu_backward(const thrust::execution_policy<Derived>& policy, const T* input,
                   const T* grad_out, T* grad_in, std::size_t n) {
  if (n == 0) return;
  thrust::for_each(policy, thrust::counting_iterator<std::size_t>(0),
                   thrust::counting_iterator<std::size_t>(n),
                   ReluBackwardFn<T>{input, grad_out, grad_in});
}

template <typename Derived, typename T>
void bias_add(const thrust::execution_policy<Derived>& policy, T* data, const T* bias, int batch,
              int width) {
  const std::size_t n = static_cast<std::size_t>(batch) * static_cast<std::size_t>(width);
  if (n == 0) return;
  thrust::for_each(policy, thrust::counting_iterator<std::size_t>(0),
                   thrust::counting_iterator<std::size_t>(n), BiasAddFn<T>{data, bias, width});
}

template <typename Derived, typename T>
void fill(const thrust::execution_policy<Derived>& policy, T* data, std::size_t n, T value) {
  if (n == 0) return;
  thrust::fill(policy, data, data + n, value);
}

#endif  // __CUDACC__

#undef RESNET_HD

}  // namespace resnet
