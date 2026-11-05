import{i as e,n as t,r as n,t as r}from"./index-CCNkXD0j.js";var i=r(`download`,[[`path`,{d:`M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4`,key:`ih7n3h`}],[`polyline`,{points:`7 10 12 15 17 10`,key:`2ggqvy`}],[`line`,{x1:`12`,x2:`12`,y1:`15`,y2:`3`,key:`1vk2je`}]]),a=r(`layers`,[[`path`,{d:`M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z`,key:`zw3jo`}],[`path`,{d:`M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12`,key:`1wduqc`}],[`path`,{d:`M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17`,key:`kqbvx6`}]]),o=r(`sigma`,[[`path`,{d:`M18 7V5a1 1 0 0 0-1-1H6.5a.5.5 0 0 0-.4.8l4.5 6a2 2 0 0 1 0 2.4l-4.5 6a.5.5 0 0 0 .4.8H17a1 1 0 0 0 1-1v-2`,key:`wuwx1p`}]]),s=e(n(),1),c=new Set(`alignas.alignof.and.and_eq.asm.auto.bitand.bitor.bool.break.case.catch.char.char8_t.char16_t.char32_t.class.compl.concept.const.consteval.constexpr.constinit.const_cast.continue.co_await.co_return.co_yield.decltype.default.delete.do.double.dynamic_cast.else.enum.explicit.export.extern.false.float.for.friend.goto.if.inline.int.long.mutable.namespace.new.noexcept.not.not_eq.nullptr.operator.or.or_eq.private.protected.public.register.reinterpret_cast.requires.return.short.signed.sizeof.static.static_assert.static_cast.struct.switch.template.this.thread_local.throw.true.try.typedef.typeid.typename.union.unsigned.using.virtual.void.volatile.wchar_t.while.override.final`.split(`.`));function l(e){return/[A-Za-z_]/.test(e)}function u(e){return e>=`0`&&e<=`9`}function d(e){let t=[],n=e.length,r=0;for(;r<n;){let i=e[r];if(i===`/`&&e[r+1]===`/`){let i=r+2;for(;i<n&&e[i]!==`
`;)i+=1;t.push({text:e.slice(r,i),kind:`com`}),r=i}else if(i===`/`&&e[r+1]===`*`){let i=e.indexOf(`*/`,r+2),a=i<0?n:i+2;t.push({text:e.slice(r,a),kind:`com`}),r=a}else if(i===`"`||i===`'`){let a=r+1;for(;a<n&&e[a]!==`
`;)if(e[a]===`\\`)a+=2;else{if(e[a]===i){a+=1;break}a+=1}t.push({text:e.slice(r,a),kind:`str`}),r=a}else if(i===`#`){let i=r+1;for(;i<n&&e[i]!==`
`;)e[i]===`\\`&&e[i+1]===`
`?i+=2:i+=1;t.push({text:e.slice(r,i),kind:`pre`}),r=i}else if(u(i)&&(r===0||!l(e[r-1]))){let i=r+1;for(;i<n&&/[0-9a-fA-FxX.uUlL']/.test(e[i]);)i+=1;t.push({text:e.slice(r,i),kind:`num`}),r=i}else if(l(i)){let i=r+1;for(;i<n&&/[A-Za-z0-9_]/.test(e[i]);)i+=1;let a=e.slice(r,i);t.push({text:a,kind:c.has(a)?`key`:`plain`}),r=i}else t.push({text:i,kind:`plain`}),r+=1}return t}function f(e){let t=[[]];for(let n of d(e))n.text.split(`
`).forEach((e,r)=>{r>0&&t.push([]),e.length>0&&t[t.length-1].push({text:e,kind:n.kind})});return t.length>1&&t[t.length-1].length===0&&e.endsWith(`
`)&&t.pop(),t}var p=t(),m={plain:``,key:`token-key`,str:`token-str`,com:`token-com`,num:`token-num`,pre:`token-pre`};function h({code:e}){let t=(0,s.useMemo)(()=>f(e),[e]);return(0,p.jsx)(`div`,{className:`overflow-auto rounded-md border border-border bg-bg`,children:(0,p.jsx)(`table`,{className:`w-full border-collapse font-mono text-sm leading-6`,children:(0,p.jsx)(`tbody`,{children:t.map((e,t)=>(0,p.jsxs)(`tr`,{className:`align-top`,children:[(0,p.jsx)(`td`,{className:`w-12 select-none border-r border-border px-3 text-right text-muted`,children:t+1}),(0,p.jsx)(`td`,{className:`px-4 whitespace-pre`,children:e.length===0?` `:e.map((e,t)=>(0,p.jsx)(`span`,{className:m[e.kind],children:e.text},t))})]},t))})})})}var g=[{group:`Overview`,path:`README.md`,code:`# ResNet for MNIST, on CUDA

A small C++ class set that trains a residual network with the libraries that
actually own each job:

| Piece | Where it runs |
| --- | --- |
| Convolution, batch-norm, max-pool, global average pool | cuDNN |
| Classifier GEMM | cuBLAS (column-major view of row-major \`N x K\` storage) |
| ReLU, residual add, bias add, SGD, AdamW | Thrust execution-policy algorithms |
| Softmax cross-entropy | One \`__host__ __device__\` row function. Host policy is a loop; the device path is the same function in a kernel, then \`thrust::reduce\` |

The scalar updates live in \`include/resnet/algorithms.hpp\`. \`sgd_momentum_at\`,
\`adamw_at\`, \`relu_at\`, and \`softmax_cross_entropy_row\` are the only copies of
that math. \`host_policy\` runs them on the CPU (this is what the host tests
lock). A Thrust device policy runs the same functions on the GPU.

## Layout

\`\`\`
include/resnet/algorithms.hpp    execution-policy math
include/resnet/conv2d.hpp        cuDNN conv + bias
include/resnet/batch_norm.hpp    spatial batch-norm, train and eval
include/resnet/activation.hpp    Thrust ReLU
include/resnet/pooling.hpp       max pool and global average pool
include/resnet/linear.hpp        cuBLAS GEMM
include/resnet/residual.hpp      BasicBlock: y = ReLU(F(x) + S(x))
include/resnet/resnet.hpp        mnist and resnet18 builders
include/resnet/loss.hpp          device cross-entropy and accuracy
include/resnet/optimizer.hpp     momentum SGD and AdamW
include/resnet/checkpoint.hpp    named-tensor checkpoint
include/resnet/serializer.hpp    little-endian RESNET01 container
include/resnet/mnist.hpp         IDX loader and synthetic digits
include/resnet/trainer.hpp       shuffle, step decay, eval, save
examples/mnist_train.cu
\`\`\`

\`ArchSpec\` in \`geometry.hpp\` is the single description of both networks.
\`trainable_parameter_count\` is checked by the host tests:

- MNIST stem, 1 channel, 10 classes: **174,970** trainable values
- ResNet-18, 3 channels, 1000 classes: **11,689,512** (torchvision \`resnet18\`)

Convolutions have no bias (batch-norm follows). The classifier has a bias.
Downsample is a 1x1 conv plus batch-norm when the stride or width changes.
The MNIST network keeps 28x28 through the stem (no max-pool) and finishes at
7x7x64 before global average pooling. ResNet-18 on 224x224 finishes at 7x7x512.
On 28x28 it still runs and finishes at 1x1x512; prefer \`--arch mnist\` there.

## Build

CUDA toolkit and cuDNN 8 or 9 (legacy conv / batch-norm / pooling API, still
shipped in \`libcudnn\`).

\`\`\`
cmake -S . -B build -DCUDNN_ROOT_DIR=/usr
cmake --build build -j
./scripts/download_mnist.sh data/mnist
./build/mnist_train --data data/mnist --epochs 8 --batch 128 --lr 0.05
\`\`\`

\`--arch resnet18\` builds the ImageNet stem with 1 input channel so it can read
MNIST. \`--adamw\` swaps the optimizer. \`--checkpoint model.rsnt\` writes the best
test-accuracy weights. \`--resume model.rsnt\` loads them (optimizer moments start
over). \`--synthetic 4096\` trains on geometric digits when you have no IDX files.

A 5–8 epoch run of the MNIST architecture at batch 128 and lr 0.05 commonly
clears 99% test accuracy. That is a property of the task, not a guarantee of
every seed.

Host-only tests (serialization, IDX, the shared math, the architecture counts)
do not need a GPU:

\`\`\`
make test
\`\`\`

## Checkpoint

Magic \`RESNET01\`, version 1, explicit little-endian. Every collected tensor is
stored by name, including batch-norm running mean and variance. Load is strict:
missing names, unexpected names, rank, shape, and dtype all fail. Names follow
the torchvision pattern (\`layer2.0.conv1.weight\`, \`layer2.0.downsample.0.weight\`,
\`bn1.running_var\`, \`fc.bias\`).

## What is not in here

No data-parallel training, no mixed precision, no cuDNN graph fusion. Workspace
and algorithm choice prefer the first supported implicit-GEMM style kernel so
the shapes in this repo run, not so they win a benchmark. One \`CudnnContext\`
per thread; it must outlive the model.
`},{group:`Overview`,path:`CMakeLists.txt`,code:`cmake_minimum_required(VERSION 3.18)
project(resnet_cuda LANGUAGES CXX CUDA)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CUDA_STANDARD 17)
set(CMAKE_CUDA_STANDARD_REQUIRED ON)

if(NOT DEFINED CMAKE_CUDA_ARCHITECTURES)
  set(CMAKE_CUDA_ARCHITECTURES 70 75 80 86 89 90)
endif()

find_package(CUDAToolkit REQUIRED)

find_path(CUDNN_INCLUDE_DIR cudnn.h
  HINTS \${CUDNN_ROOT_DIR} $ENV{CUDNN_ROOT} \${CUDAToolkit_INCLUDE_DIRS}
  PATH_SUFFIXES include)
find_library(CUDNN_LIBRARY
  NAMES cudnn
  HINTS \${CUDNN_ROOT_DIR} $ENV{CUDNN_ROOT} \${CUDAToolkit_LIBRARY_ROOT}
  PATH_SUFFIXES lib lib64 lib/x64)

if(NOT CUDNN_INCLUDE_DIR OR NOT CUDNN_LIBRARY)
  message(FATAL_ERROR "cuDNN not found. Set CUDNN_ROOT_DIR to the cuDNN prefix.")
endif()

add_library(resnet STATIC
  src/context.cu
  src/tensor.cu
  src/conv2d.cu
  src/batch_norm.cu
  src/activation.cu
  src/pooling.cu
  src/linear.cu
  src/residual.cu
  src/resnet.cu
  src/loss.cu
  src/optimizer.cu
  src/checkpoint.cu
  src/trainer.cu
  src/serializer.cpp
  src/mnist.cpp
)

target_include_directories(resnet PUBLIC
  \${CMAKE_CURRENT_SOURCE_DIR}/include
  \${CUDNN_INCLUDE_DIR}
)
target_link_libraries(resnet PUBLIC CUDA::cudart CUDA::cublas \${CUDNN_LIBRARY})
target_compile_features(resnet PUBLIC cxx_std_17)

add_executable(mnist_train examples/mnist_train.cu)
target_link_libraries(mnist_train PRIVATE resnet)
`},{group:`Overview`,path:`Makefile`,code:`# Host tests only. The CUDA library is built with CMake — see README.md.
CXX ?= g++
CXXFLAGS ?= -std=c++17 -Wall -Wextra -Werror -I include

.PHONY: test
test:
	mkdir -p build
	$(CXX) $(CXXFLAGS) tests/test_host.cpp src/serializer.cpp src/mnist.cpp -o build/test_host
	./build/test_host
`},{group:`Spec`,path:`include/resnet/algorithms.hpp`,code:`#pragma once

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
`},{group:`Spec`,path:`include/resnet/geometry.hpp`,code:`#pragma once

#include <cstdint>
#include <cstring>

namespace resnet {

// Spatial helpers shared by the host tests and the CUDA model builder.
// Keep these formulas identical to the cuDNN NCHW conv / pool descriptors
// (dilation 1, cross-correlation).

constexpr int conv2d_out(int input, int kernel, int stride, int pad, int dilation = 1) {
  return (input + 2 * pad - dilation * (kernel - 1) - 1) / stride + 1;
}

constexpr int pool2d_out(int input, int kernel, int stride, int pad) {
  return (input + 2 * pad - kernel) / stride + 1;
}

struct BlockSpec {
  int blocks = 0;
  int channels = 0;
  int stride = 1;  // stride of the first block in the stage; later blocks use 1
};

// At most four stages. Unused tail entries have blocks == 0.
struct ArchSpec {
  const char* name;
  int conv1_channels;
  int conv1_kernel;
  int conv1_stride;
  int conv1_pad;
  bool max_pool;  // ImageNet stem: 3x3, stride 2, pad 1, after conv1+bn+relu
  int num_stages;
  BlockSpec stages[4];
};

// CIFAR-style stem on 28x28 grayscale. No max-pool (MNIST is already small).
inline ArchSpec mnist_arch() {
  ArchSpec a{"mnist", 16, 3, 1, 1, false, 3, {}};
  a.stages[0] = {2, 16, 1};
  a.stages[1] = {2, 32, 2};
  a.stages[2] = {2, 64, 2};
  return a;
}

// torchvision ResNet-18 stem and stages. BasicBlock, expansion 1.
inline ArchSpec resnet18_arch() {
  ArchSpec a{"resnet18", 64, 7, 2, 3, true, 4, {}};
  a.stages[0] = {2, 64, 1};
  a.stages[1] = {2, 128, 2};
  a.stages[2] = {2, 256, 2};
  a.stages[3] = {2, 512, 2};
  return a;
}

// Returns false when \`name\` is not "mnist" or "resnet18".
inline bool arch_by_name(const char* name, ArchSpec& out) {
  if (name != nullptr && std::strcmp(name, "resnet18") == 0) {
    out = resnet18_arch();
    return true;
  }
  if (name != nullptr && std::strcmp(name, "mnist") == 0) {
    out = mnist_arch();
    return true;
  }
  return false;
}

struct Spatial {
  int height = 0;
  int width = 0;
  int channels = 0;
};

// Trace conv1 (+ optional max-pool) and each stage's strided 3x3.
// The second 3x3 inside a basic block has stride 1 and does not change size.
inline Spatial spatial_after(const ArchSpec& arch, int height, int width) {
  Spatial s;
  s.height = conv2d_out(height, arch.conv1_kernel, arch.conv1_stride, arch.conv1_pad);
  s.width = conv2d_out(width, arch.conv1_kernel, arch.conv1_stride, arch.conv1_pad);
  if (arch.max_pool) {
    s.height = pool2d_out(s.height, 3, 2, 1);
    s.width = pool2d_out(s.width, 3, 2, 1);
  }
  s.channels = arch.conv1_channels;
  for (int stage = 0; stage < arch.num_stages; ++stage) {
    const int stride = arch.stages[stage].stride;
    s.height = conv2d_out(s.height, 3, stride, 1);
    s.width = conv2d_out(s.width, 3, stride, 1);
    s.channels = arch.stages[stage].channels;
  }
  return s;
}

inline long long conv_params(int in_c, int out_c, int kernel, bool bias) {
  long long n = static_cast<long long>(out_c) * in_c * kernel * kernel;
  if (bias) n += out_c;
  return n;
}

inline int bn_affine_params(int channels) { return channels * 2; }

inline long long basic_block_params(int in_c, int out_c, int stride) {
  long long n = conv_params(in_c, out_c, 3, false) + bn_affine_params(out_c);
  n += conv_params(out_c, out_c, 3, false) + bn_affine_params(out_c);
  if (stride != 1 || in_c != out_c) {
    n += conv_params(in_c, out_c, 1, false) + bn_affine_params(out_c);
  }
  return n;
}

// Trainable tensors only (conv/linear weights, BN gamma+beta, linear bias).
// Running mean/var are checkpointed but are not parameters.
inline long long trainable_parameter_count(const ArchSpec& arch, int in_channels, int num_classes) {
  long long n = conv_params(in_channels, arch.conv1_channels, arch.conv1_kernel, false);
  n += bn_affine_params(arch.conv1_channels);
  int channels = arch.conv1_channels;
  for (int stage = 0; stage < arch.num_stages; ++stage) {
    for (int block = 0; block < arch.stages[stage].blocks; ++block) {
      const int stride = block == 0 ? arch.stages[stage].stride : 1;
      const int out_c = arch.stages[stage].channels;
      n += basic_block_params(channels, out_c, stride);
      channels = out_c;
    }
  }
  n += static_cast<long long>(channels) * num_classes + num_classes;
  return n;
}

}  // namespace resnet
`},{group:`Spec`,path:`include/resnet/init.hpp`,code:`#pragma once

#include <cmath>
#include <cstdint>
#include <vector>

namespace resnet {

// SplitMix64. Deterministic across platforms, unlike std::normal_distribution.
class SplitMix64 {
 public:
  explicit SplitMix64(std::uint64_t seed) : state_(seed) {}

  std::uint64_t next() {
    std::uint64_t z = (state_ += 0x9e3779b97f4a7c15ULL);
    z = (z ^ (z >> 30)) * 0xbf58476d1ce4e5b9ULL;
    z = (z ^ (z >> 27)) * 0x94d049bb133111ebULL;
    return z ^ (z >> 31);
  }

  // (0, 1) with 53 bits of mantissa. Never returns 0.
  double uniform_open() {
    double u = static_cast<double>(next() >> 11) * (1.0 / 9007199254740992.0);
    if (u < 1e-12) u = 1e-12;
    return u;
  }

  double normal() {
    const double u1 = uniform_open();
    const double u2 = uniform_open();
    constexpr double kTwoPi = 6.28318530717958647692;
    return std::sqrt(-2.0 * std::log(u1)) * std::cos(kTwoPi * u2);
  }

 private:
  std::uint64_t state_;
};

inline std::uint64_t mix_seed(std::uint64_t seed, std::uint64_t index) {
  SplitMix64 rng(seed ^ (index * 0x9e3779b97f4a7c15ULL));
  return rng.next();
}

inline double he_stddev(int fan_in) {
  return std::sqrt(2.0 / static_cast<double>(fan_in < 1 ? 1 : fan_in));
}

// He normal: N(0, sqrt(2 / fan_in)). fan_in for conv is in_channels * kH * kW.
template <typename T>
std::vector<T> he_normal(std::size_t count, int fan_in, std::uint64_t seed) {
  SplitMix64 rng(seed);
  const double scale = he_stddev(fan_in);
  std::vector<T> out(count);
  for (std::size_t i = 0; i < count; ++i) {
    out[i] = static_cast<T>(rng.normal() * scale);
  }
  return out;
}

template <typename T>
std::vector<T> constant_fill(std::size_t count, T value) {
  return std::vector<T>(count, value);
}

}  // namespace resnet
`},{group:`Spec`,path:`include/resnet/serializer.hpp`,code:`#pragma once

#include "resnet/error.hpp"

#include <cstdint>
#include <cstring>
#include <string>
#include <type_traits>
#include <vector>

namespace resnet {

// Little-endian checkpoint. Magic "RESNET01", version 1.
//
//   uint32 version
//   uint32 flags          (0)
//   uint32 tensor_count
//   repeated:
//     uint32 name_len + bytes (no trailing NUL required)
//     uint32 rank + int32 dims[rank]
//     uint64 numel
//     uint32 dtype          (0 = f32, 1 = f64)
//     payload               (IEEE little-endian)

enum class DType : std::uint32_t { Float32 = 0, Float64 = 1 };

struct TensorBlob {
  std::string name;
  std::vector<std::int32_t> shape;
  DType dtype = DType::Float32;
  std::vector<std::uint8_t> bytes;
};

void save_checkpoint(const std::string& path, const std::vector<TensorBlob>& tensors);
std::vector<TensorBlob> load_checkpoint(const std::string& path);

template <typename T>
DType dtype_tag();

template <>
inline DType dtype_tag<float>() {
  return DType::Float32;
}
template <>
inline DType dtype_tag<double>() {
  return DType::Float64;
}

template <typename T>
TensorBlob make_blob(const std::string& name, const std::vector<int>& shape, const std::vector<T>& data) {
  static_assert(sizeof(T) == 4 || sizeof(T) == 8, "checkpoint supports f32 and f64 only");
  std::size_t expect = 1;
  TensorBlob blob;
  blob.name = name;
  blob.dtype = dtype_tag<T>();
  blob.shape.reserve(shape.size());
  for (int dim : shape) {
    if (dim < 0) throw Error("negative dimension in blob '" + name + "'");
    if (dim != 0 && expect > static_cast<std::size_t>(-1) / static_cast<std::size_t>(dim)) {
      throw Error("shape overflow in blob '" + name + "'");
    }
    expect *= static_cast<std::size_t>(dim);
    blob.shape.push_back(dim);
  }
  if (shape.empty()) expect = 0;
  if (data.size() != expect) {
    throw Error("blob '" + name + "' has " + std::to_string(data.size()) + " values but shape holds " +
                std::to_string(expect));
  }
  blob.bytes.resize(data.size() * sizeof(T));
  using Bits = typename std::conditional<sizeof(T) == 4, std::uint32_t, std::uint64_t>::type;
  for (std::size_t i = 0; i < data.size(); ++i) {
    Bits bits = 0;
    const T value = data[i];
    std::memcpy(&bits, &value, sizeof(T));
    for (std::size_t b = 0; b < sizeof(T); ++b) {
      blob.bytes[i * sizeof(T) + b] = static_cast<std::uint8_t>((bits >> (8 * b)) & 0xffu);
    }
  }
  return blob;
}

template <typename T>
std::vector<T> blob_values(const TensorBlob& blob) {
  if (blob.dtype != dtype_tag<T>()) throw Error("dtype mismatch for blob '" + blob.name + "'");
  if (blob.bytes.size() % sizeof(T) != 0) throw Error("truncated payload for blob '" + blob.name + "'");
  const std::size_t n = blob.bytes.size() / sizeof(T);
  std::vector<T> out(n);
  using Bits = typename std::conditional<sizeof(T) == 4, std::uint32_t, std::uint64_t>::type;
  for (std::size_t i = 0; i < n; ++i) {
    Bits bits = 0;
    for (std::size_t b = 0; b < sizeof(T); ++b) {
      bits |= static_cast<Bits>(blob.bytes[i * sizeof(T) + b]) << (8 * b);
    }
    std::memcpy(&out[i], &bits, sizeof(T));
  }
  return out;
}

}  // namespace resnet
`},{group:`Spec`,path:`include/resnet/mnist.hpp`,code:`#pragma once

#include <cstdint>
#include <string>
#include <vector>

namespace resnet {

// torchvision MNIST normalization, applied as (pixel/255 - mean) / std.
inline constexpr float kMnistMean = 0.1307f;
inline constexpr float kMnistStd = 0.3081f;

// One IDX split. Images are tightly packed uint8, row-major, rows*cols each.
struct MnistSplit {
  int rows = 28;
  int cols = 28;
  std::vector<std::uint8_t> images;
  std::vector<std::uint8_t> labels;

  int size() const { return static_cast<int>(labels.size()); }
  const std::uint8_t* image(int index) const {
    return images.data() + static_cast<std::size_t>(index) * static_cast<std::size_t>(rows) *
                               static_cast<std::size_t>(cols);
  }
};

// Standard uncompressed IDX files (Yann LeCun / ossci mirror, after gunzip).
MnistSplit load_mnist_split(const std::string& images_path, const std::string& labels_path);

// Class-conditional geometric digits with a few pixels of jitter.
// Enough for the training loop to move; not a substitute for real MNIST.
MnistSplit make_synthetic_digits(int count, std::uint32_t seed);

struct HostBatch {
  std::vector<float> images;  // NCHW, 1 channel, normalized
  std::vector<int> labels;
};

// indices selects examples. Copies [begin, begin+batch) of that index list.
void fill_batch(const MnistSplit& data, const std::vector<int>& indices, int begin, int batch,
                HostBatch& out, float mean = kMnistMean, float stddev = kMnistStd);

}  // namespace resnet
`},{group:`Runtime`,path:`include/resnet/tensor.hpp`,code:`#pragma once

#include "resnet/error.hpp"

#include <cstddef>
#include <vector>

namespace resnet {

inline std::size_t checked_numel(const std::vector<int>& shape) {
  if (shape.empty()) return 0;
  std::size_t n = 1;
  for (int dim : shape) {
    if (dim < 0) throw Error("negative tensor dimension");
    if (dim != 0 && n > static_cast<std::size_t>(-1) / static_cast<std::size_t>(dim)) {
      throw Error("tensor shape overflow");
    }
    n *= static_cast<std::size_t>(dim);
  }
  return n;
}

// Uninitialized device storage. Grows monotonically. Move-only.
template <typename T>
class DeviceBuffer {
 public:
  DeviceBuffer() = default;
  explicit DeviceBuffer(std::size_t n);
  ~DeviceBuffer();
  DeviceBuffer(const DeviceBuffer&) = delete;
  DeviceBuffer& operator=(const DeviceBuffer&) = delete;
  DeviceBuffer(DeviceBuffer&& other) noexcept;
  DeviceBuffer& operator=(DeviceBuffer&& other) noexcept;

  void resize(std::size_t n);
  T* data() { return data_; }
  const T* data() const { return data_; }
  std::size_t size() const { return size_; }
  void copy_from_host(const T* src, std::size_t n);
  void copy_to_host(T* dst, std::size_t n) const;
  void copy_from_device(const T* src, std::size_t n);
  void zero();

 private:
  T* data_ = nullptr;
  std::size_t size_ = 0;
  std::size_t cap_ = 0;
};

// N-D device tensor. \`requires_grad\` marks optimizer parameters.
// Activation tensors keep requires_grad false and own their storage via data().
template <typename T>
class Tensor {
 public:
  Tensor() = default;
  explicit Tensor(std::vector<int> shape, bool requires_grad = false);
  ~Tensor();
  Tensor(const Tensor&) = delete;
  Tensor& operator=(const Tensor&) = delete;
  Tensor(Tensor&& other) noexcept;
  Tensor& operator=(Tensor&& other) noexcept;

  void resize(const std::vector<int>& shape);
  const std::vector<int>& shape() const { return shape_; }
  int rank() const { return static_cast<int>(shape_.size()); }
  int dim(int index) const;
  std::size_t numel() const { return numel_; }
  bool requires_grad() const { return requires_grad_; }
  void set_requires_grad(bool value) { requires_grad_ = value; }

  T* data() { return data_.data(); }
  const T* data() const { return data_.data(); }
  // Allocates a zero buffer the first time. Only legal when requires_grad is set.
  T* grad();
  const T* grad() const;
  bool has_grad() const { return grad_.size() == numel_ && numel_ > 0; }
  void zero_grad();
  void zero_data();

  std::vector<T> to_host() const;
  void from_host(const std::vector<T>& values);
  void copy_from_device(const T* src);

 private:
  std::vector<int> shape_;
  std::size_t numel_ = 0;
  bool requires_grad_ = false;
  DeviceBuffer<T> data_;
  DeviceBuffer<T> grad_;
};

}  // namespace resnet
`},{group:`Runtime`,path:`include/resnet/module.hpp`,code:`#pragma once

#include "resnet/tensor.hpp"

#include <string>
#include <vector>

namespace resnet {

template <typename T>
struct NamedParam {
  std::string name;
  Tensor<T>* tensor = nullptr;
};

// Common surface for parameter collection and train/eval.
// Forward and backward stay concrete on each layer so multi-input ops
// (the residual add) are not forced through a single tensor.
template <typename T>
class Module {
 public:
  virtual ~Module() = default;
  virtual void train(bool mode) { training_ = mode; }
  void eval() { train(false); }
  bool training() const { return training_; }
  virtual void collect_parameters(const std::string& prefix, std::vector<NamedParam<T>>& out) = 0;

 protected:
  bool training_ = true;
};

}  // namespace resnet
`},{group:`Runtime`,path:`include/resnet/context.hpp`,code:`#pragma once

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
`},{group:`Runtime`,path:`include/resnet/check.hpp`,code:`#pragma once

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
`},{group:`Runtime`,path:`include/resnet/descriptors.hpp`,code:`#pragma once

#include "resnet/check.hpp"

namespace resnet {

class TensorDescriptor {
 public:
  TensorDescriptor() { RESNET_CUDNN_CHECK(cudnnCreateTensorDescriptor(&desc_)); }
  ~TensorDescriptor() {
    if (desc_ != nullptr) cudnnDestroyTensorDescriptor(desc_);
  }
  TensorDescriptor(const TensorDescriptor&) = delete;
  TensorDescriptor& operator=(const TensorDescriptor&) = delete;
  TensorDescriptor(TensorDescriptor&& other) noexcept : desc_(other.desc_) { other.desc_ = nullptr; }
  TensorDescriptor& operator=(TensorDescriptor&& other) noexcept {
    if (this != &other) {
      if (desc_ != nullptr) cudnnDestroyTensorDescriptor(desc_);
      desc_ = other.desc_;
      other.desc_ = nullptr;
    }
    return *this;
  }
  cudnnTensorDescriptor_t get() const { return desc_; }

 private:
  cudnnTensorDescriptor_t desc_ = nullptr;
};

class FilterDescriptor {
 public:
  FilterDescriptor() { RESNET_CUDNN_CHECK(cudnnCreateFilterDescriptor(&desc_)); }
  ~FilterDescriptor() {
    if (desc_ != nullptr) cudnnDestroyFilterDescriptor(desc_);
  }
  FilterDescriptor(const FilterDescriptor&) = delete;
  FilterDescriptor& operator=(const FilterDescriptor&) = delete;
  FilterDescriptor(FilterDescriptor&& other) noexcept : desc_(other.desc_) { other.desc_ = nullptr; }
  FilterDescriptor& operator=(FilterDescriptor&& other) noexcept {
    if (this != &other) {
      if (desc_ != nullptr) cudnnDestroyFilterDescriptor(desc_);
      desc_ = other.desc_;
      other.desc_ = nullptr;
    }
    return *this;
  }
  cudnnFilterDescriptor_t get() const { return desc_; }

 private:
  cudnnFilterDescriptor_t desc_ = nullptr;
};

class ConvDescriptor {
 public:
  ConvDescriptor() { RESNET_CUDNN_CHECK(cudnnCreateConvolutionDescriptor(&desc_)); }
  ~ConvDescriptor() {
    if (desc_ != nullptr) cudnnDestroyConvolutionDescriptor(desc_);
  }
  ConvDescriptor(const ConvDescriptor&) = delete;
  ConvDescriptor& operator=(const ConvDescriptor&) = delete;
  ConvDescriptor(ConvDescriptor&& other) noexcept : desc_(other.desc_) { other.desc_ = nullptr; }
  ConvDescriptor& operator=(ConvDescriptor&& other) noexcept {
    if (this != &other) {
      if (desc_ != nullptr) cudnnDestroyConvolutionDescriptor(desc_);
      desc_ = other.desc_;
      other.desc_ = nullptr;
    }
    return *this;
  }
  cudnnConvolutionDescriptor_t get() const { return desc_; }

 private:
  cudnnConvolutionDescriptor_t desc_ = nullptr;
};

class PoolDescriptor {
 public:
  PoolDescriptor() { RESNET_CUDNN_CHECK(cudnnCreatePoolingDescriptor(&desc_)); }
  ~PoolDescriptor() {
    if (desc_ != nullptr) cudnnDestroyPoolingDescriptor(desc_);
  }
  PoolDescriptor(const PoolDescriptor&) = delete;
  PoolDescriptor& operator=(const PoolDescriptor&) = delete;
  PoolDescriptor(PoolDescriptor&& other) noexcept : desc_(other.desc_) { other.desc_ = nullptr; }
  PoolDescriptor& operator=(PoolDescriptor&& other) noexcept {
    if (this != &other) {
      if (desc_ != nullptr) cudnnDestroyPoolingDescriptor(desc_);
      desc_ = other.desc_;
      other.desc_ = nullptr;
    }
    return *this;
  }
  cudnnPoolingDescriptor_t get() const { return desc_; }

 private:
  cudnnPoolingDescriptor_t desc_ = nullptr;
};

}  // namespace resnet
`},{group:`Runtime`,path:`include/resnet/error.hpp`,code:`#pragma once

#include <stdexcept>
#include <string>

namespace resnet {

// Project-wide exception. Thrown for shape errors, bad checkpoints, cuDNN/CUDA
// failures, and illegal training-state transitions.
class Error : public std::runtime_error {
 public:
  explicit Error(const std::string& message) : std::runtime_error(message) {}
};

}  // namespace resnet
`},{group:`Layers`,path:`include/resnet/conv2d.hpp`,code:`#pragma once

#include "resnet/context.hpp"
#include "resnet/descriptors.hpp"
#include "resnet/module.hpp"

#include <cstdint>

namespace resnet {

struct Conv2dConfig {
  int in_channels = 1;
  int out_channels = 1;
  int kernel = 3;
  int stride = 1;
  int pad = 1;
  bool bias = false;
  std::uint64_t seed = 0;
};

// NCHW cross-correlation via cuDNN. Weights are KCRS: [out, in, kH, kW].
// Activations are cached by copy so backward does not depend on the caller
// keeping the input tensor alive.
template <typename T>
class Conv2d : public Module<T> {
 public:
  Conv2d(CudnnContext& ctx, const Conv2dConfig& config);
  Tensor<T>& forward(const Tensor<T>& input);
  Tensor<T>& backward(const Tensor<T>& grad_out);
  Tensor<T>& grad_input() { return grad_input_; }
  void collect_parameters(const std::string& prefix, std::vector<NamedParam<T>>& out) override;

 private:
  struct ShapeKey {
    int n = -1, c = -1, h = -1, w = -1;
    bool operator==(const ShapeKey& other) const {
      return n == other.n && c == other.c && h == other.h && w == other.w;
    }
  };

  void configure(const Tensor<T>& input);

  CudnnContext* ctx_ = nullptr;
  int in_channels_ = 0;
  int out_channels_ = 0;
  int kernel_ = 0;
  int stride_ = 0;
  int pad_ = 0;
  bool bias_ = false;
  ShapeKey key_{};
  cudnnConvolutionFwdAlgo_t fwd_algo_ = CUDNN_CONVOLUTION_FWD_ALGO_IMPLICIT_GEMM;
  cudnnConvolutionBwdDataAlgo_t bwd_data_algo_ = CUDNN_CONVOLUTION_BWD_DATA_ALGO_0;
  cudnnConvolutionBwdFilterAlgo_t bwd_filter_algo_ = CUDNN_CONVOLUTION_BWD_FILTER_ALGO_0;
  std::size_t fwd_workspace_ = 0;
  std::size_t bwd_data_workspace_ = 0;
  std::size_t bwd_filter_workspace_ = 0;

  TensorDescriptor x_desc_;
  TensorDescriptor y_desc_;
  TensorDescriptor bias_desc_;
  FilterDescriptor w_desc_;
  ConvDescriptor conv_desc_;

  Tensor<T> weight_;
  Tensor<T> bias_;
  Tensor<T> output_;
  Tensor<T> grad_input_;
  Tensor<T> saved_input_;
};

}  // namespace resnet
`},{group:`Layers`,path:`include/resnet/batch_norm.hpp`,code:`#pragma once

#include "resnet/context.hpp"
#include "resnet/descriptors.hpp"
#include "resnet/module.hpp"

namespace resnet {

struct BatchNormConfig {
  int channels = 1;
  double eps = 1e-5;
  double momentum = 0.1;  // cuDNN exponential average factor
};

// Spatial batch-norm (per-channel), cuDNN training and inference paths.
// Affine scale/bias require grad. Running mean/var are checkpointed buffers.
template <typename T>
class BatchNorm : public Module<T> {
 public:
  BatchNorm(CudnnContext& ctx, const BatchNormConfig& config);
  Tensor<T>& forward(const Tensor<T>& input);
  Tensor<T>& backward(const Tensor<T>& grad_out);
  Tensor<T>& grad_input() { return grad_input_; }
  void collect_parameters(const std::string& prefix, std::vector<NamedParam<T>>& out) override;

 private:
  void configure(const Tensor<T>& input);

  CudnnContext* ctx_ = nullptr;
  int channels_ = 0;
  double eps_ = 1e-5;
  double momentum_ = 0.1;
  int cached_n_ = -1;
  int cached_h_ = -1;
  int cached_w_ = -1;

  TensorDescriptor x_desc_;
  TensorDescriptor bn_desc_;
  Tensor<T> scale_;
  Tensor<T> bias_;
  Tensor<T> running_mean_;
  Tensor<T> running_var_;
  Tensor<T> saved_mean_;
  Tensor<T> saved_inv_var_;
  Tensor<T> output_;
  Tensor<T> grad_input_;
  Tensor<T> saved_input_;
};

}  // namespace resnet
`},{group:`Layers`,path:`include/resnet/activation.hpp`,code:`#pragma once

#include "resnet/module.hpp"

namespace resnet {

// ReLU via the Thrust execution-policy algorithm in algorithms.hpp.
// The mask is the saved pre-activation (x > 0), matching relu_backward_at.
template <typename T>
class ReLU : public Module<T> {
 public:
  ReLU() = default;
  Tensor<T>& forward(const Tensor<T>& input);
  Tensor<T>& backward(const Tensor<T>& grad_out);
  Tensor<T>& grad_input() { return grad_input_; }
  void collect_parameters(const std::string& prefix, std::vector<NamedParam<T>>& out) override;

 private:
  Tensor<T> output_;
  Tensor<T> grad_input_;
  Tensor<T> saved_input_;
};

}  // namespace resnet
`},{group:`Layers`,path:`include/resnet/pooling.hpp`,code:`#pragma once

#include "resnet/context.hpp"
#include "resnet/descriptors.hpp"
#include "resnet/module.hpp"

namespace resnet {

enum class PoolKind { Max, GlobalAvg };

// Max pool uses a fixed window. Global average pool sets the window to the
// current HxW so the output is N,C,1,1 (cuDNN average, exclude padding).
template <typename T>
class Pool2d : public Module<T> {
 public:
  Pool2d(CudnnContext& ctx, PoolKind kind, int kernel = 0, int stride = 0, int pad = 0);
  Tensor<T>& forward(const Tensor<T>& input);
  Tensor<T>& backward(const Tensor<T>& grad_out);
  Tensor<T>& grad_input() { return grad_input_; }
  void collect_parameters(const std::string& prefix, std::vector<NamedParam<T>>& out) override;

 private:
  void configure(const Tensor<T>& input);

  CudnnContext* ctx_ = nullptr;
  PoolKind kind_ = PoolKind::Max;
  int kernel_ = 0;
  int stride_ = 0;
  int pad_ = 0;
  int cached_n_ = -1;
  int cached_c_ = -1;
  int cached_h_ = -1;
  int cached_w_ = -1;
  PoolDescriptor pool_desc_;
  TensorDescriptor x_desc_;
  TensorDescriptor y_desc_;
  Tensor<T> output_;
  Tensor<T> grad_input_;
  Tensor<T> saved_input_;
};

}  // namespace resnet
`},{group:`Layers`,path:`include/resnet/linear.hpp`,code:`#pragma once

#include "resnet/context.hpp"
#include "resnet/module.hpp"

#include <cstdint>

namespace resnet {

struct LinearConfig {
  int in_features = 1;
  int out_features = 1;
  bool bias = true;
  std::uint64_t seed = 0;
};

// Y = X W^T + b. X is row-major [N, K] or NCHW with K = C*H*W.
// The GEMM itself is cuBLAS (column-major view of the same bytes).
// Bias add and bias grad stay in a Thrust loop / a small reduction kernel.
template <typename T>
class Linear : public Module<T> {
 public:
  Linear(CudnnContext& ctx, const LinearConfig& config);
  Tensor<T>& forward(const Tensor<T>& input);
  Tensor<T>& backward(const Tensor<T>& grad_out);
  Tensor<T>& grad_input() { return grad_input_; }
  int out_features() const { return out_features_; }
  void collect_parameters(const std::string& prefix, std::vector<NamedParam<T>>& out) override;

 private:
  CudnnContext* ctx_ = nullptr;
  int in_features_ = 0;
  int out_features_ = 0;
  bool bias_ = true;
  int batch_ = -1;
  Tensor<T> weight_;  // [out, in]
  Tensor<T> bias_;    // [out]
  Tensor<T> output_;
  Tensor<T> grad_input_;
  Tensor<T> saved_input_;
  std::vector<int> input_shape_;
};

}  // namespace resnet
`},{group:`Layers`,path:`include/resnet/residual.hpp`,code:`#pragma once

#include "resnet/activation.hpp"
#include "resnet/batch_norm.hpp"
#include "resnet/conv2d.hpp"

#include <memory>

namespace resnet {

// y = ReLU(F(x) + S(x))
// F is conv3x3-bn-relu-conv3x3-bn. S is identity, or 1x1 conv + bn when
// the stride or the channel count changes. Addition is the Thrust \`add\` algorithm.
template <typename T>
class BasicBlock : public Module<T> {
 public:
  BasicBlock(CudnnContext& ctx, int in_channels, int out_channels, int stride, std::uint64_t& seed);
  Tensor<T>& forward(const Tensor<T>& input);
  Tensor<T>& backward(const Tensor<T>& grad_out);
  Tensor<T>& grad_input() { return grad_input_; }
  void train(bool mode) override;
  void collect_parameters(const std::string& prefix, std::vector<NamedParam<T>>& out) override;

 private:
  static std::uint64_t take(std::uint64_t& seed);

  Conv2d<T> conv1_;
  BatchNorm<T> bn1_;
  ReLU<T> relu1_;
  Conv2d<T> conv2_;
  BatchNorm<T> bn2_;
  ReLU<T> relu_out_;
  std::unique_ptr<Conv2d<T>> down_conv_;
  std::unique_ptr<BatchNorm<T>> down_bn_;
  Tensor<T> sum_;
  Tensor<T> grad_input_;
  std::vector<int> input_shape_;
};

}  // namespace resnet
`},{group:`Layers`,path:`include/resnet/resnet.hpp`,code:`#pragma once

#include "resnet/geometry.hpp"
#include "resnet/linear.hpp"
#include "resnet/pooling.hpp"
#include "resnet/residual.hpp"

#include <cstdint>
#include <memory>
#include <string>
#include <vector>

namespace resnet {

// ResNet built from ArchSpec.
//   mnist:    3x3 stem, 16-32-64, two basic blocks per stage. 174,970 trainable
//             values at 1 input channel and 10 classes.
//   resnet18: 7x7 stem + max-pool, 64-128-256-512. 11,689,512 trainable values
//             at 3 input channels and 1000 classes (torchvision resnet18).
template <typename T>
class ResNet : public Module<T> {
 public:
  ResNet(CudnnContext& ctx, const ArchSpec& arch, int in_channels, int num_classes, std::uint64_t seed);
  Tensor<T>& forward(const Tensor<T>& input);
  Tensor<T>& backward(const Tensor<T>& grad_logits);
  void train(bool mode) override;
  void zero_grad();
  void collect_parameters(const std::string& prefix, std::vector<NamedParam<T>>& out) override;

  const ArchSpec& spec() const { return arch_; }
  int in_channels() const { return in_channels_; }
  int num_classes() const { return num_classes_; }
  int fc_in_features() const { return fc_in_; }

 private:
  static std::string join(const std::string& prefix, const std::string& leaf);

  CudnnContext* ctx_ = nullptr;
  ArchSpec arch_{};
  int in_channels_ = 1;
  int num_classes_ = 10;
  int fc_in_ = 0;
  Conv2d<T> conv1_;
  BatchNorm<T> bn1_;
  ReLU<T> relu_;
  std::unique_ptr<Pool2d<T>> max_pool_;
  std::vector<std::vector<std::unique_ptr<BasicBlock<T>>>> stages_;
  Pool2d<T> gap_;
  std::unique_ptr<Linear<T>> fc_;
};

template <typename T>
ResNet<T> make_resnet(CudnnContext& ctx, const ArchSpec& arch, int in_channels, int num_classes,
                      std::uint64_t seed);

}  // namespace resnet
`},{group:`Layers`,path:`src/conv2d.cu`,code:`#include "resnet/conv2d.hpp"

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
`},{group:`Layers`,path:`src/batch_norm.cu`,code:`#include "resnet/batch_norm.hpp"

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
`},{group:`Layers`,path:`src/activation.cu`,code:`#include "resnet/activation.hpp"

#include "resnet/algorithms.hpp"

#include <thrust/execution_policy.h>

namespace resnet {

template <typename T>
Tensor<T>& ReLU<T>::forward(const Tensor<T>& input) {
  if (input.numel() == 0) throw Error("ReLU got an empty tensor");
  saved_input_.resize(input.shape());
  output_.resize(input.shape());
  saved_input_.copy_from_device(input.data());
  relu(thrust::device, saved_input_.data(), output_.data(), saved_input_.numel());
  return output_;
}

template <typename T>
Tensor<T>& ReLU<T>::backward(const Tensor<T>& grad_out) {
  if (saved_input_.numel() == 0) throw Error("ReLU::backward called before forward");
  if (grad_out.numel() != saved_input_.numel()) throw Error("ReLU gradient shape mismatch");
  grad_input_.resize(saved_input_.shape());
  relu_backward(thrust::device, saved_input_.data(), grad_out.data(), grad_input_.data(),
                saved_input_.numel());
  return grad_input_;
}

template <typename T>
void ReLU<T>::collect_parameters(const std::string&, std::vector<NamedParam<T>>&) {}

template class ReLU<float>;
template class ReLU<double>;

}  // namespace resnet
`},{group:`Layers`,path:`src/pooling.cu`,code:`#include "resnet/pooling.hpp"

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
`},{group:`Layers`,path:`src/linear.cu`,code:`#include "resnet/linear.hpp"

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
`},{group:`Layers`,path:`src/residual.cu`,code:`#include "resnet/residual.hpp"

#include "resnet/algorithms.hpp"
#include "resnet/init.hpp"

#include <thrust/execution_policy.h>

namespace resnet {

template <typename T>
std::uint64_t BasicBlock<T>::take(std::uint64_t& seed) {
  const std::uint64_t value = seed;
  seed = mix_seed(seed, 0xD1B54A32D192ED03ULL);
  return value;
}

template <typename T>
BasicBlock<T>::BasicBlock(CudnnContext& ctx, int in_channels, int out_channels, int stride,
                          std::uint64_t& seed)
    : conv1_(ctx, Conv2dConfig{in_channels, out_channels, 3, stride, 1, false, take(seed)}),
      bn1_(ctx, BatchNormConfig{out_channels}),
      conv2_(ctx, Conv2dConfig{out_channels, out_channels, 3, 1, 1, false, take(seed)}),
      bn2_(ctx, BatchNormConfig{out_channels}) {
  if (stride != 1 || in_channels != out_channels) {
    down_conv_ = std::make_unique<Conv2d<T>>(
        ctx, Conv2dConfig{in_channels, out_channels, 1, stride, 0, false, take(seed)});
    down_bn_ = std::make_unique<BatchNorm<T>>(ctx, BatchNormConfig{out_channels});
  }
}

template <typename T>
void BasicBlock<T>::train(bool mode) {
  Module<T>::train(mode);
  conv1_.train(mode);
  bn1_.train(mode);
  conv2_.train(mode);
  bn2_.train(mode);
  if (down_conv_) down_conv_->train(mode);
  if (down_bn_) down_bn_->train(mode);
}

template <typename T>
Tensor<T>& BasicBlock<T>::forward(const Tensor<T>& input) {
  input_shape_ = input.shape();
  Tensor<T>& hidden = relu1_.forward(bn1_.forward(conv1_.forward(input)));
  Tensor<T>& residual = bn2_.forward(conv2_.forward(hidden));
  if (down_conv_) {
    Tensor<T>& skip = down_bn_->forward(down_conv_->forward(input));
    if (skip.numel() != residual.numel()) throw Error("residual branch sizes differ");
    sum_.resize(residual.shape());
    add(thrust::device, residual.data(), skip.data(), sum_.data(), residual.numel());
  } else {
    if (input.numel() != residual.numel()) throw Error("identity shortcut shape mismatch");
    sum_.resize(residual.shape());
    add(thrust::device, residual.data(), input.data(), sum_.data(), residual.numel());
  }
  return relu_out_.forward(sum_);
}

template <typename T>
Tensor<T>& BasicBlock<T>::backward(const Tensor<T>& grad_out) {
  relu_out_.backward(grad_out);
  const Tensor<T>& grad_sum = relu_out_.grad_input();
  bn2_.backward(grad_sum);
  conv2_.backward(bn2_.grad_input());
  relu1_.backward(conv2_.grad_input());
  bn1_.backward(relu1_.grad_input());
  conv1_.backward(bn1_.grad_input());
  grad_input_.resize(input_shape_);
  if (down_conv_) {
    down_bn_->backward(grad_sum);
    down_conv_->backward(down_bn_->grad_input());
    add(thrust::device, conv1_.grad_input().data(), down_conv_->grad_input().data(), grad_input_.data(),
        grad_input_.numel());
  } else {
    add(thrust::device, conv1_.grad_input().data(), grad_sum.data(), grad_input_.data(), grad_input_.numel());
  }
  return grad_input_;
}

template <typename T>
void BasicBlock<T>::collect_parameters(const std::string& prefix, std::vector<NamedParam<T>>& out) {
  conv1_.collect_parameters(prefix + ".conv1", out);
  bn1_.collect_parameters(prefix + ".bn1", out);
  conv2_.collect_parameters(prefix + ".conv2", out);
  bn2_.collect_parameters(prefix + ".bn2", out);
  if (down_conv_) down_conv_->collect_parameters(prefix + ".downsample.0", out);
  if (down_bn_) down_bn_->collect_parameters(prefix + ".downsample.1", out);
}

template class BasicBlock<float>;
template class BasicBlock<double>;

}  // namespace resnet
`},{group:`Layers`,path:`src/resnet.cu`,code:`#include "resnet/resnet.hpp"

#include "resnet/init.hpp"

#include <string>

namespace resnet {

template <typename T>
std::string ResNet<T>::join(const std::string& prefix, const std::string& leaf) {
  return prefix.empty() ? leaf : prefix + "." + leaf;
}

template <typename T>
ResNet<T>::ResNet(CudnnContext& ctx, const ArchSpec& arch, int in_channels, int num_classes,
                  std::uint64_t seed)
    : ctx_(&ctx),
      arch_(arch),
      in_channels_(in_channels),
      num_classes_(num_classes),
      conv1_(ctx, Conv2dConfig{in_channels, arch.conv1_channels, arch.conv1_kernel, arch.conv1_stride,
                               arch.conv1_pad, false, mix_seed(seed, 1)}),
      bn1_(ctx, BatchNormConfig{arch.conv1_channels}),
      gap_(ctx, PoolKind::GlobalAvg) {
  if (in_channels <= 0 || num_classes <= 0) throw Error("ResNet channels and classes must be positive");
  if (arch.num_stages <= 0 || arch.num_stages > 4) throw Error("ResNet stage count must be 1..4");
  if (arch.max_pool) max_pool_ = std::make_unique<Pool2d<T>>(ctx, PoolKind::Max, 3, 2, 1);

  std::uint64_t cursor = mix_seed(seed, 2);
  int channels = arch.conv1_channels;
  stages_.resize(static_cast<std::size_t>(arch.num_stages));
  for (int s = 0; s < arch.num_stages; ++s) {
    const BlockSpec& spec = arch.stages[s];
    if (spec.blocks <= 0 || spec.channels <= 0 || spec.stride <= 0) throw Error("invalid ResNet stage");
    auto& stage = stages_[static_cast<std::size_t>(s)];
    stage.reserve(static_cast<std::size_t>(spec.blocks));
    for (int b = 0; b < spec.blocks; ++b) {
      const int stride = b == 0 ? spec.stride : 1;
      stage.push_back(std::make_unique<BasicBlock<T>>(ctx, channels, spec.channels, stride, cursor));
      channels = spec.channels;
    }
  }
  fc_in_ = channels;
  fc_ = std::make_unique<Linear<T>>(ctx, LinearConfig{fc_in_, num_classes_, true, mix_seed(seed, 3)});
}

template <typename T>
void ResNet<T>::train(bool mode) {
  Module<T>::train(mode);
  conv1_.train(mode);
  bn1_.train(mode);
  if (max_pool_) max_pool_->train(mode);
  for (auto& stage : stages_) {
    for (auto& block : stage) block->train(mode);
  }
  fc_->train(mode);
}

template <typename T>
Tensor<T>& ResNet<T>::forward(const Tensor<T>& input) {
  if (input.rank() != 4) throw Error("ResNet expects NCHW images");
  if (input.dim(1) != in_channels_) throw Error("ResNet input channel mismatch");
  Tensor<T>* h = &relu_.forward(bn1_.forward(conv1_.forward(input)));
  if (max_pool_) h = &max_pool_->forward(*h);
  for (auto& stage : stages_) {
    for (auto& block : stage) h = &block->forward(*h);
  }
  h = &gap_.forward(*h);
  return fc_->forward(*h);
}

template <typename T>
Tensor<T>& ResNet<T>::backward(const Tensor<T>& grad_logits) {
  fc_->backward(grad_logits);
  gap_.backward(fc_->grad_input());
  const Tensor<T>* grad = &gap_.grad_input();
  for (int s = static_cast<int>(stages_.size()) - 1; s >= 0; --s) {
    auto& stage = stages_[static_cast<std::size_t>(s)];
    for (int b = static_cast<int>(stage.size()) - 1; b >= 0; --b) {
      stage[static_cast<std::size_t>(b)]->backward(*grad);
      grad = &stage[static_cast<std::size_t>(b)]->grad_input();
    }
  }
  if (max_pool_) {
    max_pool_->backward(*grad);
    grad = &max_pool_->grad_input();
  }
  relu_.backward(*grad);
  bn1_.backward(relu_.grad_input());
  conv1_.backward(bn1_.grad_input());
  return conv1_.grad_input();
}

template <typename T>
void ResNet<T>::zero_grad() {
  std::vector<NamedParam<T>> params;
  collect_parameters("", params);
  for (NamedParam<T>& param : params) {
    if (param.tensor->requires_grad()) param.tensor->zero_grad();
  }
}

template <typename T>
void ResNet<T>::collect_parameters(const std::string& prefix, std::vector<NamedParam<T>>& out) {
  conv1_.collect_parameters(join(prefix, "conv1"), out);
  bn1_.collect_parameters(join(prefix, "bn1"), out);
  for (int s = 0; s < static_cast<int>(stages_.size()); ++s) {
    auto& stage = stages_[static_cast<std::size_t>(s)];
    for (int b = 0; b < static_cast<int>(stage.size()); ++b) {
      const std::string name = join(prefix, "layer" + std::to_string(s + 1) + "." + std::to_string(b));
      stage[static_cast<std::size_t>(b)]->collect_parameters(name, out);
    }
  }
  fc_->collect_parameters(join(prefix, "fc"), out);
}

template <typename T>
ResNet<T> make_resnet(CudnnContext& ctx, const ArchSpec& arch, int in_channels, int num_classes,
                      std::uint64_t seed) {
  return ResNet<T>(ctx, arch, in_channels, num_classes, seed);
}

template class ResNet<float>;
template class ResNet<double>;
template ResNet<float> make_resnet<float>(CudnnContext&, const ArchSpec&, int, int, std::uint64_t);
template ResNet<double> make_resnet<double>(CudnnContext&, const ArchSpec&, int, int, std::uint64_t);

}  // namespace resnet
`},{group:`Train`,path:`include/resnet/loss.hpp`,code:`#pragma once

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
`},{group:`Train`,path:`include/resnet/optimizer.hpp`,code:`#pragma once

#include "resnet/module.hpp"

#include <vector>

namespace resnet {

// Classic ResNet optimizer: momentum SGD with L2 added into the gradient.
// The element update is sgd_momentum_at, launched through Thrust.
template <typename T>
class SgdMomentum {
 public:
  SgdMomentum(T learning_rate, T momentum, T weight_decay);
  void set_lr(T learning_rate) { lr_ = learning_rate; }
  T lr() const { return lr_; }
  void step(const std::vector<NamedParam<T>>& params);

 private:
  struct Slot {
    Tensor<T>* key = nullptr;
    Tensor<T> velocity;
  };
  Tensor<T>& velocity_for(Tensor<T>* param);
  T lr_ = 0;
  T momentum_ = 0;
  T weight_decay_ = 0;
  std::vector<Slot> slots_;
};

// AdamW. Moments and the parameter write are adamw_at, also through Thrust.
// \`step\` is one global timestep shared by every parameter.
template <typename T>
class AdamW {
 public:
  AdamW(T learning_rate, T weight_decay, T beta1 = T(0.9), T beta2 = T(0.999), T eps = T(1e-8));
  void set_lr(T learning_rate) { lr_ = learning_rate; }
  T lr() const { return lr_; }
  void step(const std::vector<NamedParam<T>>& params);

 private:
  struct Slot {
    Tensor<T>* key = nullptr;
    Tensor<T> first;
    Tensor<T> second;
  };
  Slot& slot_for(Tensor<T>* param);
  T lr_ = 0;
  T weight_decay_ = 0;
  T beta1_ = T(0.9);
  T beta2_ = T(0.999);
  T eps_ = T(1e-8);
  int step_ = 0;
  std::vector<Slot> slots_;
};

}  // namespace resnet
`},{group:`Train`,path:`include/resnet/checkpoint.hpp`,code:`#pragma once

#include "resnet/module.hpp"

#include <string>

namespace resnet {

// Writes every collected tensor, including batch-norm running stats.
// Load matches by name and rejects missing names, extra names, and shape or
// dtype mismatches. Optimizer velocity is not part of the file.
template <typename T>
void save_module(const std::string& path, Module<T>& module);

template <typename T>
void load_module(const std::string& path, Module<T>& module);

}  // namespace resnet
`},{group:`Train`,path:`include/resnet/trainer.hpp`,code:`#pragma once

#include "resnet/mnist.hpp"
#include "resnet/resnet.hpp"

#include <cstdint>
#include <string>
#include <vector>

namespace resnet {

template <typename T>
struct TrainConfig {
  int epochs = 5;
  int batch_size = 128;
  T lr = T(0.05);
  T momentum = T(0.9);
  T weight_decay = T(1e-4);
  int log_interval = 20;
  std::string checkpoint;  // overwritten whenever test accuracy improves, or at the end
  std::uint64_t seed = 1;
  bool adamw = false;
};

template <typename T>
struct EpochStats {
  int epoch = 0;
  T mean_loss = 0;
  T train_accuracy = 0;
  T test_accuracy = -1;  // negative when no test split was passed
  double seconds = 0;
};

// Full-batch-loop trainer. Images are NCHW with a single channel taken from
// the split. Labels outside [0, num_classes) throw. The context and the model
// are the caller's; this function does not own them.
template <typename T>
std::vector<EpochStats<T>> train_mnist(CudnnContext& ctx, ResNet<T>& model, const MnistSplit& train,
                                       const MnistSplit* test, const TrainConfig<T>& config);

}  // namespace resnet
`},{group:`Train`,path:`src/loss.cu`,code:`#include "resnet/loss.hpp"

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
`},{group:`Train`,path:`src/optimizer.cu`,code:`#include "resnet/optimizer.hpp"

#include "resnet/algorithms.hpp"

#include <cmath>
#include <thrust/execution_policy.h>

namespace resnet {

template <typename T>
SgdMomentum<T>::SgdMomentum(T learning_rate, T momentum, T weight_decay)
    : lr_(learning_rate), momentum_(momentum), weight_decay_(weight_decay) {
  if (lr_ < T(0)) throw Error("learning rate must be >= 0");
}

template <typename T>
Tensor<T>& SgdMomentum<T>::velocity_for(Tensor<T>* param) {
  for (Slot& slot : slots_) {
    if (slot.key == param) return slot.velocity;
  }
  Slot slot;
  slot.key = param;
  slot.velocity = Tensor<T>(param->shape(), false);
  slot.velocity.zero_data();
  slots_.push_back(std::move(slot));
  return slots_.back().velocity;
}

template <typename T>
void SgdMomentum<T>::step(const std::vector<NamedParam<T>>& params) {
  for (const NamedParam<T>& param : params) {
    if (!param.tensor->requires_grad()) continue;
    Tensor<T>& velocity = velocity_for(param.tensor);
    if (velocity.numel() != param.tensor->numel()) {
      velocity.resize(param.tensor->shape());
      velocity.zero_data();
    }
    sgd_momentum(thrust::device, param.tensor->data(), param.tensor->grad(), velocity.data(),
                 param.tensor->numel(), lr_, momentum_, weight_decay_);
  }
}

template <typename T>
AdamW<T>::AdamW(T learning_rate, T weight_decay, T beta1, T beta2, T eps)
    : lr_(learning_rate), weight_decay_(weight_decay), beta1_(beta1), beta2_(beta2), eps_(eps) {
  if (lr_ < T(0) || eps_ <= T(0)) throw Error("invalid AdamW hyperparameters");
}

template <typename T>
typename AdamW<T>::Slot& AdamW<T>::slot_for(Tensor<T>* param) {
  for (Slot& slot : slots_) {
    if (slot.key == param) return slot;
  }
  Slot slot;
  slot.key = param;
  slot.first = Tensor<T>(param->shape(), false);
  slot.second = Tensor<T>(param->shape(), false);
  slot.first.zero_data();
  slot.second.zero_data();
  slots_.push_back(std::move(slot));
  return slots_.back();
}

template <typename T>
void AdamW<T>::step(const std::vector<NamedParam<T>>& params) {
  ++step_;
  const T correct_1 = T(1) - static_cast<T>(std::pow(static_cast<double>(beta1_), step_));
  const T correct_2 = T(1) - static_cast<T>(std::pow(static_cast<double>(beta2_), step_));
  for (const NamedParam<T>& param : params) {
    if (!param.tensor->requires_grad()) continue;
    Slot& slot = slot_for(param.tensor);
    adamw(thrust::device, param.tensor->data(), param.tensor->grad(), slot.first.data(), slot.second.data(),
          param.tensor->numel(), lr_, beta1_, beta2_, eps_, weight_decay_, correct_1, correct_2);
  }
}

template class SgdMomentum<float>;
template class SgdMomentum<double>;
template class AdamW<float>;
template class AdamW<double>;

}  // namespace resnet
`},{group:`Train`,path:`src/checkpoint.cu`,code:`#include "resnet/checkpoint.hpp"

#include "resnet/serializer.hpp"

#include <utility>

namespace resnet {

template <typename T>
void save_module(const std::string& path, Module<T>& module) {
  std::vector<NamedParam<T>> params;
  module.collect_parameters("", params);
  std::vector<TensorBlob> blobs;
  blobs.reserve(params.size());
  for (const NamedParam<T>& param : params) {
    std::vector<int> shape = param.tensor->shape();
    blobs.push_back(make_blob<T>(param.name, shape, param.tensor->to_host()));
  }
  save_checkpoint(path, blobs);
}

template <typename T>
void load_module(const std::string& path, Module<T>& module) {
  std::vector<NamedParam<T>> params;
  module.collect_parameters("", params);
  const std::vector<TensorBlob> blobs = load_checkpoint(path);
  std::vector<char> used(blobs.size(), 0);
  for (NamedParam<T>& param : params) {
    const TensorBlob* match = nullptr;
    for (std::size_t i = 0; i < blobs.size(); ++i) {
      if (blobs[i].name == param.name) {
        match = &blobs[i];
        used[i] = 1;
        break;
      }
    }
    if (match == nullptr) throw Error("checkpoint is missing '" + param.name + "'");
    if (match->dtype != dtype_tag<T>()) throw Error("dtype mismatch for '" + param.name + "'");
    if (match->shape.size() != param.tensor->shape().size()) {
      throw Error("rank mismatch for '" + param.name + "'");
    }
    for (std::size_t d = 0; d < match->shape.size(); ++d) {
      if (match->shape[d] != param.tensor->shape()[d]) {
        throw Error("shape mismatch for '" + param.name + "'");
      }
    }
    param.tensor->from_host(blob_values<T>(*match));
  }
  for (std::size_t i = 0; i < blobs.size(); ++i) {
    if (!used[i]) throw Error("checkpoint has unexpected tensor '" + blobs[i].name + "'");
  }
}

template void save_module<float>(const std::string&, Module<float>&);
template void save_module<double>(const std::string&, Module<double>&);
template void load_module<float>(const std::string&, Module<float>&);
template void load_module<double>(const std::string&, Module<double>&);

}  // namespace resnet
`},{group:`Train`,path:`src/trainer.cu`,code:`#include "resnet/trainer.hpp"

#include "resnet/loss.hpp"
#include "resnet/optimizer.hpp"
#include "resnet/checkpoint.hpp"

#include <algorithm>
#include <chrono>
#include <iostream>
#include <numeric>
#include <random>
#include <utility>

namespace resnet {
namespace {

template <typename T>
T run_split(ResNet<T>& model, const MnistSplit& split, int batch_size, bool training, LossWorkspace<T>& loss_ws,
            DeviceBuffer<int>& labels_d, Tensor<T>& images, SgdMomentum<T>* sgd, AdamW<T>* adam, T& mean_loss,
            int log_interval, std::uint64_t seed, int epoch) {
  std::vector<int> order(static_cast<std::size_t>(split.size()));
  std::iota(order.begin(), order.end(), 0);
  if (training) {
    std::mt19937 rng(static_cast<std::uint32_t>(seed + static_cast<std::uint64_t>(epoch) * 9973u));
    std::shuffle(order.begin(), order.end(), rng);
    model.train(true);
  } else {
    model.eval();
  }

  const int classes = model.num_classes();
  long long correct = 0;
  long long seen = 0;
  double loss_sum = 0;
  int batches = 0;
  int since_log = 0;
  double window_loss = 0;
  HostBatch host;
  Tensor<T> grad;
  std::vector<NamedParam<T>> params;
  if (training) model.collect_parameters("", params);

  for (int begin = 0; begin < split.size(); begin += batch_size) {
    const int batch = std::min(batch_size, split.size() - begin);
    fill_batch(split, order, begin, batch, host);
    for (int i = 0; i < batch; ++i) {
      const int label = host.labels[static_cast<std::size_t>(i)];
      if (label < 0 || label >= classes) {
        throw Error("label " + std::to_string(label) + " outside 0.." + std::to_string(classes - 1));
      }
    }
    images.resize({batch, 1, split.rows, split.cols});
    images.from_host(host.images);
    labels_d.resize(static_cast<std::size_t>(batch));
    labels_d.copy_from_host(host.labels.data(), static_cast<std::size_t>(batch));

    Tensor<T>& logits = model.forward(images);
    if (logits.rank() != 2 || logits.dim(0) != batch || logits.dim(1) != classes) {
      throw Error("model logits are not [batch, classes]");
    }

    T* grad_ptr = nullptr;
    if (training) {
      grad.resize({batch, classes});
      grad_ptr = grad.data();
    }
    const T loss = softmax_cross_entropy_cuda<T>(logits.data(), labels_d.data(), grad_ptr, batch, classes, loss_ws);
    const int hit = count_correct_cuda<T>(logits.data(), labels_d.data(), batch, classes, loss_ws);
    correct += hit;
    seen += batch;
    loss_sum += static_cast<double>(loss);
    ++batches;
    window_loss += static_cast<double>(loss);
    ++since_log;

    if (training) {
      model.zero_grad();
      model.backward(grad);
      if (adam != nullptr) adam->step(params);
      else sgd->step(params);
      if (log_interval > 0 && since_log >= log_interval) {
        std::cout << "  epoch " << epoch << "  step " << (begin / batch_size + 1) << "  loss "
                  << (window_loss / since_log) << "  lr " << (adam != nullptr ? adam->lr() : sgd->lr())
                  << std::endl;
        window_loss = 0;
        since_log = 0;
      }
    }
  }
  mean_loss = batches == 0 ? T(0) : static_cast<T>(loss_sum / batches);
  if (seen == 0) return T(0);
  return static_cast<T>(static_cast<double>(correct) / static_cast<double>(seen));
}

}  // namespace

template <typename T>
std::vector<EpochStats<T>> train_mnist(CudnnContext&, ResNet<T>& model, const MnistSplit& train,
                                       const MnistSplit* test, const TrainConfig<T>& config) {
  if (train.size() <= 0) throw Error("training split is empty");
  if (config.epochs <= 0 || config.batch_size <= 0) throw Error("epochs and batch size must be positive");
  if (train.rows <= 0 || train.cols <= 0) throw Error("MNIST spatial size is invalid");

  SgdMomentum<T> sgd(config.lr, config.momentum, config.weight_decay);
  AdamW<T> adam(config.lr, config.weight_decay);
  SgdMomentum<T>* sgd_ptr = config.adamw ? nullptr : &sgd;
  AdamW<T>* adam_ptr = config.adamw ? &adam : nullptr;

  LossWorkspace<T> loss_ws;
  DeviceBuffer<int> labels;
  Tensor<T> images;
  std::vector<EpochStats<T>> history;
  history.reserve(static_cast<std::size_t>(config.epochs));
  T best_accuracy = -1;
  bool saved = false;

  std::cout << "train " << train.size() << "  test " << (test != nullptr ? test->size() : 0) << "  batch "
            << config.batch_size << "  arch " << model.spec().name << std::endl;

  for (int epoch = 1; epoch <= config.epochs; ++epoch) {
    if (config.epochs >= 4 && (epoch == config.epochs / 2 || epoch == (3 * config.epochs) / 4)) {
      const T next = (adam_ptr != nullptr ? adam_ptr->lr() : sgd_ptr->lr()) * T(0.1);
      if (adam_ptr != nullptr) adam_ptr->set_lr(next);
      else sgd_ptr->set_lr(next);
      std::cout << "learning rate -> " << next << std::endl;
    }
    const auto t0 = std::chrono::steady_clock::now();
    T train_loss = 0;
    const T train_acc = run_split<T>(model, train, config.batch_size, true, loss_ws, labels, images, sgd_ptr,
                                     adam_ptr, train_loss, config.log_interval, config.seed, epoch);
    T test_acc = -1;
    if (test != nullptr && test->size() > 0) {
      T ignored = 0;
      test_acc = run_split<T>(model, *test, config.batch_size, false, loss_ws, labels, images, nullptr, nullptr,
                              ignored, 0, config.seed, epoch);
      model.train(true);
    }
    const double seconds = std::chrono::duration<double>(std::chrono::steady_clock::now() - t0).count();
    std::cout << "epoch " << epoch << "/" << config.epochs << "  loss " << train_loss << "  train_acc "
              << train_acc;
    if (test_acc >= T(0)) std::cout << "  test_acc " << test_acc;
    std::cout << "  " << seconds << "s" << std::endl;

    EpochStats<T> stats;
    stats.epoch = epoch;
    stats.mean_loss = train_loss;
    stats.train_accuracy = train_acc;
    stats.test_accuracy = test_acc;
    stats.seconds = seconds;
    history.push_back(stats);

    const bool improved = test_acc >= T(0) && test_acc >= best_accuracy;
    const bool last = epoch == config.epochs;
    if (!config.checkpoint.empty() && (improved || (test == nullptr && last) || (test_acc < T(0) && last))) {
      if (improved) best_accuracy = test_acc;
      save_module<T>(config.checkpoint, model);
      saved = true;
      std::cout << "wrote " << config.checkpoint << std::endl;
    }
  }
  (void)saved;
  return history;
}

template std::vector<EpochStats<float>> train_mnist<float>(CudnnContext&, ResNet<float>&, const MnistSplit&,
                                                           const MnistSplit*, const TrainConfig<float>&);
template std::vector<EpochStats<double>> train_mnist<double>(CudnnContext&, ResNet<double>&, const MnistSplit&,
                                                             const MnistSplit*, const TrainConfig<double>&);

}  // namespace resnet
`},{group:`Train`,path:`src/tensor.cu`,code:`#include "resnet/tensor.hpp"

#include "resnet/check.hpp"

#include <utility>

namespace resnet {

template <typename T>
DeviceBuffer<T>::DeviceBuffer(std::size_t n) {
  resize(n);
}

template <typename T>
DeviceBuffer<T>::~DeviceBuffer() {
  if (data_ != nullptr) cudaFree(data_);
}

template <typename T>
DeviceBuffer<T>::DeviceBuffer(DeviceBuffer&& other) noexcept
    : data_(other.data_), size_(other.size_), cap_(other.cap_) {
  other.data_ = nullptr;
  other.size_ = 0;
  other.cap_ = 0;
}

template <typename T>
DeviceBuffer<T>& DeviceBuffer<T>::operator=(DeviceBuffer&& other) noexcept {
  if (this != &other) {
    if (data_ != nullptr) cudaFree(data_);
    data_ = other.data_;
    size_ = other.size_;
    cap_ = other.cap_;
    other.data_ = nullptr;
    other.size_ = 0;
    other.cap_ = 0;
  }
  return *this;
}

template <typename T>
void DeviceBuffer<T>::resize(std::size_t n) {
  if (n > cap_) {
    T* fresh = nullptr;
    if (n != 0) RESNET_CUDA_CHECK(cudaMalloc(reinterpret_cast<void**>(&fresh), n * sizeof(T)));
    if (data_ != nullptr) cudaFree(data_);
    data_ = fresh;
    cap_ = n;
  }
  size_ = n;
}

template <typename T>
void DeviceBuffer<T>::copy_from_host(const T* src, std::size_t n) {
  if (n != size_) throw Error("host-to-device copy size does not match buffer");
  if (n == 0) return;
  RESNET_CUDA_CHECK(cudaMemcpy(data_, src, n * sizeof(T), cudaMemcpyHostToDevice));
}

template <typename T>
void DeviceBuffer<T>::copy_to_host(T* dst, std::size_t n) const {
  if (n != size_) throw Error("device-to-host copy size does not match buffer");
  if (n == 0) return;
  RESNET_CUDA_CHECK(cudaMemcpy(dst, data_, n * sizeof(T), cudaMemcpyDeviceToHost));
}

template <typename T>
void DeviceBuffer<T>::copy_from_device(const T* src, std::size_t n) {
  if (n != size_) throw Error("device copy size does not match buffer");
  if (n == 0) return;
  RESNET_CUDA_CHECK(cudaMemcpy(data_, src, n * sizeof(T), cudaMemcpyDeviceToDevice));
}

template <typename T>
void DeviceBuffer<T>::zero() {
  if (size_ == 0) return;
  RESNET_CUDA_CHECK(cudaMemset(data_, 0, size_ * sizeof(T)));
}

template <typename T>
Tensor<T>::Tensor(std::vector<int> shape, bool requires_grad) : requires_grad_(requires_grad) {
  resize(shape);
}

template <typename T>
Tensor<T>::~Tensor() = default;

template <typename T>
Tensor<T>::Tensor(Tensor&& other) noexcept
    : shape_(std::move(other.shape_)),
      numel_(other.numel_),
      requires_grad_(other.requires_grad_),
      data_(std::move(other.data_)),
      grad_(std::move(other.grad_)) {
  other.numel_ = 0;
  other.requires_grad_ = false;
}

template <typename T>
Tensor<T>& Tensor<T>::operator=(Tensor&& other) noexcept {
  if (this != &other) {
    shape_ = std::move(other.shape_);
    numel_ = other.numel_;
    requires_grad_ = other.requires_grad_;
    data_ = std::move(other.data_);
    grad_ = std::move(other.grad_);
    other.numel_ = 0;
    other.requires_grad_ = false;
  }
  return *this;
}

template <typename T>
void Tensor<T>::resize(const std::vector<int>& shape) {
  shape_ = shape;
  numel_ = checked_numel(shape_);
  data_.resize(numel_);
  if (grad_.size() != 0 && grad_.size() != numel_) {
    grad_.resize(numel_);
    grad_.zero();
  }
}

template <typename T>
int Tensor<T>::dim(int index) const {
  if (index < 0 || index >= rank()) throw Error("tensor dimension index out of range");
  return shape_[static_cast<std::size_t>(index)];
}

template <typename T>
T* Tensor<T>::grad() {
  if (!requires_grad_) throw Error("grad() called on a tensor that does not require grad");
  if (grad_.size() != numel_) {
    grad_.resize(numel_);
    grad_.zero();
  }
  return grad_.data();
}

template <typename T>
const T* Tensor<T>::grad() const {
  if (!requires_grad_ || grad_.size() != numel_) throw Error("gradient buffer is not allocated");
  return grad_.data();
}

template <typename T>
void Tensor<T>::zero_grad() {
  if (!requires_grad_) return;
  if (grad_.size() != numel_) grad_.resize(numel_);
  grad_.zero();
}

template <typename T>
void Tensor<T>::zero_data() {
  data_.zero();
}

template <typename T>
std::vector<T> Tensor<T>::to_host() const {
  std::vector<T> host(numel_);
  data_.copy_to_host(host.data(), numel_);
  return host;
}

template <typename T>
void Tensor<T>::from_host(const std::vector<T>& values) {
  if (values.size() != numel_) throw Error("from_host size does not match tensor");
  data_.copy_from_host(values.data(), values.size());
}

template <typename T>
void Tensor<T>::copy_from_device(const T* src) {
  data_.copy_from_device(src, numel_);
}

template class DeviceBuffer<float>;
template class DeviceBuffer<double>;
template class DeviceBuffer<int>;
template class Tensor<float>;
template class Tensor<double>;

}  // namespace resnet
`},{group:`Train`,path:`src/context.cu`,code:`#include "resnet/context.hpp"

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
`},{group:`Train`,path:`src/serializer.cpp`,code:`#include "resnet/serializer.hpp"

#include <fstream>
#include <limits>

namespace resnet {
namespace {

constexpr char kMagic[8] = {'R', 'E', 'S', 'N', 'E', 'T', '0', '1'};
constexpr std::uint32_t kVersion = 1;

void write_bytes(std::ostream& out, const void* data, std::size_t n) {
  out.write(static_cast<const char*>(data), static_cast<std::streamsize>(n));
  if (!out) throw Error("failed to write checkpoint");
}

void read_bytes(std::istream& in, void* data, std::size_t n) {
  in.read(static_cast<char*>(data), static_cast<std::streamsize>(n));
  if (!in) throw Error("checkpoint ended early");
}

void write_u32(std::ostream& out, std::uint32_t v) {
  unsigned char b[4] = {static_cast<unsigned char>(v & 0xffu),
                        static_cast<unsigned char>((v >> 8) & 0xffu),
                        static_cast<unsigned char>((v >> 16) & 0xffu),
                        static_cast<unsigned char>((v >> 24) & 0xffu)};
  write_bytes(out, b, 4);
}

void write_u64(std::ostream& out, std::uint64_t v) {
  unsigned char b[8];
  for (int i = 0; i < 8; ++i) b[i] = static_cast<unsigned char>((v >> (8 * i)) & 0xffu);
  write_bytes(out, b, 8);
}

void write_i32(std::ostream& out, std::int32_t v) {
  write_u32(out, static_cast<std::uint32_t>(v));
}

std::uint32_t read_u32(std::istream& in) {
  unsigned char b[4];
  read_bytes(in, b, 4);
  return static_cast<std::uint32_t>(b[0]) | (static_cast<std::uint32_t>(b[1]) << 8) |
         (static_cast<std::uint32_t>(b[2]) << 16) | (static_cast<std::uint32_t>(b[3]) << 24);
}

std::uint64_t read_u64(std::istream& in) {
  unsigned char b[8];
  read_bytes(in, b, 8);
  std::uint64_t v = 0;
  for (int i = 0; i < 8; ++i) v |= static_cast<std::uint64_t>(b[i]) << (8 * i);
  return v;
}

std::int32_t read_i32(std::istream& in) { return static_cast<std::int32_t>(read_u32(in)); }

std::size_t product(const std::vector<std::int32_t>& shape) {
  std::size_t n = 1;
  for (std::int32_t dim : shape) {
    if (dim < 0) throw Error("negative dimension in checkpoint");
    if (dim != 0 && n > std::numeric_limits<std::size_t>::max() / static_cast<std::size_t>(dim)) {
      throw Error("shape overflow in checkpoint");
    }
    n *= static_cast<std::size_t>(dim);
  }
  if (shape.empty()) return 0;
  return n;
}

}  // namespace

void save_checkpoint(const std::string& path, const std::vector<TensorBlob>& tensors) {
  std::ofstream out(path, std::ios::binary);
  if (!out) throw Error("cannot open '" + path + "' for writing");
  write_bytes(out, kMagic, 8);
  write_u32(out, kVersion);
  write_u32(out, 0);
  if (tensors.size() > std::numeric_limits<std::uint32_t>::max()) {
    throw Error("too many tensors to checkpoint");
  }
  write_u32(out, static_cast<std::uint32_t>(tensors.size()));
  for (const TensorBlob& blob : tensors) {
    if (blob.name.size() > std::numeric_limits<std::uint32_t>::max()) {
      throw Error("tensor name too long");
    }
    write_u32(out, static_cast<std::uint32_t>(blob.name.size()));
    write_bytes(out, blob.name.data(), blob.name.size());
    if (blob.shape.size() > std::numeric_limits<std::uint32_t>::max()) {
      throw Error("rank too high for '" + blob.name + "'");
    }
    write_u32(out, static_cast<std::uint32_t>(blob.shape.size()));
    for (std::int32_t dim : blob.shape) write_i32(out, dim);
    const std::size_t numel = product(blob.shape);
    const std::size_t width = blob.dtype == DType::Float64 ? 8u : 4u;
    if (blob.dtype != DType::Float32 && blob.dtype != DType::Float64) {
      throw Error("unknown dtype for '" + blob.name + "'");
    }
    if (blob.bytes.size() != numel * width) {
      throw Error("payload size does not match shape for '" + blob.name + "'");
    }
    write_u64(out, static_cast<std::uint64_t>(numel));
    write_u32(out, static_cast<std::uint32_t>(blob.dtype));
    write_bytes(out, blob.bytes.data(), blob.bytes.size());
  }
}

std::vector<TensorBlob> load_checkpoint(const std::string& path) {
  std::ifstream in(path, std::ios::binary);
  if (!in) throw Error("cannot open '" + path + "'");
  char magic[8];
  read_bytes(in, magic, 8);
  for (int i = 0; i < 8; ++i) {
    if (magic[i] != kMagic[i]) throw Error("not a RESNET01 checkpoint: " + path);
  }
  const std::uint32_t version = read_u32(in);
  if (version != kVersion) throw Error("unsupported checkpoint version " + std::to_string(version));
  (void)read_u32(in);  // flags
  const std::uint32_t count = read_u32(in);
  std::vector<TensorBlob> tensors;
  tensors.reserve(count);
  for (std::uint32_t i = 0; i < count; ++i) {
    TensorBlob blob;
    const std::uint32_t name_len = read_u32(in);
    blob.name.resize(name_len);
    if (name_len) read_bytes(in, blob.name.data(), name_len);
    const std::uint32_t rank = read_u32(in);
    blob.shape.resize(rank);
    for (std::uint32_t d = 0; d < rank; ++d) blob.shape[d] = read_i32(in);
    const std::uint64_t numel = read_u64(in);
    if (product(blob.shape) != static_cast<std::size_t>(numel)) {
      throw Error("numel does not match shape for '" + blob.name + "'");
    }
    const std::uint32_t dtype = read_u32(in);
    if (dtype == static_cast<std::uint32_t>(DType::Float32)) blob.dtype = DType::Float32;
    else if (dtype == static_cast<std::uint32_t>(DType::Float64)) blob.dtype = DType::Float64;
    else throw Error("unknown dtype code in checkpoint");
    const std::size_t width = blob.dtype == DType::Float64 ? 8u : 4u;
    blob.bytes.resize(static_cast<std::size_t>(numel) * width);
    if (!blob.bytes.empty()) read_bytes(in, blob.bytes.data(), blob.bytes.size());
    tensors.push_back(std::move(blob));
  }
  return tensors;
}

}  // namespace resnet
`},{group:`Train`,path:`src/mnist.cpp`,code:`#include "resnet/mnist.hpp"

#include "resnet/error.hpp"
#include "resnet/init.hpp"

#include <fstream>

namespace resnet {
namespace {

std::uint32_t read_be_u32(std::istream& in) {
  unsigned char b[4];
  in.read(reinterpret_cast<char*>(b), 4);
  if (!in) throw Error("IDX file ended early");
  return (std::uint32_t{b[0]} << 24) | (std::uint32_t{b[1]} << 16) | (std::uint32_t{b[2]} << 8) |
         std::uint32_t{b[3]};
}

void put_pixel(std::uint8_t* img, int rows, int cols, int r, int c) {
  if (r < 0 || c < 0 || r >= rows || c >= cols) return;
  img[r * cols + c] = 255;
}

void hline(std::uint8_t* img, int rows, int cols, int r, int c0, int c1, int oy, int ox) {
  if (c1 < c0) {
    const int t = c0;
    c0 = c1;
    c1 = t;
  }
  for (int c = c0; c <= c1; ++c) put_pixel(img, rows, cols, r + oy, c + ox);
}

void vline(std::uint8_t* img, int rows, int cols, int c, int r0, int r1, int oy, int ox) {
  if (r1 < r0) {
    const int t = r0;
    r0 = r1;
    r1 = t;
  }
  for (int r = r0; r <= r1; ++r) put_pixel(img, rows, cols, r + oy, c + ox);
}

void paint_digit(std::uint8_t* img, int rows, int cols, int label, int ox, int oy) {
  const int top = 4;
  const int bot = rows - 5;
  const int left = 6;
  const int right = cols - 7;
  const int mid = (top + bot) / 2;
  const int cx = (left + right) / 2;
  switch (label) {
    case 0:
      hline(img, rows, cols, top, left, right, oy, ox);
      hline(img, rows, cols, bot, left, right, oy, ox);
      vline(img, rows, cols, left, top, bot, oy, ox);
      vline(img, rows, cols, right, top, bot, oy, ox);
      break;
    case 1:
      vline(img, rows, cols, cx, top, bot, oy, ox);
      hline(img, rows, cols, top, cx - 3, cx, oy, ox);
      hline(img, rows, cols, bot, cx - 4, cx + 4, oy, ox);
      break;
    case 2:
      hline(img, rows, cols, top, left, right, oy, ox);
      hline(img, rows, cols, mid, left, right, oy, ox);
      hline(img, rows, cols, bot, left, right, oy, ox);
      vline(img, rows, cols, right, top, mid, oy, ox);
      vline(img, rows, cols, left, mid, bot, oy, ox);
      break;
    case 3:
      hline(img, rows, cols, top, left, right, oy, ox);
      hline(img, rows, cols, mid, left, right, oy, ox);
      hline(img, rows, cols, bot, left, right, oy, ox);
      vline(img, rows, cols, right, top, bot, oy, ox);
      break;
    case 4:
      vline(img, rows, cols, left, top, mid, oy, ox);
      vline(img, rows, cols, right, top, bot, oy, ox);
      hline(img, rows, cols, mid, left, right, oy, ox);
      break;
    case 5:
      hline(img, rows, cols, top, left, right, oy, ox);
      hline(img, rows, cols, mid, left, right, oy, ox);
      hline(img, rows, cols, bot, left, right, oy, ox);
      vline(img, rows, cols, left, top, mid, oy, ox);
      vline(img, rows, cols, right, mid, bot, oy, ox);
      break;
    case 6:
      hline(img, rows, cols, top, left, right, oy, ox);
      hline(img, rows, cols, mid, left, right, oy, ox);
      hline(img, rows, cols, bot, left, right, oy, ox);
      vline(img, rows, cols, left, top, bot, oy, ox);
      vline(img, rows, cols, right, mid, bot, oy, ox);
      break;
    case 7:
      hline(img, rows, cols, top, left, right, oy, ox);
      vline(img, rows, cols, right, top, bot, oy, ox);
      break;
    case 8:
      hline(img, rows, cols, top, left, right, oy, ox);
      hline(img, rows, cols, mid, left, right, oy, ox);
      hline(img, rows, cols, bot, left, right, oy, ox);
      vline(img, rows, cols, left, top, bot, oy, ox);
      vline(img, rows, cols, right, top, bot, oy, ox);
      break;
    default:
      hline(img, rows, cols, top, left, right, oy, ox);
      hline(img, rows, cols, mid, left, right, oy, ox);
      hline(img, rows, cols, bot, left, right, oy, ox);
      vline(img, rows, cols, left, top, mid, oy, ox);
      vline(img, rows, cols, right, top, bot, oy, ox);
      break;
  }
}

}  // namespace

MnistSplit load_mnist_split(const std::string& images_path, const std::string& labels_path) {
  std::ifstream images(images_path, std::ios::binary);
  if (!images) throw Error("cannot open images '" + images_path + "'");
  std::ifstream labels(labels_path, std::ios::binary);
  if (!labels) throw Error("cannot open labels '" + labels_path + "'");

  const std::uint32_t image_magic = read_be_u32(images);
  if (image_magic != 2051u) throw Error("bad image magic in '" + images_path + "' (expected 2051)");
  const std::uint32_t image_count = read_be_u32(images);
  const std::uint32_t rows = read_be_u32(images);
  const std::uint32_t cols = read_be_u32(images);
  if (rows == 0 || cols == 0 || rows > 4096u || cols > 4096u) {
    throw Error("implausible IDX spatial size");
  }

  const std::uint32_t label_magic = read_be_u32(labels);
  if (label_magic != 2049u) throw Error("bad label magic in '" + labels_path + "' (expected 2049)");
  const std::uint32_t label_count = read_be_u32(labels);
  if (label_count != image_count) throw Error("image/label count mismatch");

  MnistSplit split;
  split.rows = static_cast<int>(rows);
  split.cols = static_cast<int>(cols);
  const std::size_t pixels =
      static_cast<std::size_t>(image_count) * static_cast<std::size_t>(rows) * cols;
  split.images.resize(pixels);
  split.labels.resize(label_count);
  images.read(reinterpret_cast<char*>(split.images.data()), static_cast<std::streamsize>(pixels));
  if (!images) throw Error("truncated image payload in '" + images_path + "'");
  labels.read(reinterpret_cast<char*>(split.labels.data()), static_cast<std::streamsize>(label_count));
  if (!labels) throw Error("truncated label payload in '" + labels_path + "'");
  return split;
}

MnistSplit make_synthetic_digits(int count, std::uint32_t seed) {
  if (count < 0) throw Error("synthetic count must be >= 0");
  MnistSplit split;
  split.rows = 28;
  split.cols = 28;
  split.images.assign(static_cast<std::size_t>(count) * 28u * 28u, 0);
  split.labels.resize(static_cast<std::size_t>(count));
  SplitMix64 rng(seed);
  for (int i = 0; i < count; ++i) {
    const int label = static_cast<int>(rng.next() % 10u);
    const int ox = static_cast<int>(rng.next() % 5u) - 2;
    const int oy = static_cast<int>(rng.next() % 5u) - 2;
    split.labels[static_cast<std::size_t>(i)] = static_cast<std::uint8_t>(label);
    paint_digit(split.images.data() + static_cast<std::size_t>(i) * 28u * 28u, 28, 28, label, ox, oy);
  }
  return split;
}

void fill_batch(const MnistSplit& data, const std::vector<int>& indices, int begin, int batch,
                HostBatch& out, float mean, float stddev) {
  if (batch < 0 || begin < 0) throw Error("bad batch range");
  if (static_cast<std::size_t>(begin) + static_cast<std::size_t>(batch) > indices.size()) {
    throw Error("batch range exceeds index list");
  }
  if (stddev == 0.f) throw Error("stddev must be non-zero");
  const int pixels = data.rows * data.cols;
  out.images.resize(static_cast<std::size_t>(batch) * static_cast<std::size_t>(pixels));
  out.labels.resize(static_cast<std::size_t>(batch));
  for (int i = 0; i < batch; ++i) {
    const int index = indices[static_cast<std::size_t>(begin + i)];
    if (index < 0 || index >= data.size()) throw Error("example index out of range");
    const std::uint8_t* src = data.image(index);
    float* dst = out.images.data() + static_cast<std::size_t>(i) * static_cast<std::size_t>(pixels);
    for (int p = 0; p < pixels; ++p) {
      const float x = static_cast<float>(src[p]) / 255.f;
      dst[p] = (x - mean) / stddev;
    }
    out.labels[static_cast<std::size_t>(i)] = static_cast<int>(data.labels[static_cast<std::size_t>(index)]);
  }
}

}  // namespace resnet
`},{group:`Train`,path:`examples/mnist_train.cu`,code:`#include "resnet/all.hpp"

#include <cstdint>
#include <iostream>
#include <string>

namespace {

void usage() {
  std::cerr
      << "mnist_train --data DIR | --synthetic N [options]\\n"
      << "  --data DIR          uncompressed IDX directory\\n"
      << "  --synthetic N       class-conditional digits instead of IDX files\\n"
      << "  --arch mnist|resnet18\\n"
      << "  --epochs N          default 5\\n"
      << "  --batch N           default 128\\n"
      << "  --lr F              default 0.05 (SGD) \\n"
      << "  --momentum F        default 0.9\\n"
      << "  --weight-decay F    default 1e-4\\n"
      << "  --adamw             AdamW instead of momentum SGD\\n"
      << "  --seed N            default 1\\n"
      << "  --checkpoint PATH   write the best (or final) weights\\n"
      << "  --resume PATH       load a checkpoint before training\\n";
}

bool take(int& i, int argc, char** argv, std::string& out) {
  if (i + 1 >= argc) return false;
  out = argv[++i];
  return true;
}

}  // namespace

int main(int argc, char** argv) {
  std::string data;
  std::string arch_name = "mnist";
  std::string checkpoint;
  std::string resume;
  int epochs = 5;
  int batch = 128;
  int synthetic = 0;
  float lr = 0.05f;
  float momentum = 0.9f;
  float weight_decay = 1e-4f;
  std::uint64_t seed = 1;
  bool adamw = false;

  for (int i = 1; i < argc; ++i) {
    const std::string arg = argv[i];
    std::string value;
    if (arg == "--help" || arg == "-h") {
      usage();
      return 0;
    } else if (arg == "--adamw") {
      adamw = true;
    } else if (arg == "--data" && take(i, argc, argv, value)) {
      data = value;
    } else if (arg == "--arch" && take(i, argc, argv, value)) {
      arch_name = value;
    } else if (arg == "--checkpoint" && take(i, argc, argv, value)) {
      checkpoint = value;
    } else if (arg == "--resume" && take(i, argc, argv, value)) {
      resume = value;
    } else if (arg == "--epochs" && take(i, argc, argv, value)) {
      epochs = std::stoi(value);
    } else if (arg == "--batch" && take(i, argc, argv, value)) {
      batch = std::stoi(value);
    } else if (arg == "--synthetic" && take(i, argc, argv, value)) {
      synthetic = std::stoi(value);
    } else if (arg == "--lr" && take(i, argc, argv, value)) {
      lr = std::stof(value);
    } else if (arg == "--momentum" && take(i, argc, argv, value)) {
      momentum = std::stof(value);
    } else if (arg == "--weight-decay" && take(i, argc, argv, value)) {
      weight_decay = std::stof(value);
    } else if (arg == "--seed" && take(i, argc, argv, value)) {
      seed = std::stoull(value);
    } else {
      usage();
      return 2;
    }
  }
  if (data.empty() && synthetic <= 0) {
    usage();
    return 2;
  }

  resnet::ArchSpec arch{};
  if (!resnet::arch_by_name(arch_name.c_str(), arch)) {
    std::cerr << "unknown arch '" << arch_name << "'\\n";
    return 2;
  }

  resnet::MnistSplit train_split;
  resnet::MnistSplit test_split;
  if (synthetic > 0) {
    const int test_n = synthetic / 5 > 32 ? synthetic / 5 : 32;
    train_split = resnet::make_synthetic_digits(synthetic, static_cast<std::uint32_t>(seed));
    test_split = resnet::make_synthetic_digits(test_n, static_cast<std::uint32_t>(seed + 17));
  } else {
    train_split = resnet::load_mnist_split(data + "/train-images-idx3-ubyte", data + "/train-labels-idx1-ubyte");
    test_split = resnet::load_mnist_split(data + "/t10k-images-idx3-ubyte", data + "/t10k-labels-idx1-ubyte");
  }

  resnet::CudnnContext ctx;
  resnet::ResNet<float> model = resnet::make_resnet<float>(ctx, arch, 1, 10, seed);
  std::vector<resnet::NamedParam<float>> params;
  model.collect_parameters("", params);
  long long trainable = 0;
  long long buffers = 0;
  for (const resnet::NamedParam<float>& param : params) {
    const long long n = static_cast<long long>(param.tensor->numel());
    if (param.tensor->requires_grad()) trainable += n;
    else buffers += n;
    std::cout << (param.tensor->requires_grad() ? "param " : "buffer ") << param.name << "  " << n << "\\n";
  }
  const long long expect = resnet::trainable_parameter_count(arch, 1, 10);
  if (trainable != expect) {
    std::cerr << "trainable count " << trainable << " does not match the architecture spec " << expect << "\\n";
    return 1;
  }
  std::cout << "trainable " << trainable << "  bn buffers " << buffers << "  fc_in " << model.fc_in_features()
            << "\\n";

  if (!resume.empty()) {
    resnet::load_module<float>(resume, model);
    std::cout << "loaded " << resume << "\\n";
  }

  resnet::TrainConfig<float> config;
  config.epochs = epochs;
  config.batch_size = batch;
  config.lr = lr;
  config.momentum = momentum;
  config.weight_decay = weight_decay;
  config.checkpoint = checkpoint;
  config.seed = seed;
  config.adamw = adamw;
  resnet::train_mnist<float>(ctx, model, train_split, &test_split, config);
  return 0;
}
`},{group:`Train`,path:`tests/test_host.cpp`,code:`#include "resnet/algorithms.hpp"
#include "resnet/geometry.hpp"
#include "resnet/init.hpp"
#include "resnet/mnist.hpp"
#include "resnet/serializer.hpp"

#include <cmath>
#include <cstdint>
#include <fstream>
#include <iostream>
#include <string>
#include <vector>

namespace {

int g_failed = 0;

void check(bool cond, const char* expr, const char* file, int line) {
  if (!cond) {
    std::cerr << "FAIL " << file << ":" << line << "  " << expr << "\\n";
    ++g_failed;
  }
}

#define CHECK(cond) ::check(static_cast<bool>(cond), #cond, __FILE__, __LINE__)

bool near(double a, double b, double eps = 1e-5) { return std::fabs(a - b) <= eps; }

void write_be_u32(std::ostream& out, std::uint32_t v) {
  unsigned char b[4] = {static_cast<unsigned char>((v >> 24) & 0xffu),
                        static_cast<unsigned char>((v >> 16) & 0xffu),
                        static_cast<unsigned char>((v >> 8) & 0xffu),
                        static_cast<unsigned char>(v & 0xffu)};
  out.write(reinterpret_cast<char*>(b), 4);
}

void test_geometry() {
  const resnet::Spatial mnist = resnet::spatial_after(resnet::mnist_arch(), 28, 28);
  CHECK(mnist.height == 7);
  CHECK(mnist.width == 7);
  CHECK(mnist.channels == 64);

  const resnet::Spatial imagenet = resnet::spatial_after(resnet::resnet18_arch(), 224, 224);
  CHECK(imagenet.height == 7);
  CHECK(imagenet.width == 7);
  CHECK(imagenet.channels == 512);

  const resnet::Spatial tiny = resnet::spatial_after(resnet::resnet18_arch(), 28, 28);
  CHECK(tiny.height == 1);
  CHECK(tiny.width == 1);
  CHECK(tiny.channels == 512);

  CHECK(resnet::trainable_parameter_count(resnet::mnist_arch(), 1, 10) == 174970LL);
  CHECK(resnet::trainable_parameter_count(resnet::resnet18_arch(), 3, 1000) == 11689512LL);

  resnet::ArchSpec parsed{};
  CHECK(resnet::arch_by_name("mnist", parsed));
  CHECK(std::string(parsed.name) == "mnist");
  CHECK(resnet::arch_by_name("resnet18", parsed));
  CHECK(!resnet::arch_by_name("resnet50", parsed));
  CHECK(resnet::conv2d_out(28, 3, 1, 1) == 28);
  CHECK(resnet::conv2d_out(28, 3, 2, 1) == 14);
}

void test_init_and_elementwise() {
  CHECK(near(resnet::he_stddev(144), std::sqrt(2.0 / 144.0), 1e-12));
  const auto a = resnet::he_normal<float>(128, 144, 99);
  const auto b = resnet::he_normal<float>(128, 144, 99);
  const auto c = resnet::he_normal<float>(128, 144, 100);
  CHECK(a == b);
  CHECK(a != c);
  for (float v : a) CHECK(std::isfinite(v));

  float xs[3] = {-1.f, 0.f, 2.f};
  float ys[3] = {};
  resnet::relu(resnet::host_policy, xs, ys, 3);
  CHECK(ys[0] == 0.f && ys[1] == 0.f && ys[2] == 2.f);
  float gy[3] = {4.f, 5.f, 6.f};
  float gx[3] = {};
  resnet::relu_backward(resnet::host_policy, xs, gy, gx, 3);
  CHECK(gx[0] == 0.f && gx[1] == 0.f && gx[2] == 6.f);

  float lhs[2] = {1.f, 2.f};
  float rhs[2] = {3.f, 4.f};
  float sum[2] = {};
  resnet::add(resnet::host_policy, lhs, rhs, sum, 2);
  CHECK(sum[0] == 4.f && sum[1] == 6.f);
}

void test_sgd_and_adam() {
  float p = 1.f;
  float g = 0.5f;
  float v = 0.f;
  const float lr = 0.1f;
  const float mom = 0.9f;
  const float wd = 0.1f;
  const float g_hat = g + wd * p;
  const float v_hat = mom * v + g_hat;
  const float p_hat = p - lr * v_hat;
  resnet::sgd_momentum(resnet::host_policy, &p, &g, &v, 1, lr, mom, wd);
  CHECK(near(p, p_hat, 1e-6));
  CHECK(near(v, v_hat, 1e-6));

  float param = 1.f;
  float grad = 0.5f;
  float m = 0.f;
  float s = 0.f;
  const float alr = 0.01f;
  const float b1 = 0.9f;
  const float b2 = 0.999f;
  const float eps = 1e-8f;
  const float bc1 = 1.f - b1;
  const float bc2 = 1.f - b2;
  resnet::adamw(resnet::host_policy, &param, &grad, &m, &s, 1, alr, b1, b2, eps, 0.f, bc1, bc2);
  CHECK(near(m, 0.05f, 1e-6));
  CHECK(near(s, 0.00025f, 1e-7));
  CHECK(near(param, 0.99f, 1e-5));

  float param2 = 1.f;
  float m2 = 0.f;
  float s2 = 0.f;
  resnet::adamw(resnet::host_policy, &param2, &grad, &m2, &s2, 1, alr, b1, b2, eps, 0.1f, bc1, bc2);
  CHECK(near(param2, 0.989f, 1e-4));
}

void test_cross_entropy() {
  const float logits_one[2] = {0.f, 0.f};
  const int label_one[1] = {0};
  float grad_one[2] = {};
  const float loss_one =
      resnet::softmax_cross_entropy(resnet::host_policy, logits_one, label_one, grad_one, 1, 2);
  CHECK(near(loss_one, std::log(2.0), 1e-6));
  CHECK(near(grad_one[0], -0.5, 1e-6));
  CHECK(near(grad_one[1], 0.5, 1e-6));

  const float logits_two[4] = {0.f, 0.f, 0.f, 0.f};
  const int labels_two[2] = {0, 1};
  float grad_two[4] = {};
  const float loss_two =
      resnet::softmax_cross_entropy(resnet::host_policy, logits_two, labels_two, grad_two, 2, 2);
  CHECK(near(loss_two, std::log(2.0), 1e-6));
  CHECK(near(grad_two[0], -0.25, 1e-6));
  CHECK(near(grad_two[1], 0.25, 1e-6));
  CHECK(near(grad_two[2], 0.25, 1e-6));
  CHECK(near(grad_two[3], -0.25, 1e-6));

  const float rows[5] = {0.f, 5.f, 1.f, 3.f, -1.f};
  const int labels[2] = {1, 0};
  CHECK(resnet::argmax_row(rows, 3) == 1);
  CHECK(resnet::argmax_row(rows + 3, 2) == 0);
  CHECK(resnet::count_correct(resnet::host_policy, rows, labels, 1, 3) == 1);
}

void test_checkpoint() {
  const std::vector<float> values = {1.f, -2.5f, 0.f, 4.f};
  std::vector<resnet::TensorBlob> blobs;
  blobs.push_back(resnet::make_blob<float>("conv1.weight", {2, 2}, values));
  const std::vector<double> wide = {0.25, -8.0};
  blobs.push_back(resnet::make_blob<double>("fc.bias", {2}, wide));
  const std::string path = "/tmp/resnet_host_checkpoint.rsnt";
  resnet::save_checkpoint(path, blobs);
  const std::vector<resnet::TensorBlob> loaded = resnet::load_checkpoint(path);
  CHECK(loaded.size() == 2);
  CHECK(loaded[0].name == "conv1.weight");
  CHECK(loaded[0].dtype == resnet::DType::Float32);
  const std::vector<float> back = resnet::blob_values<float>(loaded[0]);
  CHECK(back.size() == values.size());
  for (std::size_t i = 0; i < values.size(); ++i) CHECK(back[i] == values[i]);
  const std::vector<double> back_d = resnet::blob_values<double>(loaded[1]);
  CHECK(back_d.size() == 2);
  CHECK(back_d[0] == 0.25);
  CHECK(back_d[1] == -8.0);

  bool threw = false;
  try {
    resnet::make_blob<float>("bad", {-1, 2}, {});
  } catch (const resnet::Error&) {
    threw = true;
  }
  CHECK(threw);

  threw = false;
  try {
    std::ofstream out(path, std::ios::binary);
    out << "NOTAFILE";
  } catch (...) {
  }
  try {
    resnet::load_checkpoint(path);
  } catch (const resnet::Error&) {
    threw = true;
  }
  CHECK(threw);
}

void test_mnist() {
  const std::string img = "/tmp/resnet_host_images.idx";
  const std::string lbl = "/tmp/resnet_host_labels.idx";
  {
    std::ofstream images(img, std::ios::binary);
    std::ofstream labels(lbl, std::ios::binary);
    write_be_u32(images, 2051);
    write_be_u32(images, 2);
    write_be_u32(images, 2);
    write_be_u32(images, 2);
    const unsigned char pixels[8] = {255, 0, 0, 0, 0, 255, 128, 0};
    images.write(reinterpret_cast<const char*>(pixels), 8);
    write_be_u32(labels, 2049);
    write_be_u32(labels, 2);
    const unsigned char ys[2] = {3, 7};
    labels.write(reinterpret_cast<const char*>(ys), 2);
  }
  const resnet::MnistSplit split = resnet::load_mnist_split(img, lbl);
  CHECK(split.size() == 2);
  CHECK(split.rows == 2 && split.cols == 2);
  CHECK(split.image(1)[1] == 255);
  std::vector<int> order = {1, 0};
  resnet::HostBatch batch;
  resnet::fill_batch(split, order, 0, 2, batch, 0.f, 1.f);
  CHECK(batch.labels[0] == 7);
  CHECK(batch.labels[1] == 3);
  CHECK(near(batch.images[1], 1.f, 1e-6));
  resnet::fill_batch(split, order, 0, 1, batch);
  const float expected = (1.f - resnet::kMnistMean) / resnet::kMnistStd;
  CHECK(near(batch.images[1], expected, 1e-5));

  const resnet::MnistSplit synth = resnet::make_synthetic_digits(40, 7);
  CHECK(synth.size() == 40);
  CHECK(synth.rows == 28 && synth.cols == 28);
  bool any = false;
  bool in_range = true;
  for (int i = 0; i < synth.size(); ++i) {
    if (synth.labels[static_cast<std::size_t>(i)] > 9) in_range = false;
    for (int p = 0; p < 28 * 28; ++p) {
      if (synth.image(i)[p] == 255) any = true;
    }
  }
  CHECK(any);
  CHECK(in_range);
  CHECK(synth.images != resnet::make_synthetic_digits(40, 8).images);
}

}  // namespace

int main() {
  test_geometry();
  test_init_and_elementwise();
  test_sgd_and_adam();
  test_cross_entropy();
  test_checkpoint();
  test_mnist();
  if (g_failed != 0) {
    std::cerr << g_failed << " checks failed\\n";
    return 1;
  }
  std::cout << "host tests passed\\n";
  return 0;
}
`},{group:`Train`,path:`scripts/download_mnist.sh`,code:`#!/bin/sh
# Uncompressed IDX files, the layout mnist_train --data expects.
set -eu
dest=\${1:-data/mnist}
mkdir -p "$dest"
base=https://ossci-datasets.s3.amazonaws.com/mnist
for name in train-images-idx3-ubyte train-labels-idx1-ubyte t10k-images-idx3-ubyte t10k-labels-idx1-ubyte; do
  if [ ! -f "$dest/$name" ]; then
    curl -fsSL "$base/$name.gz" -o "$dest/$name.gz"
    gunzip -f "$dest/$name.gz"
  fi
done
echo "MNIST IDX files are in $dest"
`},{group:`Train`,path:`include/resnet/all.hpp`,code:`#pragma once

// Umbrella header for the CUDA training stack. Include this from a .cu file.
#include "resnet/algorithms.hpp"
#include "resnet/checkpoint.hpp"
#include "resnet/context.hpp"
#include "resnet/conv2d.hpp"
#include "resnet/error.hpp"
#include "resnet/geometry.hpp"
#include "resnet/init.hpp"
#include "resnet/loss.hpp"
#include "resnet/mnist.hpp"
#include "resnet/optimizer.hpp"
#include "resnet/resnet.hpp"
#include "resnet/serializer.hpp"
#include "resnet/trainer.hpp"
`}],_=[{name:`input`,detail:`1 × 28 × 28`},{name:`conv1 + bn + relu`,detail:`3×3, 16, stride 1 → 28×28`},{name:`layer1`,detail:`2 basic blocks, 16, stride 1 → 28×28`},{name:`layer2`,detail:`2 basic blocks, 32, stride 2 → 14×14`},{name:`layer3`,detail:`2 basic blocks, 64, stride 2 → 7×7`},{name:`global average pool`,detail:`64`},{name:`fc`,detail:`10 logits`}];function v(){let[e,t]=(0,s.useState)(`network`),[n,r]=(0,s.useState)(``),[c,l]=(0,s.useState)(`include/resnet/algorithms.hpp`),u=(0,s.useMemo)(()=>{let e=n.trim().toLowerCase();return g.filter(t=>!e||t.path.toLowerCase().includes(e))},[n]),d=g.find(e=>e.path===c)??g[0],f=(0,s.useMemo)(()=>{let e=[];for(let t of u)e.includes(t.group)||e.push(t.group);return e},[u]);return(0,p.jsxs)(`main`,{className:`min-h-dvh bg-bg text-fg`,children:[(0,p.jsx)(`header`,{className:`border-b border-border`,children:(0,p.jsxs)(`div`,{className:`mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 md:flex-row md:items-end md:justify-between`,children:[(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`p`,{className:`font-mono text-xs tracking-widest text-accent uppercase`,children:`C++ / CUDA`}),(0,p.jsx)(`h1`,{className:`mt-1 text-3xl font-semibold tracking-tight`,children:`ResNet CUDA`}),(0,p.jsx)(`p`,{className:`mt-2 max-w-xl text-muted`,children:`Convolutional residual blocks for MNIST. cuDNN owns conv, batch-norm, and pooling. cuBLAS owns the classifier. Thrust runs the same update math the host tests lock.`})]}),(0,p.jsxs)(`a`,{href:`/resnet-cuda.zip`,className:`inline-flex h-11 items-center justify-center gap-2 rounded-md bg-accent px-4 font-medium text-accent-fg`,children:[(0,p.jsx)(i,{className:`size-4`,"aria-hidden":!0}),`Download source`]})]})}),(0,p.jsxs)(`div`,{className:`mx-auto grid max-w-6xl gap-0 md:grid-cols-[16rem_minmax(0,1fr)]`,children:[(0,p.jsxs)(`aside`,{className:`border-border md:border-r`,children:[(0,p.jsxs)(`div`,{className:`px-4 py-4`,children:[(0,p.jsx)(`label`,{className:`mb-2 block text-xs font-medium text-muted`,htmlFor:`file-filter`,children:`Files`}),(0,p.jsx)(`input`,{id:`file-filter`,value:n,onChange:e=>r(e.target.value),placeholder:`Filter`,className:`h-11 w-full rounded-md border border-border bg-surface px-3 text-sm text-fg placeholder:text-muted`})]}),(0,p.jsx)(`nav`,{className:`hidden overflow-auto px-2 pb-6 md:block`,"aria-label":`Library files`,children:f.map(n=>(0,p.jsxs)(`div`,{className:`mb-3`,children:[(0,p.jsx)(`p`,{className:`px-2 py-1 font-mono text-xs text-muted`,children:n}),u.filter(e=>e.group===n).map(n=>(0,p.jsx)(`button`,{type:`button`,title:n.path,onClick:()=>{l(n.path),t(`source`)},className:`block w-full truncate rounded-md px-2 py-2 text-left font-mono text-xs ${n.path===d.path&&e===`source`?`bg-raised text-accent`:`text-fg hover:bg-surface`}`,children:n.path.split(`/`).slice(-1)[0]},n.path))]},n))})]}),(0,p.jsxs)(`section`,{className:`min-w-0 px-4 py-4`,children:[(0,p.jsxs)(`div`,{className:`mb-4 flex gap-2`,role:`tablist`,"aria-label":`Library sections`,children:[(0,p.jsx)(y,{id:`network`,current:e,onSelect:t,icon:(0,p.jsx)(a,{className:`size-4`,"aria-hidden":!0}),children:`Network`}),(0,p.jsx)(y,{id:`source`,current:e,onSelect:t,children:`Source`}),(0,p.jsx)(y,{id:`train`,current:e,onSelect:t,icon:(0,p.jsx)(o,{className:`size-4`,"aria-hidden":!0}),children:`Train`})]}),e===`network`?(0,p.jsx)(b,{}):null,e===`source`?(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`label`,{className:`mb-2 block text-xs text-muted md:hidden`,htmlFor:`file-pick`,children:`Open file`}),(0,p.jsx)(`select`,{id:`file-pick`,className:`mb-3 h-11 w-full rounded-md border border-border bg-surface px-3 font-mono text-sm md:hidden`,value:d.path,onChange:e=>l(e.target.value),children:(u.some(e=>e.path===d.path)?u:[d,...u]).map(e=>(0,p.jsx)(`option`,{value:e.path,children:e.path},e.path))}),(0,p.jsxs)(`div`,{className:`mb-3 flex items-baseline justify-between gap-3`,children:[(0,p.jsx)(`h2`,{className:`truncate font-mono text-sm text-accent`,children:d.path}),(0,p.jsxs)(`p`,{className:`shrink-0 text-xs text-muted`,children:[d.code.split(`
`).length,` lines`]})]}),(0,p.jsx)(h,{code:d.code})]}):null,e===`train`?(0,p.jsx)(S,{}):null]})]})]})}function y({id:e,current:t,onSelect:n,children:r,icon:i}){let a=t===e;return(0,p.jsxs)(`button`,{type:`button`,role:`tab`,"aria-selected":a,onClick:()=>n(e),className:`inline-flex h-11 items-center gap-2 rounded-md px-3 text-sm font-medium ${a?`bg-accent text-accent-fg`:`bg-surface text-fg`}`,children:[i,r]})}function b(){return(0,p.jsxs)(`div`,{className:`space-y-6`,children:[(0,p.jsx)(`p`,{className:`max-w-2xl text-muted`,children:`The default network is the CIFAR-style ResNet from He et al., narrowed for 28×28 grayscale. Convolutions have no bias. Batch-norm carries the affine scale and shift. A stage's first block uses the stage stride; the second is stride 1.`}),(0,p.jsx)(`ol`,{className:`space-y-2`,children:_.map((e,t)=>(0,p.jsxs)(`li`,{className:`grid grid-cols-[2rem_minmax(0,1fr)] items-center gap-3`,children:[(0,p.jsx)(`span`,{className:`font-mono text-xs text-muted`,children:t}),(0,p.jsxs)(`div`,{className:`rounded-md border border-border bg-surface px-3 py-3`,children:[(0,p.jsx)(`p`,{className:`font-medium`,children:e.name}),(0,p.jsx)(`p`,{className:`font-mono text-sm text-muted`,children:e.detail})]})]},e.name))}),(0,p.jsxs)(`div`,{className:`rounded-md border border-border bg-surface p-4`,children:[(0,p.jsx)(`h2`,{className:`font-medium`,children:`Basic block`}),(0,p.jsx)(`p`,{className:`mt-1 font-mono text-sm text-accent`,children:`y = ReLU(F(x) + S(x))`}),(0,p.jsxs)(`div`,{className:`mt-4 grid gap-2`,children:[(0,p.jsx)(`div`,{className:`flex flex-wrap gap-2`,children:[`conv 3×3`,`bn`,`relu`,`conv 3×3`,`bn`].map(e=>(0,p.jsx)(`span`,{className:`rounded-md bg-raised px-3 py-2 font-mono text-sm`,children:e},e))}),(0,p.jsx)(`p`,{className:`text-sm text-muted`,children:`Shortcut S is identity, or a 1×1 convolution plus batch-norm when channels or stride change.`}),(0,p.jsx)(`div`,{className:`flex flex-wrap gap-2`,children:[`add`,`relu`].map(e=>(0,p.jsx)(`span`,{className:`rounded-md bg-accent px-3 py-2 font-mono text-sm text-accent-fg`,children:e},e))})]}),(0,p.jsxs)(`p`,{className:`mt-4 text-sm text-muted`,children:[`Backward splits the gradient at the sum. The two branches are differentiated separately, then their input gradients are added with the Thrust `,(0,p.jsx)(`span`,{className:`font-mono text-fg`,children:`add`}),` algorithm.`]})]}),(0,p.jsxs)(`dl`,{className:`grid gap-3 sm:grid-cols-3`,children:[(0,p.jsx)(x,{label:`MNIST trainable`,value:`174,970`,note:`1 channel, 10 classes`}),(0,p.jsx)(x,{label:`ResNet-18 trainable`,value:`11,689,512`,note:`3×1000, torchvision count`}),(0,p.jsx)(x,{label:`Checkpoint`,value:`RESNET01`,note:`little-endian, named tensors`})]})]})}function x({label:e,value:t,note:n}){return(0,p.jsxs)(`div`,{className:`rounded-md border border-border bg-surface p-4`,children:[(0,p.jsx)(`dt`,{className:`text-xs text-muted`,children:e}),(0,p.jsx)(`dd`,{className:`mt-1 font-mono text-lg text-accent`,children:t}),(0,p.jsx)(`dd`,{className:`text-sm text-muted`,children:n})]})}function S(){return(0,p.jsxs)(`div`,{className:`space-y-6`,children:[(0,p.jsxs)(`p`,{className:`max-w-2xl text-muted`,children:[`Training does not run in this page. Build `,(0,p.jsx)(`span`,{className:`font-mono text-fg`,children:`mnist_train`}),` on a machine with the CUDA toolkit and cuDNN, then point it at IDX files or the synthetic digits.`]}),(0,p.jsx)(`pre`,{className:`overflow-auto rounded-md border border-border bg-surface p-4 font-mono text-sm leading-6 text-fg`,children:`cmake -S . -B build -DCUDNN_ROOT_DIR=/usr
cmake --build build -j
./scripts/download_mnist.sh data/mnist
./build/mnist_train --data data/mnist --epochs 8 --batch 128 --lr 0.05 --checkpoint mnist.rsnt`}),(0,p.jsxs)(`ul`,{className:`grid gap-2 text-sm text-muted`,children:[(0,p.jsxs)(`li`,{children:[(0,p.jsx)(`span`,{className:`font-mono text-fg`,children:`--arch resnet18`}),` uses the 7×7 stem and a max-pool. On 28×28 it ends at 1×1.`]}),(0,p.jsxs)(`li`,{children:[(0,p.jsx)(`span`,{className:`font-mono text-fg`,children:`--adamw`}),` swaps in decoupled weight decay. The default is momentum SGD, which is what the ResNet paper trains with.`]}),(0,p.jsx)(`li`,{children:`Learning rate drops by 10× halfway through and again at three quarters, when there are at least four epochs.`}),(0,p.jsx)(`li`,{children:`The checkpoint stores weights and batch-norm running stats by name. Optimizer velocity is not saved.`})]}),(0,p.jsx)(C,{})]})}function C(){let[e,t]=(0,s.useState)(`0`),[n,r]=(0,s.useState)(`0`),[i,a]=(0,s.useState)(0),[o,c]=(0,s.useState)(`1`),[l,u]=(0,s.useState)(`0.5`),[d,f]=(0,s.useState)(`0`),m=Number(e),h=Number(n),g=Number(o),_=Number(l),v=Number(d),y=T(m,h,i),b=E(g,_,v,.1,.9,.1);return(0,p.jsxs)(`div`,{className:`rounded-md border border-border bg-surface p-4`,children:[(0,p.jsx)(`h2`,{className:`font-medium`,children:`Host reference`}),(0,p.jsxs)(`p`,{className:`mt-1 text-sm text-muted`,children:[`Same formulas as `,(0,p.jsx)(`span`,{className:`font-mono text-fg`,children:`softmax_cross_entropy_row`}),` and`,` `,(0,p.jsx)(`span`,{className:`font-mono text-fg`,children:`sgd_momentum_at`}),`. The unit test locks the defaults: loss log(2), gradient −0.5 / 0.5, and the SGD step landing on 0.94.`]}),(0,p.jsxs)(`div`,{className:`mt-4 grid gap-4 md:grid-cols-2`,children:[(0,p.jsxs)(`fieldset`,{className:`space-y-3`,children:[(0,p.jsx)(`legend`,{className:`text-sm font-medium`,children:`Two-class cross-entropy`}),(0,p.jsx)(w,{id:`logit-a`,label:`logit 0`,value:e,onChange:t}),(0,p.jsx)(w,{id:`logit-b`,label:`logit 1`,value:n,onChange:r}),(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`p`,{className:`mb-1 text-xs text-muted`,children:`label`}),(0,p.jsx)(`div`,{className:`flex gap-2`,children:[0,1].map(e=>(0,p.jsx)(`button`,{type:`button`,onClick:()=>a(e),className:`h-11 flex-1 rounded-md font-mono ${i===e?`bg-accent text-accent-fg`:`bg-raised text-fg`}`,children:e},e))})]}),(0,p.jsxs)(`p`,{className:`font-mono text-sm`,children:[`loss `,D(y.loss),(0,p.jsx)(`br`,{}),`grad `,D(y.grad[0]),` , `,D(y.grad[1])]})]}),(0,p.jsxs)(`fieldset`,{className:`space-y-3`,children:[(0,p.jsx)(`legend`,{className:`text-sm font-medium`,children:`SGD, lr 0.1, momentum 0.9, decay 0.1`}),(0,p.jsx)(w,{id:`param`,label:`parameter`,value:o,onChange:c}),(0,p.jsx)(w,{id:`grad`,label:`gradient`,value:l,onChange:u}),(0,p.jsx)(w,{id:`velocity`,label:`velocity`,value:d,onChange:f}),(0,p.jsxs)(`p`,{className:`font-mono text-sm`,children:[`parameter `,D(b.param),(0,p.jsx)(`br`,{}),`velocity `,D(b.velocity)]})]})]})]})}function w({id:e,label:t,value:n,onChange:r}){return(0,p.jsxs)(`label`,{className:`block text-xs text-muted`,htmlFor:e,children:[t,(0,p.jsx)(`input`,{id:e,inputMode:`decimal`,value:n,onChange:e=>r(e.target.value),className:`mt-1 h-11 w-full rounded-md border border-border bg-bg px-3 font-mono text-sm text-fg`})]})}function T(e,t,n){if(!Number.isFinite(e)||!Number.isFinite(t))return{loss:NaN,grad:[NaN,NaN]};let r=Math.max(e,t),i=Math.exp(e-r),a=Math.exp(t-r),o=i+a,s=[e,t];return{loss:r+Math.log(o)-s[n],grad:[i/o-+(n===0),a/o-+(n===1)]}}function E(e,t,n,r,i,a){if(![e,t,n].every(Number.isFinite))return{param:NaN,velocity:NaN};let o=t+a*e,s=i*n+o;return{param:e-r*s,velocity:s}}function D(e){return Number.isFinite(e)?e.toFixed(6).replace(/0+$/,``).replace(/\.$/,``):`—`}export{v as component};