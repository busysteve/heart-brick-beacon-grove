import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Download, n as Sigma, r as Layers } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DZljMLn0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KEYWORDS = /* @__PURE__ */ new Set([
	"alignas",
	"alignof",
	"and",
	"and_eq",
	"asm",
	"auto",
	"bitand",
	"bitor",
	"bool",
	"break",
	"case",
	"catch",
	"char",
	"char8_t",
	"char16_t",
	"char32_t",
	"class",
	"compl",
	"concept",
	"const",
	"consteval",
	"constexpr",
	"constinit",
	"const_cast",
	"continue",
	"co_await",
	"co_return",
	"co_yield",
	"decltype",
	"default",
	"delete",
	"do",
	"double",
	"dynamic_cast",
	"else",
	"enum",
	"explicit",
	"export",
	"extern",
	"false",
	"float",
	"for",
	"friend",
	"goto",
	"if",
	"inline",
	"int",
	"long",
	"mutable",
	"namespace",
	"new",
	"noexcept",
	"not",
	"not_eq",
	"nullptr",
	"operator",
	"or",
	"or_eq",
	"private",
	"protected",
	"public",
	"register",
	"reinterpret_cast",
	"requires",
	"return",
	"short",
	"signed",
	"sizeof",
	"static",
	"static_assert",
	"static_cast",
	"struct",
	"switch",
	"template",
	"this",
	"thread_local",
	"throw",
	"true",
	"try",
	"typedef",
	"typeid",
	"typename",
	"union",
	"unsigned",
	"using",
	"virtual",
	"void",
	"volatile",
	"wchar_t",
	"while",
	"override",
	"final"
]);
function isIdentStart(ch) {
	return /[A-Za-z_]/.test(ch);
}
function isDigit(ch) {
	return ch >= "0" && ch <= "9";
}
function tokenize(source) {
	const out = [];
	const n = source.length;
	let i = 0;
	while (i < n) {
		const ch = source[i];
		if (ch === "/" && source[i + 1] === "/") {
			let j = i + 2;
			while (j < n && source[j] !== "\n") j += 1;
			out.push({
				text: source.slice(i, j),
				kind: "com"
			});
			i = j;
			continue;
		}
		if (ch === "/" && source[i + 1] === "*") {
			const close = source.indexOf("*/", i + 2);
			const j = close < 0 ? n : close + 2;
			out.push({
				text: source.slice(i, j),
				kind: "com"
			});
			i = j;
			continue;
		}
		if (ch === "\"" || ch === "'") {
			let j = i + 1;
			while (j < n && source[j] !== "\n") {
				if (source[j] === "\\") {
					j += 2;
					continue;
				}
				if (source[j] === ch) {
					j += 1;
					break;
				}
				j += 1;
			}
			out.push({
				text: source.slice(i, j),
				kind: "str"
			});
			i = j;
			continue;
		}
		if (ch === "#") {
			let j = i + 1;
			while (j < n && source[j] !== "\n") if (source[j] === "\\" && source[j + 1] === "\n") j += 2;
			else j += 1;
			out.push({
				text: source.slice(i, j),
				kind: "pre"
			});
			i = j;
			continue;
		}
		if (isDigit(ch) && (i === 0 || !isIdentStart(source[i - 1]))) {
			let j = i + 1;
			while (j < n && /[0-9a-fA-FxX.uUlL']/.test(source[j])) j += 1;
			out.push({
				text: source.slice(i, j),
				kind: "num"
			});
			i = j;
			continue;
		}
		if (isIdentStart(ch)) {
			let j = i + 1;
			while (j < n && /[A-Za-z0-9_]/.test(source[j])) j += 1;
			const word = source.slice(i, j);
			out.push({
				text: word,
				kind: KEYWORDS.has(word) ? "key" : "plain"
			});
			i = j;
			continue;
		}
		out.push({
			text: ch,
			kind: "plain"
		});
		i += 1;
	}
	return out;
}
function highlightLines(source) {
	const lines = [[]];
	for (const token of tokenize(source)) token.text.split("\n").forEach((part, index) => {
		if (index > 0) lines.push([]);
		if (part.length > 0) lines[lines.length - 1].push({
			text: part,
			kind: token.kind
		});
	});
	if (lines.length > 1 && lines[lines.length - 1].length === 0 && source.endsWith("\n")) lines.pop();
	return lines;
}
var kindClass = {
	plain: "",
	key: "token-key",
	str: "token-str",
	com: "token-com",
	num: "token-num",
	pre: "token-pre"
};
function SourceView({ code }) {
	const lines = (0, import_react.useMemo)(() => highlightLines(code), [code]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-auto rounded-md border border-border bg-bg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
			className: "w-full border-collapse font-mono text-sm leading-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: lines.map((tokens, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "align-top",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: "w-12 select-none border-r border-border px-3 text-right text-muted",
					children: index + 1
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: "px-4 whitespace-pre",
					children: tokens.length === 0 ? " " : tokens.map((token, tokenIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: kindClass[token.kind],
						children: token.text
					}, tokenIndex))
				})]
			}, index)) })
		})
	});
}
var libraryFiles = [
	{
		group: "Overview",
		path: "README.md",
		code: "# ResNet for MNIST, on CUDA\n\nA small C++ class set that trains a residual network with the libraries that\nactually own each job:\n\n| Piece | Where it runs |\n| --- | --- |\n| Convolution, batch-norm, max-pool, global average pool | cuDNN |\n| Classifier GEMM | cuBLAS (column-major view of row-major `N x K` storage) |\n| ReLU, residual add, bias add, SGD, AdamW | Thrust execution-policy algorithms |\n| Softmax cross-entropy | One `__host__ __device__` row function. Host policy is a loop; the device path is the same function in a kernel, then `thrust::reduce` |\n\nThe scalar updates live in `include/resnet/algorithms.hpp`. `sgd_momentum_at`,\n`adamw_at`, `relu_at`, and `softmax_cross_entropy_row` are the only copies of\nthat math. `host_policy` runs them on the CPU (this is what the host tests\nlock). A Thrust device policy runs the same functions on the GPU.\n\n## Layout\n\n```\ninclude/resnet/algorithms.hpp    execution-policy math\ninclude/resnet/conv2d.hpp        cuDNN conv + bias\ninclude/resnet/batch_norm.hpp    spatial batch-norm, train and eval\ninclude/resnet/activation.hpp    Thrust ReLU\ninclude/resnet/pooling.hpp       max pool and global average pool\ninclude/resnet/linear.hpp        cuBLAS GEMM\ninclude/resnet/residual.hpp      BasicBlock: y = ReLU(F(x) + S(x))\ninclude/resnet/resnet.hpp        mnist and resnet18 builders\ninclude/resnet/loss.hpp          device cross-entropy and accuracy\ninclude/resnet/optimizer.hpp     momentum SGD and AdamW\ninclude/resnet/checkpoint.hpp    named-tensor checkpoint\ninclude/resnet/serializer.hpp    little-endian RESNET01 container\ninclude/resnet/mnist.hpp         IDX loader and synthetic digits\ninclude/resnet/trainer.hpp       shuffle, step decay, eval, save\nexamples/mnist_train.cu\n```\n\n`ArchSpec` in `geometry.hpp` is the single description of both networks.\n`trainable_parameter_count` is checked by the host tests:\n\n- MNIST stem, 1 channel, 10 classes: **174,970** trainable values\n- ResNet-18, 3 channels, 1000 classes: **11,689,512** (torchvision `resnet18`)\n\nConvolutions have no bias (batch-norm follows). The classifier has a bias.\nDownsample is a 1x1 conv plus batch-norm when the stride or width changes.\nThe MNIST network keeps 28x28 through the stem (no max-pool) and finishes at\n7x7x64 before global average pooling. ResNet-18 on 224x224 finishes at 7x7x512.\nOn 28x28 it still runs and finishes at 1x1x512; prefer `--arch mnist` there.\n\n## Build\n\nCUDA toolkit and cuDNN 8 or 9 (legacy conv / batch-norm / pooling API, still\nshipped in `libcudnn`).\n\n```\ncmake -S . -B build -DCUDNN_ROOT_DIR=/usr\ncmake --build build -j\n./scripts/download_mnist.sh data/mnist\n./build/mnist_train --data data/mnist --epochs 8 --batch 128 --lr 0.05\n```\n\n`--arch resnet18` builds the ImageNet stem with 1 input channel so it can read\nMNIST. `--adamw` swaps the optimizer. `--checkpoint model.rsnt` writes the best\ntest-accuracy weights. `--resume model.rsnt` loads them (optimizer moments start\nover). `--synthetic 4096` trains on geometric digits when you have no IDX files.\n\nA 5–8 epoch run of the MNIST architecture at batch 128 and lr 0.05 commonly\nclears 99% test accuracy. That is a property of the task, not a guarantee of\nevery seed.\n\nHost-only tests (serialization, IDX, the shared math, the architecture counts)\ndo not need a GPU:\n\n```\nmake test\n```\n\n## Checkpoint\n\nMagic `RESNET01`, version 1, explicit little-endian. Every collected tensor is\nstored by name, including batch-norm running mean and variance. Load is strict:\nmissing names, unexpected names, rank, shape, and dtype all fail. Names follow\nthe torchvision pattern (`layer2.0.conv1.weight`, `layer2.0.downsample.0.weight`,\n`bn1.running_var`, `fc.bias`).\n\n## What is not in here\n\nNo data-parallel training, no mixed precision, no cuDNN graph fusion. Workspace\nand algorithm choice prefer the first supported implicit-GEMM style kernel so\nthe shapes in this repo run, not so they win a benchmark. One `CudnnContext`\nper thread; it must outlive the model.\n"
	},
	{
		group: "Overview",
		path: "CMakeLists.txt",
		code: "cmake_minimum_required(VERSION 3.18)\nproject(resnet_cuda LANGUAGES CXX CUDA)\n\nset(CMAKE_CXX_STANDARD 17)\nset(CMAKE_CXX_STANDARD_REQUIRED ON)\nset(CMAKE_CUDA_STANDARD 17)\nset(CMAKE_CUDA_STANDARD_REQUIRED ON)\n\nif(NOT DEFINED CMAKE_CUDA_ARCHITECTURES)\n  set(CMAKE_CUDA_ARCHITECTURES 70 75 80 86 89 90)\nendif()\n\nfind_package(CUDAToolkit REQUIRED)\n\nfind_path(CUDNN_INCLUDE_DIR cudnn.h\n  HINTS ${CUDNN_ROOT_DIR} $ENV{CUDNN_ROOT} ${CUDAToolkit_INCLUDE_DIRS}\n  PATH_SUFFIXES include)\nfind_library(CUDNN_LIBRARY\n  NAMES cudnn\n  HINTS ${CUDNN_ROOT_DIR} $ENV{CUDNN_ROOT} ${CUDAToolkit_LIBRARY_ROOT}\n  PATH_SUFFIXES lib lib64 lib/x64)\n\nif(NOT CUDNN_INCLUDE_DIR OR NOT CUDNN_LIBRARY)\n  message(FATAL_ERROR \"cuDNN not found. Set CUDNN_ROOT_DIR to the cuDNN prefix.\")\nendif()\n\nadd_library(resnet STATIC\n  src/context.cu\n  src/tensor.cu\n  src/conv2d.cu\n  src/batch_norm.cu\n  src/activation.cu\n  src/pooling.cu\n  src/linear.cu\n  src/residual.cu\n  src/resnet.cu\n  src/loss.cu\n  src/optimizer.cu\n  src/checkpoint.cu\n  src/trainer.cu\n  src/serializer.cpp\n  src/mnist.cpp\n)\n\ntarget_include_directories(resnet PUBLIC\n  ${CMAKE_CURRENT_SOURCE_DIR}/include\n  ${CUDNN_INCLUDE_DIR}\n)\ntarget_link_libraries(resnet PUBLIC CUDA::cudart CUDA::cublas ${CUDNN_LIBRARY})\ntarget_compile_features(resnet PUBLIC cxx_std_17)\n\nadd_executable(mnist_train examples/mnist_train.cu)\ntarget_link_libraries(mnist_train PRIVATE resnet)\n"
	},
	{
		group: "Overview",
		path: "Makefile",
		code: "# Host tests only. The CUDA library is built with CMake — see README.md.\nCXX ?= g++\nCXXFLAGS ?= -std=c++17 -Wall -Wextra -Werror -I include\n\n.PHONY: test\ntest:\n	mkdir -p build\n	$(CXX) $(CXXFLAGS) tests/test_host.cpp src/serializer.cpp src/mnist.cpp -o build/test_host\n	./build/test_host\n"
	},
	{
		group: "Spec",
		path: "include/resnet/algorithms.hpp",
		code: "#pragma once\n\n// Execution-policy algorithms. The scalar step is shared by the host policy\n// (unit-tested, no GPU) and the Thrust device policy (training). One definition\n// of the math, two loops — the same shape as the standard <algorithm> header.\n\n#include <cmath>\n#include <cstddef>\n#include <cstdint>\n\n#if defined(__CUDACC__)\n#include <thrust/execution_policy.h>\n#include <thrust/fill.h>\n#include <thrust/for_each.h>\n#include <thrust/iterator/counting_iterator.h>\n#include <thrust/reduce.h>\n#include <thrust/transform.h>\n#endif\n\nnamespace resnet {\n\n#if defined(__CUDACC__)\n#define RESNET_HD __host__ __device__\n#else\n#define RESNET_HD\n#endif\n\nstruct host_policy_t {};\ninline constexpr host_policy_t host_policy{};\n\nRESNET_HD inline float hd_sqrt(float x) { return sqrtf(x); }\nRESNET_HD inline double hd_sqrt(double x) { return sqrt(x); }\nRESNET_HD inline float hd_exp(float x) { return expf(x); }\nRESNET_HD inline double hd_exp(double x) { return exp(x); }\nRESNET_HD inline float hd_log(float x) { return logf(x); }\nRESNET_HD inline double hd_log(double x) { return log(x); }\n\ntemplate <typename T>\nRESNET_HD void sgd_momentum_at(T& param, T grad, T& velocity, T lr, T momentum, T weight_decay) {\n  const T g = grad + weight_decay * param;\n  velocity = momentum * velocity + g;\n  param -= lr * velocity;\n}\n\n// Decoupled weight decay (AdamW). bias_correction_* is (1 - beta^t), computed once per step.\ntemplate <typename T>\nRESNET_HD void adamw_at(T& param, T grad, T& first_moment, T& second_moment, T lr, T beta1, T beta2,\n                        T eps, T weight_decay, T bias_correction_1, T bias_correction_2) {\n  param -= lr * weight_decay * param;\n  first_moment = beta1 * first_moment + (T(1) - beta1) * grad;\n  second_moment = beta2 * second_moment + (T(1) - beta2) * grad * grad;\n  const T mhat = first_moment / bias_correction_1;\n  const T vhat = second_moment / bias_correction_2;\n  param -= lr * mhat / (hd_sqrt(vhat) + eps);\n}\n\ntemplate <typename T>\nRESNET_HD T add_at(T a, T b) {\n  return a + b;\n}\n\ntemplate <typename T>\nRESNET_HD T relu_at(T x) {\n  return x > T(0) ? x : T(0);\n}\n\ntemplate <typename T>\nRESNET_HD T relu_backward_at(T x, T grad) {\n  return x > T(0) ? grad : T(0);\n}\n\n// Stable log-softmax cross-entropy for one row.\n// inv_n is 1/N so the written gradient is the mean over the batch.\n// loss is the un-normalized per-example NLL; the caller averages it.\ntemplate <typename T>\nRESNET_HD void softmax_cross_entropy_row(const T* logits, int label, int classes, T inv_n, T& loss,\n                                         T* grad_row) {\n  T max_logit = logits[0];\n  for (int c = 1; c < classes; ++c) {\n    if (logits[c] > max_logit) max_logit = logits[c];\n  }\n  T sum = 0;\n  for (int c = 0; c < classes; ++c) sum += hd_exp(logits[c] - max_logit);\n  loss = max_logit + hd_log(sum) - logits[label];\n  if (grad_row != nullptr) {\n    for (int c = 0; c < classes; ++c) {\n      const T p = hd_exp(logits[c] - max_logit) / sum;\n      const T target = (c == label) ? T(1) : T(0);\n      grad_row[c] = (p - target) * inv_n;\n    }\n  }\n}\n\ntemplate <typename T>\nRESNET_HD int argmax_row(const T* row, int classes) {\n  int best_index = 0;\n  T best = row[0];\n  for (int c = 1; c < classes; ++c) {\n    if (row[c] > best) {\n      best = row[c];\n      best_index = c;\n    }\n  }\n  return best_index;\n}\n\ntemplate <typename T>\nvoid sgd_momentum(host_policy_t, T* params, const T* grads, T* velocity, std::size_t n, T lr,\n                  T momentum, T weight_decay) {\n  for (std::size_t i = 0; i < n; ++i) {\n    sgd_momentum_at(params[i], grads[i], velocity[i], lr, momentum, weight_decay);\n  }\n}\n\ntemplate <typename T>\nvoid adamw(host_policy_t, T* params, const T* grads, T* first_moment, T* second_moment, std::size_t n,\n           T lr, T beta1, T beta2, T eps, T weight_decay, T bias_correction_1, T bias_correction_2) {\n  for (std::size_t i = 0; i < n; ++i) {\n    adamw_at(params[i], grads[i], first_moment[i], second_moment[i], lr, beta1, beta2, eps,\n             weight_decay, bias_correction_1, bias_correction_2);\n  }\n}\n\ntemplate <typename T>\nvoid add(host_policy_t, const T* a, const T* b, T* out, std::size_t n) {\n  for (std::size_t i = 0; i < n; ++i) out[i] = add_at(a[i], b[i]);\n}\n\ntemplate <typename T>\nvoid relu(host_policy_t, const T* in, T* out, std::size_t n) {\n  for (std::size_t i = 0; i < n; ++i) out[i] = relu_at(in[i]);\n}\n\ntemplate <typename T>\nvoid relu_backward(host_policy_t, const T* input, const T* grad_out, T* grad_in, std::size_t n) {\n  for (std::size_t i = 0; i < n; ++i) grad_in[i] = relu_backward_at(input[i], grad_out[i]);\n}\n\ntemplate <typename T>\nvoid bias_add(host_policy_t, T* data, const T* bias, int batch, int width) {\n  for (int n = 0; n < batch; ++n) {\n    for (int w = 0; w < width; ++w) data[static_cast<std::size_t>(n) * width + w] += bias[w];\n  }\n}\n\ntemplate <typename T>\nvoid fill(host_policy_t, T* data, std::size_t n, T value) {\n  for (std::size_t i = 0; i < n; ++i) data[i] = value;\n}\n\n// Mean softmax cross-entropy. When grad != nullptr it is filled with dL/dlogits\n// of that mean (already divided by batch).\ntemplate <typename T>\nT softmax_cross_entropy(host_policy_t, const T* logits, const int* labels, T* grad, int batch,\n                        int classes) {\n  T sum = 0;\n  const T inv_n = T(1) / static_cast<T>(batch);\n  for (int n = 0; n < batch; ++n) {\n    T loss = 0;\n    T* grad_row = grad == nullptr ? nullptr : grad + static_cast<std::size_t>(n) * classes;\n    softmax_cross_entropy_row(logits + static_cast<std::size_t>(n) * classes, labels[n], classes,\n                              inv_n, loss, grad_row);\n    sum += loss;\n  }\n  return sum / static_cast<T>(batch);\n}\n\ntemplate <typename T>\nint count_correct(host_policy_t, const T* logits, const int* labels, int batch, int classes) {\n  int correct = 0;\n  for (int n = 0; n < batch; ++n) {\n    const int pred = argmax_row(logits + static_cast<std::size_t>(n) * classes, classes);\n    if (pred == labels[n]) ++correct;\n  }\n  return correct;\n}\n\n#if defined(__CUDACC__)\n\ntemplate <typename T>\nstruct SgdMomentumFn {\n  T* params;\n  const T* grads;\n  T* velocity;\n  T lr, momentum, weight_decay;\n  __host__ __device__ void operator()(std::size_t i) const {\n    sgd_momentum_at(params[i], grads[i], velocity[i], lr, momentum, weight_decay);\n  }\n};\n\ntemplate <typename T>\nstruct AdamWFn {\n  T* params;\n  const T* grads;\n  T* first_moment;\n  T* second_moment;\n  T lr, beta1, beta2, eps, weight_decay, bias_correction_1, bias_correction_2;\n  __host__ __device__ void operator()(std::size_t i) const {\n    adamw_at(params[i], grads[i], first_moment[i], second_moment[i], lr, beta1, beta2, eps,\n             weight_decay, bias_correction_1, bias_correction_2);\n  }\n};\n\ntemplate <typename T>\nstruct AddFn {\n  const T* a;\n  const T* b;\n  T* out;\n  __host__ __device__ void operator()(std::size_t i) const { out[i] = add_at(a[i], b[i]); }\n};\n\ntemplate <typename T>\nstruct ReluFn {\n  const T* in;\n  T* out;\n  __host__ __device__ void operator()(std::size_t i) const { out[i] = relu_at(in[i]); }\n};\n\ntemplate <typename T>\nstruct ReluBackwardFn {\n  const T* input;\n  const T* grad_out;\n  T* grad_in;\n  __host__ __device__ void operator()(std::size_t i) const {\n    grad_in[i] = relu_backward_at(input[i], grad_out[i]);\n  }\n};\n\ntemplate <typename T>\nstruct BiasAddFn {\n  T* data;\n  const T* bias;\n  int width;\n  __host__ __device__ void operator()(std::size_t i) const { data[i] += bias[i % static_cast<std::size_t>(width)]; }\n};\n\ntemplate <typename Derived, typename T>\nvoid sgd_momentum(const thrust::execution_policy<Derived>& policy, T* params, const T* grads,\n                  T* velocity, std::size_t n, T lr, T momentum, T weight_decay) {\n  if (n == 0) return;\n  thrust::for_each(policy, thrust::counting_iterator<std::size_t>(0),\n                   thrust::counting_iterator<std::size_t>(n),\n                   SgdMomentumFn<T>{params, grads, velocity, lr, momentum, weight_decay});\n}\n\ntemplate <typename Derived, typename T>\nvoid adamw(const thrust::execution_policy<Derived>& policy, T* params, const T* grads,\n           T* first_moment, T* second_moment, std::size_t n, T lr, T beta1, T beta2, T eps,\n           T weight_decay, T bias_correction_1, T bias_correction_2) {\n  if (n == 0) return;\n  thrust::for_each(policy, thrust::counting_iterator<std::size_t>(0),\n                   thrust::counting_iterator<std::size_t>(n),\n                   AdamWFn<T>{params, grads, first_moment, second_moment, lr, beta1, beta2, eps,\n                              weight_decay, bias_correction_1, bias_correction_2});\n}\n\ntemplate <typename Derived, typename T>\nvoid add(const thrust::execution_policy<Derived>& policy, const T* a, const T* b, T* out,\n         std::size_t n) {\n  if (n == 0) return;\n  thrust::for_each(policy, thrust::counting_iterator<std::size_t>(0),\n                   thrust::counting_iterator<std::size_t>(n), AddFn<T>{a, b, out});\n}\n\ntemplate <typename Derived, typename T>\nvoid relu(const thrust::execution_policy<Derived>& policy, const T* in, T* out, std::size_t n) {\n  if (n == 0) return;\n  thrust::for_each(policy, thrust::counting_iterator<std::size_t>(0),\n                   thrust::counting_iterator<std::size_t>(n), ReluFn<T>{in, out});\n}\n\ntemplate <typename Derived, typename T>\nvoid relu_backward(const thrust::execution_policy<Derived>& policy, const T* input,\n                   const T* grad_out, T* grad_in, std::size_t n) {\n  if (n == 0) return;\n  thrust::for_each(policy, thrust::counting_iterator<std::size_t>(0),\n                   thrust::counting_iterator<std::size_t>(n),\n                   ReluBackwardFn<T>{input, grad_out, grad_in});\n}\n\ntemplate <typename Derived, typename T>\nvoid bias_add(const thrust::execution_policy<Derived>& policy, T* data, const T* bias, int batch,\n              int width) {\n  const std::size_t n = static_cast<std::size_t>(batch) * static_cast<std::size_t>(width);\n  if (n == 0) return;\n  thrust::for_each(policy, thrust::counting_iterator<std::size_t>(0),\n                   thrust::counting_iterator<std::size_t>(n), BiasAddFn<T>{data, bias, width});\n}\n\ntemplate <typename Derived, typename T>\nvoid fill(const thrust::execution_policy<Derived>& policy, T* data, std::size_t n, T value) {\n  if (n == 0) return;\n  thrust::fill(policy, data, data + n, value);\n}\n\n#endif  // __CUDACC__\n\n#undef RESNET_HD\n\n}  // namespace resnet\n"
	},
	{
		group: "Spec",
		path: "include/resnet/geometry.hpp",
		code: "#pragma once\n\n#include <cstdint>\n#include <cstring>\n\nnamespace resnet {\n\n// Spatial helpers shared by the host tests and the CUDA model builder.\n// Keep these formulas identical to the cuDNN NCHW conv / pool descriptors\n// (dilation 1, cross-correlation).\n\nconstexpr int conv2d_out(int input, int kernel, int stride, int pad, int dilation = 1) {\n  return (input + 2 * pad - dilation * (kernel - 1) - 1) / stride + 1;\n}\n\nconstexpr int pool2d_out(int input, int kernel, int stride, int pad) {\n  return (input + 2 * pad - kernel) / stride + 1;\n}\n\nstruct BlockSpec {\n  int blocks = 0;\n  int channels = 0;\n  int stride = 1;  // stride of the first block in the stage; later blocks use 1\n};\n\n// At most four stages. Unused tail entries have blocks == 0.\nstruct ArchSpec {\n  const char* name;\n  int conv1_channels;\n  int conv1_kernel;\n  int conv1_stride;\n  int conv1_pad;\n  bool max_pool;  // ImageNet stem: 3x3, stride 2, pad 1, after conv1+bn+relu\n  int num_stages;\n  BlockSpec stages[4];\n};\n\n// CIFAR-style stem on 28x28 grayscale. No max-pool (MNIST is already small).\ninline ArchSpec mnist_arch() {\n  ArchSpec a{\"mnist\", 16, 3, 1, 1, false, 3, {}};\n  a.stages[0] = {2, 16, 1};\n  a.stages[1] = {2, 32, 2};\n  a.stages[2] = {2, 64, 2};\n  return a;\n}\n\n// torchvision ResNet-18 stem and stages. BasicBlock, expansion 1.\ninline ArchSpec resnet18_arch() {\n  ArchSpec a{\"resnet18\", 64, 7, 2, 3, true, 4, {}};\n  a.stages[0] = {2, 64, 1};\n  a.stages[1] = {2, 128, 2};\n  a.stages[2] = {2, 256, 2};\n  a.stages[3] = {2, 512, 2};\n  return a;\n}\n\n// Returns false when `name` is not \"mnist\" or \"resnet18\".\ninline bool arch_by_name(const char* name, ArchSpec& out) {\n  if (name != nullptr && std::strcmp(name, \"resnet18\") == 0) {\n    out = resnet18_arch();\n    return true;\n  }\n  if (name != nullptr && std::strcmp(name, \"mnist\") == 0) {\n    out = mnist_arch();\n    return true;\n  }\n  return false;\n}\n\nstruct Spatial {\n  int height = 0;\n  int width = 0;\n  int channels = 0;\n};\n\n// Trace conv1 (+ optional max-pool) and each stage's strided 3x3.\n// The second 3x3 inside a basic block has stride 1 and does not change size.\ninline Spatial spatial_after(const ArchSpec& arch, int height, int width) {\n  Spatial s;\n  s.height = conv2d_out(height, arch.conv1_kernel, arch.conv1_stride, arch.conv1_pad);\n  s.width = conv2d_out(width, arch.conv1_kernel, arch.conv1_stride, arch.conv1_pad);\n  if (arch.max_pool) {\n    s.height = pool2d_out(s.height, 3, 2, 1);\n    s.width = pool2d_out(s.width, 3, 2, 1);\n  }\n  s.channels = arch.conv1_channels;\n  for (int stage = 0; stage < arch.num_stages; ++stage) {\n    const int stride = arch.stages[stage].stride;\n    s.height = conv2d_out(s.height, 3, stride, 1);\n    s.width = conv2d_out(s.width, 3, stride, 1);\n    s.channels = arch.stages[stage].channels;\n  }\n  return s;\n}\n\ninline long long conv_params(int in_c, int out_c, int kernel, bool bias) {\n  long long n = static_cast<long long>(out_c) * in_c * kernel * kernel;\n  if (bias) n += out_c;\n  return n;\n}\n\ninline int bn_affine_params(int channels) { return channels * 2; }\n\ninline long long basic_block_params(int in_c, int out_c, int stride) {\n  long long n = conv_params(in_c, out_c, 3, false) + bn_affine_params(out_c);\n  n += conv_params(out_c, out_c, 3, false) + bn_affine_params(out_c);\n  if (stride != 1 || in_c != out_c) {\n    n += conv_params(in_c, out_c, 1, false) + bn_affine_params(out_c);\n  }\n  return n;\n}\n\n// Trainable tensors only (conv/linear weights, BN gamma+beta, linear bias).\n// Running mean/var are checkpointed but are not parameters.\ninline long long trainable_parameter_count(const ArchSpec& arch, int in_channels, int num_classes) {\n  long long n = conv_params(in_channels, arch.conv1_channels, arch.conv1_kernel, false);\n  n += bn_affine_params(arch.conv1_channels);\n  int channels = arch.conv1_channels;\n  for (int stage = 0; stage < arch.num_stages; ++stage) {\n    for (int block = 0; block < arch.stages[stage].blocks; ++block) {\n      const int stride = block == 0 ? arch.stages[stage].stride : 1;\n      const int out_c = arch.stages[stage].channels;\n      n += basic_block_params(channels, out_c, stride);\n      channels = out_c;\n    }\n  }\n  n += static_cast<long long>(channels) * num_classes + num_classes;\n  return n;\n}\n\n}  // namespace resnet\n"
	},
	{
		group: "Spec",
		path: "include/resnet/init.hpp",
		code: "#pragma once\n\n#include <cmath>\n#include <cstdint>\n#include <vector>\n\nnamespace resnet {\n\n// SplitMix64. Deterministic across platforms, unlike std::normal_distribution.\nclass SplitMix64 {\n public:\n  explicit SplitMix64(std::uint64_t seed) : state_(seed) {}\n\n  std::uint64_t next() {\n    std::uint64_t z = (state_ += 0x9e3779b97f4a7c15ULL);\n    z = (z ^ (z >> 30)) * 0xbf58476d1ce4e5b9ULL;\n    z = (z ^ (z >> 27)) * 0x94d049bb133111ebULL;\n    return z ^ (z >> 31);\n  }\n\n  // (0, 1) with 53 bits of mantissa. Never returns 0.\n  double uniform_open() {\n    double u = static_cast<double>(next() >> 11) * (1.0 / 9007199254740992.0);\n    if (u < 1e-12) u = 1e-12;\n    return u;\n  }\n\n  double normal() {\n    const double u1 = uniform_open();\n    const double u2 = uniform_open();\n    constexpr double kTwoPi = 6.28318530717958647692;\n    return std::sqrt(-2.0 * std::log(u1)) * std::cos(kTwoPi * u2);\n  }\n\n private:\n  std::uint64_t state_;\n};\n\ninline std::uint64_t mix_seed(std::uint64_t seed, std::uint64_t index) {\n  SplitMix64 rng(seed ^ (index * 0x9e3779b97f4a7c15ULL));\n  return rng.next();\n}\n\ninline double he_stddev(int fan_in) {\n  return std::sqrt(2.0 / static_cast<double>(fan_in < 1 ? 1 : fan_in));\n}\n\n// He normal: N(0, sqrt(2 / fan_in)). fan_in for conv is in_channels * kH * kW.\ntemplate <typename T>\nstd::vector<T> he_normal(std::size_t count, int fan_in, std::uint64_t seed) {\n  SplitMix64 rng(seed);\n  const double scale = he_stddev(fan_in);\n  std::vector<T> out(count);\n  for (std::size_t i = 0; i < count; ++i) {\n    out[i] = static_cast<T>(rng.normal() * scale);\n  }\n  return out;\n}\n\ntemplate <typename T>\nstd::vector<T> constant_fill(std::size_t count, T value) {\n  return std::vector<T>(count, value);\n}\n\n}  // namespace resnet\n"
	},
	{
		group: "Spec",
		path: "include/resnet/serializer.hpp",
		code: "#pragma once\n\n#include \"resnet/error.hpp\"\n\n#include <cstdint>\n#include <cstring>\n#include <string>\n#include <type_traits>\n#include <vector>\n\nnamespace resnet {\n\n// Little-endian checkpoint. Magic \"RESNET01\", version 1.\n//\n//   uint32 version\n//   uint32 flags          (0)\n//   uint32 tensor_count\n//   repeated:\n//     uint32 name_len + bytes (no trailing NUL required)\n//     uint32 rank + int32 dims[rank]\n//     uint64 numel\n//     uint32 dtype          (0 = f32, 1 = f64)\n//     payload               (IEEE little-endian)\n\nenum class DType : std::uint32_t { Float32 = 0, Float64 = 1 };\n\nstruct TensorBlob {\n  std::string name;\n  std::vector<std::int32_t> shape;\n  DType dtype = DType::Float32;\n  std::vector<std::uint8_t> bytes;\n};\n\nvoid save_checkpoint(const std::string& path, const std::vector<TensorBlob>& tensors);\nstd::vector<TensorBlob> load_checkpoint(const std::string& path);\n\ntemplate <typename T>\nDType dtype_tag();\n\ntemplate <>\ninline DType dtype_tag<float>() {\n  return DType::Float32;\n}\ntemplate <>\ninline DType dtype_tag<double>() {\n  return DType::Float64;\n}\n\ntemplate <typename T>\nTensorBlob make_blob(const std::string& name, const std::vector<int>& shape, const std::vector<T>& data) {\n  static_assert(sizeof(T) == 4 || sizeof(T) == 8, \"checkpoint supports f32 and f64 only\");\n  std::size_t expect = 1;\n  TensorBlob blob;\n  blob.name = name;\n  blob.dtype = dtype_tag<T>();\n  blob.shape.reserve(shape.size());\n  for (int dim : shape) {\n    if (dim < 0) throw Error(\"negative dimension in blob '\" + name + \"'\");\n    if (dim != 0 && expect > static_cast<std::size_t>(-1) / static_cast<std::size_t>(dim)) {\n      throw Error(\"shape overflow in blob '\" + name + \"'\");\n    }\n    expect *= static_cast<std::size_t>(dim);\n    blob.shape.push_back(dim);\n  }\n  if (shape.empty()) expect = 0;\n  if (data.size() != expect) {\n    throw Error(\"blob '\" + name + \"' has \" + std::to_string(data.size()) + \" values but shape holds \" +\n                std::to_string(expect));\n  }\n  blob.bytes.resize(data.size() * sizeof(T));\n  using Bits = typename std::conditional<sizeof(T) == 4, std::uint32_t, std::uint64_t>::type;\n  for (std::size_t i = 0; i < data.size(); ++i) {\n    Bits bits = 0;\n    const T value = data[i];\n    std::memcpy(&bits, &value, sizeof(T));\n    for (std::size_t b = 0; b < sizeof(T); ++b) {\n      blob.bytes[i * sizeof(T) + b] = static_cast<std::uint8_t>((bits >> (8 * b)) & 0xffu);\n    }\n  }\n  return blob;\n}\n\ntemplate <typename T>\nstd::vector<T> blob_values(const TensorBlob& blob) {\n  if (blob.dtype != dtype_tag<T>()) throw Error(\"dtype mismatch for blob '\" + blob.name + \"'\");\n  if (blob.bytes.size() % sizeof(T) != 0) throw Error(\"truncated payload for blob '\" + blob.name + \"'\");\n  const std::size_t n = blob.bytes.size() / sizeof(T);\n  std::vector<T> out(n);\n  using Bits = typename std::conditional<sizeof(T) == 4, std::uint32_t, std::uint64_t>::type;\n  for (std::size_t i = 0; i < n; ++i) {\n    Bits bits = 0;\n    for (std::size_t b = 0; b < sizeof(T); ++b) {\n      bits |= static_cast<Bits>(blob.bytes[i * sizeof(T) + b]) << (8 * b);\n    }\n    std::memcpy(&out[i], &bits, sizeof(T));\n  }\n  return out;\n}\n\n}  // namespace resnet\n"
	},
	{
		group: "Spec",
		path: "include/resnet/mnist.hpp",
		code: "#pragma once\n\n#include <cstdint>\n#include <string>\n#include <vector>\n\nnamespace resnet {\n\n// torchvision MNIST normalization, applied as (pixel/255 - mean) / std.\ninline constexpr float kMnistMean = 0.1307f;\ninline constexpr float kMnistStd = 0.3081f;\n\n// One IDX split. Images are tightly packed uint8, row-major, rows*cols each.\nstruct MnistSplit {\n  int rows = 28;\n  int cols = 28;\n  std::vector<std::uint8_t> images;\n  std::vector<std::uint8_t> labels;\n\n  int size() const { return static_cast<int>(labels.size()); }\n  const std::uint8_t* image(int index) const {\n    return images.data() + static_cast<std::size_t>(index) * static_cast<std::size_t>(rows) *\n                               static_cast<std::size_t>(cols);\n  }\n};\n\n// Standard uncompressed IDX files (Yann LeCun / ossci mirror, after gunzip).\nMnistSplit load_mnist_split(const std::string& images_path, const std::string& labels_path);\n\n// Class-conditional geometric digits with a few pixels of jitter.\n// Enough for the training loop to move; not a substitute for real MNIST.\nMnistSplit make_synthetic_digits(int count, std::uint32_t seed);\n\nstruct HostBatch {\n  std::vector<float> images;  // NCHW, 1 channel, normalized\n  std::vector<int> labels;\n};\n\n// indices selects examples. Copies [begin, begin+batch) of that index list.\nvoid fill_batch(const MnistSplit& data, const std::vector<int>& indices, int begin, int batch,\n                HostBatch& out, float mean = kMnistMean, float stddev = kMnistStd);\n\n}  // namespace resnet\n"
	},
	{
		group: "Runtime",
		path: "include/resnet/tensor.hpp",
		code: "#pragma once\n\n#include \"resnet/error.hpp\"\n\n#include <cstddef>\n#include <vector>\n\nnamespace resnet {\n\ninline std::size_t checked_numel(const std::vector<int>& shape) {\n  if (shape.empty()) return 0;\n  std::size_t n = 1;\n  for (int dim : shape) {\n    if (dim < 0) throw Error(\"negative tensor dimension\");\n    if (dim != 0 && n > static_cast<std::size_t>(-1) / static_cast<std::size_t>(dim)) {\n      throw Error(\"tensor shape overflow\");\n    }\n    n *= static_cast<std::size_t>(dim);\n  }\n  return n;\n}\n\n// Uninitialized device storage. Grows monotonically. Move-only.\ntemplate <typename T>\nclass DeviceBuffer {\n public:\n  DeviceBuffer() = default;\n  explicit DeviceBuffer(std::size_t n);\n  ~DeviceBuffer();\n  DeviceBuffer(const DeviceBuffer&) = delete;\n  DeviceBuffer& operator=(const DeviceBuffer&) = delete;\n  DeviceBuffer(DeviceBuffer&& other) noexcept;\n  DeviceBuffer& operator=(DeviceBuffer&& other) noexcept;\n\n  void resize(std::size_t n);\n  T* data() { return data_; }\n  const T* data() const { return data_; }\n  std::size_t size() const { return size_; }\n  void copy_from_host(const T* src, std::size_t n);\n  void copy_to_host(T* dst, std::size_t n) const;\n  void copy_from_device(const T* src, std::size_t n);\n  void zero();\n\n private:\n  T* data_ = nullptr;\n  std::size_t size_ = 0;\n  std::size_t cap_ = 0;\n};\n\n// N-D device tensor. `requires_grad` marks optimizer parameters.\n// Activation tensors keep requires_grad false and own their storage via data().\ntemplate <typename T>\nclass Tensor {\n public:\n  Tensor() = default;\n  explicit Tensor(std::vector<int> shape, bool requires_grad = false);\n  ~Tensor();\n  Tensor(const Tensor&) = delete;\n  Tensor& operator=(const Tensor&) = delete;\n  Tensor(Tensor&& other) noexcept;\n  Tensor& operator=(Tensor&& other) noexcept;\n\n  void resize(const std::vector<int>& shape);\n  const std::vector<int>& shape() const { return shape_; }\n  int rank() const { return static_cast<int>(shape_.size()); }\n  int dim(int index) const;\n  std::size_t numel() const { return numel_; }\n  bool requires_grad() const { return requires_grad_; }\n  void set_requires_grad(bool value) { requires_grad_ = value; }\n\n  T* data() { return data_.data(); }\n  const T* data() const { return data_.data(); }\n  // Allocates a zero buffer the first time. Only legal when requires_grad is set.\n  T* grad();\n  const T* grad() const;\n  bool has_grad() const { return grad_.size() == numel_ && numel_ > 0; }\n  void zero_grad();\n  void zero_data();\n\n  std::vector<T> to_host() const;\n  void from_host(const std::vector<T>& values);\n  void copy_from_device(const T* src);\n\n private:\n  std::vector<int> shape_;\n  std::size_t numel_ = 0;\n  bool requires_grad_ = false;\n  DeviceBuffer<T> data_;\n  DeviceBuffer<T> grad_;\n};\n\n}  // namespace resnet\n"
	},
	{
		group: "Runtime",
		path: "include/resnet/module.hpp",
		code: "#pragma once\n\n#include \"resnet/tensor.hpp\"\n\n#include <string>\n#include <vector>\n\nnamespace resnet {\n\ntemplate <typename T>\nstruct NamedParam {\n  std::string name;\n  Tensor<T>* tensor = nullptr;\n};\n\n// Common surface for parameter collection and train/eval.\n// Forward and backward stay concrete on each layer so multi-input ops\n// (the residual add) are not forced through a single tensor.\ntemplate <typename T>\nclass Module {\n public:\n  virtual ~Module() = default;\n  virtual void train(bool mode) { training_ = mode; }\n  void eval() { train(false); }\n  bool training() const { return training_; }\n  virtual void collect_parameters(const std::string& prefix, std::vector<NamedParam<T>>& out) = 0;\n\n protected:\n  bool training_ = true;\n};\n\n}  // namespace resnet\n"
	},
	{
		group: "Runtime",
		path: "include/resnet/context.hpp",
		code: "#pragma once\n\n#include <cstddef>\n\n#include <cublas_v2.h>\n#include <cudnn.h>\n\nnamespace resnet {\n\n// One cuDNN handle, one cuBLAS handle, and a grow-only workspace.\n// Not thread-safe. Must outlive every layer that captured this pointer.\nclass CudnnContext {\n public:\n  CudnnContext();\n  ~CudnnContext();\n  CudnnContext(const CudnnContext&) = delete;\n  CudnnContext& operator=(const CudnnContext&) = delete;\n\n  cudnnHandle_t cudnn() const { return cudnn_; }\n  cublasHandle_t cublas() const { return cublas_; }\n  void* workspace(std::size_t bytes);\n\n private:\n  cudnnHandle_t cudnn_ = nullptr;\n  cublasHandle_t cublas_ = nullptr;\n  void* workspace_ = nullptr;\n  std::size_t workspace_cap_ = 0;\n};\n\n}  // namespace resnet\n"
	},
	{
		group: "Runtime",
		path: "include/resnet/check.hpp",
		code: "#pragma once\n\n#include \"resnet/error.hpp\"\n\n#include <cublas_v2.h>\n#include <cuda_runtime.h>\n#include <cudnn.h>\n\n#include <sstream>\n#include <string>\n\nnamespace resnet {\n\ninline void throw_check(const std::string& kind, const std::string& detail, const char* expr,\n                        const char* file, int line) {\n  std::ostringstream os;\n  os << kind << \" error: \" << detail << \" (\" << expr << \") at \" << file << \":\" << line;\n  throw Error(os.str());\n}\n\ninline void check_cuda(cudaError_t status, const char* expr, const char* file, int line) {\n  if (status != cudaSuccess) {\n    throw_check(\"CUDA\", cudaGetErrorString(status), expr, file, line);\n  }\n}\n\ninline void check_cudnn(cudnnStatus_t status, const char* expr, const char* file, int line) {\n  if (status != CUDNN_STATUS_SUCCESS) {\n    throw_check(\"cuDNN\", cudnnGetErrorString(status), expr, file, line);\n  }\n}\n\ninline void check_cublas(cublasStatus_t status, const char* expr, const char* file, int line) {\n  if (status == CUBLAS_STATUS_SUCCESS) return;\n  const char* name = \"unknown\";\n  switch (status) {\n    case CUBLAS_STATUS_NOT_INITIALIZED: name = \"NOT_INITIALIZED\"; break;\n    case CUBLAS_STATUS_ALLOC_FAILED: name = \"ALLOC_FAILED\"; break;\n    case CUBLAS_STATUS_INVALID_VALUE: name = \"INVALID_VALUE\"; break;\n    case CUBLAS_STATUS_ARCH_MISMATCH: name = \"ARCH_MISMATCH\"; break;\n    case CUBLAS_STATUS_MAPPING_ERROR: name = \"MAPPING_ERROR\"; break;\n    case CUBLAS_STATUS_EXECUTION_FAILED: name = \"EXECUTION_FAILED\"; break;\n    case CUBLAS_STATUS_INTERNAL_ERROR: name = \"INTERNAL_ERROR\"; break;\n    case CUBLAS_STATUS_NOT_SUPPORTED: name = \"NOT_SUPPORTED\"; break;\n    case CUBLAS_STATUS_LICENSE_ERROR: name = \"LICENSE_ERROR\"; break;\n    default: break;\n  }\n  throw_check(\"cuBLAS\", name, expr, file, line);\n}\n\ntemplate <typename T>\ncudnnDataType_t cudnn_dtype();\n\ntemplate <>\ninline cudnnDataType_t cudnn_dtype<float>() {\n  return CUDNN_DATA_FLOAT;\n}\ntemplate <>\ninline cudnnDataType_t cudnn_dtype<double>() {\n  return CUDNN_DATA_DOUBLE;\n}\n\n}  // namespace resnet\n\n#define RESNET_CUDA_CHECK(expr) ::resnet::check_cuda((expr), #expr, __FILE__, __LINE__)\n#define RESNET_CUDNN_CHECK(expr) ::resnet::check_cudnn((expr), #expr, __FILE__, __LINE__)\n#define RESNET_CUBLAS_CHECK(expr) ::resnet::check_cublas((expr), #expr, __FILE__, __LINE__)\n"
	},
	{
		group: "Runtime",
		path: "include/resnet/descriptors.hpp",
		code: "#pragma once\n\n#include \"resnet/check.hpp\"\n\nnamespace resnet {\n\nclass TensorDescriptor {\n public:\n  TensorDescriptor() { RESNET_CUDNN_CHECK(cudnnCreateTensorDescriptor(&desc_)); }\n  ~TensorDescriptor() {\n    if (desc_ != nullptr) cudnnDestroyTensorDescriptor(desc_);\n  }\n  TensorDescriptor(const TensorDescriptor&) = delete;\n  TensorDescriptor& operator=(const TensorDescriptor&) = delete;\n  TensorDescriptor(TensorDescriptor&& other) noexcept : desc_(other.desc_) { other.desc_ = nullptr; }\n  TensorDescriptor& operator=(TensorDescriptor&& other) noexcept {\n    if (this != &other) {\n      if (desc_ != nullptr) cudnnDestroyTensorDescriptor(desc_);\n      desc_ = other.desc_;\n      other.desc_ = nullptr;\n    }\n    return *this;\n  }\n  cudnnTensorDescriptor_t get() const { return desc_; }\n\n private:\n  cudnnTensorDescriptor_t desc_ = nullptr;\n};\n\nclass FilterDescriptor {\n public:\n  FilterDescriptor() { RESNET_CUDNN_CHECK(cudnnCreateFilterDescriptor(&desc_)); }\n  ~FilterDescriptor() {\n    if (desc_ != nullptr) cudnnDestroyFilterDescriptor(desc_);\n  }\n  FilterDescriptor(const FilterDescriptor&) = delete;\n  FilterDescriptor& operator=(const FilterDescriptor&) = delete;\n  FilterDescriptor(FilterDescriptor&& other) noexcept : desc_(other.desc_) { other.desc_ = nullptr; }\n  FilterDescriptor& operator=(FilterDescriptor&& other) noexcept {\n    if (this != &other) {\n      if (desc_ != nullptr) cudnnDestroyFilterDescriptor(desc_);\n      desc_ = other.desc_;\n      other.desc_ = nullptr;\n    }\n    return *this;\n  }\n  cudnnFilterDescriptor_t get() const { return desc_; }\n\n private:\n  cudnnFilterDescriptor_t desc_ = nullptr;\n};\n\nclass ConvDescriptor {\n public:\n  ConvDescriptor() { RESNET_CUDNN_CHECK(cudnnCreateConvolutionDescriptor(&desc_)); }\n  ~ConvDescriptor() {\n    if (desc_ != nullptr) cudnnDestroyConvolutionDescriptor(desc_);\n  }\n  ConvDescriptor(const ConvDescriptor&) = delete;\n  ConvDescriptor& operator=(const ConvDescriptor&) = delete;\n  ConvDescriptor(ConvDescriptor&& other) noexcept : desc_(other.desc_) { other.desc_ = nullptr; }\n  ConvDescriptor& operator=(ConvDescriptor&& other) noexcept {\n    if (this != &other) {\n      if (desc_ != nullptr) cudnnDestroyConvolutionDescriptor(desc_);\n      desc_ = other.desc_;\n      other.desc_ = nullptr;\n    }\n    return *this;\n  }\n  cudnnConvolutionDescriptor_t get() const { return desc_; }\n\n private:\n  cudnnConvolutionDescriptor_t desc_ = nullptr;\n};\n\nclass PoolDescriptor {\n public:\n  PoolDescriptor() { RESNET_CUDNN_CHECK(cudnnCreatePoolingDescriptor(&desc_)); }\n  ~PoolDescriptor() {\n    if (desc_ != nullptr) cudnnDestroyPoolingDescriptor(desc_);\n  }\n  PoolDescriptor(const PoolDescriptor&) = delete;\n  PoolDescriptor& operator=(const PoolDescriptor&) = delete;\n  PoolDescriptor(PoolDescriptor&& other) noexcept : desc_(other.desc_) { other.desc_ = nullptr; }\n  PoolDescriptor& operator=(PoolDescriptor&& other) noexcept {\n    if (this != &other) {\n      if (desc_ != nullptr) cudnnDestroyPoolingDescriptor(desc_);\n      desc_ = other.desc_;\n      other.desc_ = nullptr;\n    }\n    return *this;\n  }\n  cudnnPoolingDescriptor_t get() const { return desc_; }\n\n private:\n  cudnnPoolingDescriptor_t desc_ = nullptr;\n};\n\n}  // namespace resnet\n"
	},
	{
		group: "Runtime",
		path: "include/resnet/error.hpp",
		code: "#pragma once\n\n#include <stdexcept>\n#include <string>\n\nnamespace resnet {\n\n// Project-wide exception. Thrown for shape errors, bad checkpoints, cuDNN/CUDA\n// failures, and illegal training-state transitions.\nclass Error : public std::runtime_error {\n public:\n  explicit Error(const std::string& message) : std::runtime_error(message) {}\n};\n\n}  // namespace resnet\n"
	},
	{
		group: "Layers",
		path: "include/resnet/conv2d.hpp",
		code: "#pragma once\n\n#include \"resnet/context.hpp\"\n#include \"resnet/descriptors.hpp\"\n#include \"resnet/module.hpp\"\n\n#include <cstdint>\n\nnamespace resnet {\n\nstruct Conv2dConfig {\n  int in_channels = 1;\n  int out_channels = 1;\n  int kernel = 3;\n  int stride = 1;\n  int pad = 1;\n  bool bias = false;\n  std::uint64_t seed = 0;\n};\n\n// NCHW cross-correlation via cuDNN. Weights are KCRS: [out, in, kH, kW].\n// Activations are cached by copy so backward does not depend on the caller\n// keeping the input tensor alive.\ntemplate <typename T>\nclass Conv2d : public Module<T> {\n public:\n  Conv2d(CudnnContext& ctx, const Conv2dConfig& config);\n  Tensor<T>& forward(const Tensor<T>& input);\n  Tensor<T>& backward(const Tensor<T>& grad_out);\n  Tensor<T>& grad_input() { return grad_input_; }\n  void collect_parameters(const std::string& prefix, std::vector<NamedParam<T>>& out) override;\n\n private:\n  struct ShapeKey {\n    int n = -1, c = -1, h = -1, w = -1;\n    bool operator==(const ShapeKey& other) const {\n      return n == other.n && c == other.c && h == other.h && w == other.w;\n    }\n  };\n\n  void configure(const Tensor<T>& input);\n\n  CudnnContext* ctx_ = nullptr;\n  int in_channels_ = 0;\n  int out_channels_ = 0;\n  int kernel_ = 0;\n  int stride_ = 0;\n  int pad_ = 0;\n  bool bias_ = false;\n  ShapeKey key_{};\n  cudnnConvolutionFwdAlgo_t fwd_algo_ = CUDNN_CONVOLUTION_FWD_ALGO_IMPLICIT_GEMM;\n  cudnnConvolutionBwdDataAlgo_t bwd_data_algo_ = CUDNN_CONVOLUTION_BWD_DATA_ALGO_0;\n  cudnnConvolutionBwdFilterAlgo_t bwd_filter_algo_ = CUDNN_CONVOLUTION_BWD_FILTER_ALGO_0;\n  std::size_t fwd_workspace_ = 0;\n  std::size_t bwd_data_workspace_ = 0;\n  std::size_t bwd_filter_workspace_ = 0;\n\n  TensorDescriptor x_desc_;\n  TensorDescriptor y_desc_;\n  TensorDescriptor bias_desc_;\n  FilterDescriptor w_desc_;\n  ConvDescriptor conv_desc_;\n\n  Tensor<T> weight_;\n  Tensor<T> bias_;\n  Tensor<T> output_;\n  Tensor<T> grad_input_;\n  Tensor<T> saved_input_;\n};\n\n}  // namespace resnet\n"
	},
	{
		group: "Layers",
		path: "include/resnet/batch_norm.hpp",
		code: "#pragma once\n\n#include \"resnet/context.hpp\"\n#include \"resnet/descriptors.hpp\"\n#include \"resnet/module.hpp\"\n\nnamespace resnet {\n\nstruct BatchNormConfig {\n  int channels = 1;\n  double eps = 1e-5;\n  double momentum = 0.1;  // cuDNN exponential average factor\n};\n\n// Spatial batch-norm (per-channel), cuDNN training and inference paths.\n// Affine scale/bias require grad. Running mean/var are checkpointed buffers.\ntemplate <typename T>\nclass BatchNorm : public Module<T> {\n public:\n  BatchNorm(CudnnContext& ctx, const BatchNormConfig& config);\n  Tensor<T>& forward(const Tensor<T>& input);\n  Tensor<T>& backward(const Tensor<T>& grad_out);\n  Tensor<T>& grad_input() { return grad_input_; }\n  void collect_parameters(const std::string& prefix, std::vector<NamedParam<T>>& out) override;\n\n private:\n  void configure(const Tensor<T>& input);\n\n  CudnnContext* ctx_ = nullptr;\n  int channels_ = 0;\n  double eps_ = 1e-5;\n  double momentum_ = 0.1;\n  int cached_n_ = -1;\n  int cached_h_ = -1;\n  int cached_w_ = -1;\n\n  TensorDescriptor x_desc_;\n  TensorDescriptor bn_desc_;\n  Tensor<T> scale_;\n  Tensor<T> bias_;\n  Tensor<T> running_mean_;\n  Tensor<T> running_var_;\n  Tensor<T> saved_mean_;\n  Tensor<T> saved_inv_var_;\n  Tensor<T> output_;\n  Tensor<T> grad_input_;\n  Tensor<T> saved_input_;\n};\n\n}  // namespace resnet\n"
	},
	{
		group: "Layers",
		path: "include/resnet/activation.hpp",
		code: "#pragma once\n\n#include \"resnet/module.hpp\"\n\nnamespace resnet {\n\n// ReLU via the Thrust execution-policy algorithm in algorithms.hpp.\n// The mask is the saved pre-activation (x > 0), matching relu_backward_at.\ntemplate <typename T>\nclass ReLU : public Module<T> {\n public:\n  ReLU() = default;\n  Tensor<T>& forward(const Tensor<T>& input);\n  Tensor<T>& backward(const Tensor<T>& grad_out);\n  Tensor<T>& grad_input() { return grad_input_; }\n  void collect_parameters(const std::string& prefix, std::vector<NamedParam<T>>& out) override;\n\n private:\n  Tensor<T> output_;\n  Tensor<T> grad_input_;\n  Tensor<T> saved_input_;\n};\n\n}  // namespace resnet\n"
	},
	{
		group: "Layers",
		path: "include/resnet/pooling.hpp",
		code: "#pragma once\n\n#include \"resnet/context.hpp\"\n#include \"resnet/descriptors.hpp\"\n#include \"resnet/module.hpp\"\n\nnamespace resnet {\n\nenum class PoolKind { Max, GlobalAvg };\n\n// Max pool uses a fixed window. Global average pool sets the window to the\n// current HxW so the output is N,C,1,1 (cuDNN average, exclude padding).\ntemplate <typename T>\nclass Pool2d : public Module<T> {\n public:\n  Pool2d(CudnnContext& ctx, PoolKind kind, int kernel = 0, int stride = 0, int pad = 0);\n  Tensor<T>& forward(const Tensor<T>& input);\n  Tensor<T>& backward(const Tensor<T>& grad_out);\n  Tensor<T>& grad_input() { return grad_input_; }\n  void collect_parameters(const std::string& prefix, std::vector<NamedParam<T>>& out) override;\n\n private:\n  void configure(const Tensor<T>& input);\n\n  CudnnContext* ctx_ = nullptr;\n  PoolKind kind_ = PoolKind::Max;\n  int kernel_ = 0;\n  int stride_ = 0;\n  int pad_ = 0;\n  int cached_n_ = -1;\n  int cached_c_ = -1;\n  int cached_h_ = -1;\n  int cached_w_ = -1;\n  PoolDescriptor pool_desc_;\n  TensorDescriptor x_desc_;\n  TensorDescriptor y_desc_;\n  Tensor<T> output_;\n  Tensor<T> grad_input_;\n  Tensor<T> saved_input_;\n};\n\n}  // namespace resnet\n"
	},
	{
		group: "Layers",
		path: "include/resnet/linear.hpp",
		code: "#pragma once\n\n#include \"resnet/context.hpp\"\n#include \"resnet/module.hpp\"\n\n#include <cstdint>\n\nnamespace resnet {\n\nstruct LinearConfig {\n  int in_features = 1;\n  int out_features = 1;\n  bool bias = true;\n  std::uint64_t seed = 0;\n};\n\n// Y = X W^T + b. X is row-major [N, K] or NCHW with K = C*H*W.\n// The GEMM itself is cuBLAS (column-major view of the same bytes).\n// Bias add and bias grad stay in a Thrust loop / a small reduction kernel.\ntemplate <typename T>\nclass Linear : public Module<T> {\n public:\n  Linear(CudnnContext& ctx, const LinearConfig& config);\n  Tensor<T>& forward(const Tensor<T>& input);\n  Tensor<T>& backward(const Tensor<T>& grad_out);\n  Tensor<T>& grad_input() { return grad_input_; }\n  int out_features() const { return out_features_; }\n  void collect_parameters(const std::string& prefix, std::vector<NamedParam<T>>& out) override;\n\n private:\n  CudnnContext* ctx_ = nullptr;\n  int in_features_ = 0;\n  int out_features_ = 0;\n  bool bias_ = true;\n  int batch_ = -1;\n  Tensor<T> weight_;  // [out, in]\n  Tensor<T> bias_;    // [out]\n  Tensor<T> output_;\n  Tensor<T> grad_input_;\n  Tensor<T> saved_input_;\n  std::vector<int> input_shape_;\n};\n\n}  // namespace resnet\n"
	},
	{
		group: "Layers",
		path: "include/resnet/residual.hpp",
		code: "#pragma once\n\n#include \"resnet/activation.hpp\"\n#include \"resnet/batch_norm.hpp\"\n#include \"resnet/conv2d.hpp\"\n\n#include <memory>\n\nnamespace resnet {\n\n// y = ReLU(F(x) + S(x))\n// F is conv3x3-bn-relu-conv3x3-bn. S is identity, or 1x1 conv + bn when\n// the stride or the channel count changes. Addition is the Thrust `add` algorithm.\ntemplate <typename T>\nclass BasicBlock : public Module<T> {\n public:\n  BasicBlock(CudnnContext& ctx, int in_channels, int out_channels, int stride, std::uint64_t& seed);\n  Tensor<T>& forward(const Tensor<T>& input);\n  Tensor<T>& backward(const Tensor<T>& grad_out);\n  Tensor<T>& grad_input() { return grad_input_; }\n  void train(bool mode) override;\n  void collect_parameters(const std::string& prefix, std::vector<NamedParam<T>>& out) override;\n\n private:\n  static std::uint64_t take(std::uint64_t& seed);\n\n  Conv2d<T> conv1_;\n  BatchNorm<T> bn1_;\n  ReLU<T> relu1_;\n  Conv2d<T> conv2_;\n  BatchNorm<T> bn2_;\n  ReLU<T> relu_out_;\n  std::unique_ptr<Conv2d<T>> down_conv_;\n  std::unique_ptr<BatchNorm<T>> down_bn_;\n  Tensor<T> sum_;\n  Tensor<T> grad_input_;\n  std::vector<int> input_shape_;\n};\n\n}  // namespace resnet\n"
	},
	{
		group: "Layers",
		path: "include/resnet/resnet.hpp",
		code: "#pragma once\n\n#include \"resnet/geometry.hpp\"\n#include \"resnet/linear.hpp\"\n#include \"resnet/pooling.hpp\"\n#include \"resnet/residual.hpp\"\n\n#include <cstdint>\n#include <memory>\n#include <string>\n#include <vector>\n\nnamespace resnet {\n\n// ResNet built from ArchSpec.\n//   mnist:    3x3 stem, 16-32-64, two basic blocks per stage. 174,970 trainable\n//             values at 1 input channel and 10 classes.\n//   resnet18: 7x7 stem + max-pool, 64-128-256-512. 11,689,512 trainable values\n//             at 3 input channels and 1000 classes (torchvision resnet18).\ntemplate <typename T>\nclass ResNet : public Module<T> {\n public:\n  ResNet(CudnnContext& ctx, const ArchSpec& arch, int in_channels, int num_classes, std::uint64_t seed);\n  Tensor<T>& forward(const Tensor<T>& input);\n  Tensor<T>& backward(const Tensor<T>& grad_logits);\n  void train(bool mode) override;\n  void zero_grad();\n  void collect_parameters(const std::string& prefix, std::vector<NamedParam<T>>& out) override;\n\n  const ArchSpec& spec() const { return arch_; }\n  int in_channels() const { return in_channels_; }\n  int num_classes() const { return num_classes_; }\n  int fc_in_features() const { return fc_in_; }\n\n private:\n  static std::string join(const std::string& prefix, const std::string& leaf);\n\n  CudnnContext* ctx_ = nullptr;\n  ArchSpec arch_{};\n  int in_channels_ = 1;\n  int num_classes_ = 10;\n  int fc_in_ = 0;\n  Conv2d<T> conv1_;\n  BatchNorm<T> bn1_;\n  ReLU<T> relu_;\n  std::unique_ptr<Pool2d<T>> max_pool_;\n  std::vector<std::vector<std::unique_ptr<BasicBlock<T>>>> stages_;\n  Pool2d<T> gap_;\n  std::unique_ptr<Linear<T>> fc_;\n};\n\ntemplate <typename T>\nResNet<T> make_resnet(CudnnContext& ctx, const ArchSpec& arch, int in_channels, int num_classes,\n                      std::uint64_t seed);\n\n}  // namespace resnet\n"
	},
	{
		group: "Layers",
		path: "src/conv2d.cu",
		code: "#include \"resnet/conv2d.hpp\"\n\n#include \"resnet/geometry.hpp\"\n#include \"resnet/init.hpp\"\n\nnamespace resnet {\nnamespace {\n\ntemplate <typename T>\nbool fwd_workspace(cudnnHandle_t handle, const cudnnTensorDescriptor_t x, const cudnnFilterDescriptor_t w,\n                   const cudnnConvolutionDescriptor_t conv, const cudnnTensorDescriptor_t y,\n                   cudnnConvolutionFwdAlgo_t algo, std::size_t& bytes) {\n  return cudnnGetConvolutionForwardWorkspaceSize(handle, x, w, conv, y, algo, &bytes) ==\n         CUDNN_STATUS_SUCCESS;\n}\n\ntemplate <typename T>\nbool bwd_data_workspace(cudnnHandle_t handle, const cudnnFilterDescriptor_t w,\n                        const cudnnTensorDescriptor_t dy, const cudnnConvolutionDescriptor_t conv,\n                        const cudnnTensorDescriptor_t dx, cudnnConvolutionBwdDataAlgo_t algo,\n                        std::size_t& bytes) {\n  return cudnnGetConvolutionBackwardDataWorkspaceSize(handle, w, dy, conv, dx, algo, &bytes) ==\n         CUDNN_STATUS_SUCCESS;\n}\n\ntemplate <typename T>\nbool bwd_filter_workspace(cudnnHandle_t handle, const cudnnTensorDescriptor_t x,\n                          const cudnnTensorDescriptor_t dy, const cudnnConvolutionDescriptor_t conv,\n                          const cudnnFilterDescriptor_t dw, cudnnConvolutionBwdFilterAlgo_t algo,\n                          std::size_t& bytes) {\n  return cudnnGetConvolutionBackwardFilterWorkspaceSize(handle, x, dy, conv, dw, algo, &bytes) ==\n         CUDNN_STATUS_SUCCESS;\n}\n\n}  // namespace\n\ntemplate <typename T>\nConv2d<T>::Conv2d(CudnnContext& ctx, const Conv2dConfig& config)\n    : ctx_(&ctx),\n      in_channels_(config.in_channels),\n      out_channels_(config.out_channels),\n      kernel_(config.kernel),\n      stride_(config.stride),\n      pad_(config.pad),\n      bias_(config.bias) {\n  if (in_channels_ <= 0 || out_channels_ <= 0 || kernel_ <= 0 || stride_ <= 0 || pad_ < 0) {\n    throw Error(\"invalid Conv2d config\");\n  }\n  RESNET_CUDNN_CHECK(cudnnSetFilter4dDescriptor(w_desc_.get(), cudnn_dtype<T>(), CUDNN_TENSOR_NCHW,\n                                                out_channels_, in_channels_, kernel_, kernel_));\n  RESNET_CUDNN_CHECK(cudnnSetConvolution2dDescriptor(conv_desc_.get(), pad_, pad_, stride_, stride_, 1, 1,\n                                                     CUDNN_CROSS_CORRELATION, cudnn_dtype<T>()));\n  RESNET_CUDNN_CHECK(cudnnSetConvolutionMathType(conv_desc_.get(), CUDNN_DEFAULT_MATH));\n\n  const std::size_t weight_n =\n      static_cast<std::size_t>(out_channels_) * in_channels_ * kernel_ * kernel_;\n  weight_ = Tensor<T>({out_channels_, in_channels_, kernel_, kernel_}, true);\n  weight_.from_host(he_normal<T>(weight_n, in_channels_ * kernel_ * kernel_, config.seed));\n  if (bias_) {\n    bias_ = Tensor<T>({out_channels_}, true);\n    bias_.from_host(constant_fill<T>(static_cast<std::size_t>(out_channels_), T(0)));\n    RESNET_CUDNN_CHECK(cudnnSetTensor4dDescriptor(bias_desc_.get(), CUDNN_TENSOR_NCHW, cudnn_dtype<T>(), 1,\n                                                  out_channels_, 1, 1));\n  }\n}\n\ntemplate <typename T>\nvoid Conv2d<T>::configure(const Tensor<T>& input) {\n  if (input.rank() != 4) throw Error(\"Conv2d expects NCHW\");\n  if (input.dim(1) != in_channels_) throw Error(\"Conv2d channel mismatch\");\n  const ShapeKey key{input.dim(0), input.dim(1), input.dim(2), input.dim(3)};\n  if (key.n <= 0 || key.h <= 0 || key.w <= 0) throw Error(\"Conv2d got an empty input\");\n  if (key == key_) return;\n\n  const int expect_h = conv2d_out(key.h, kernel_, stride_, pad_);\n  const int expect_w = conv2d_out(key.w, kernel_, stride_, pad_);\n  if (expect_h <= 0 || expect_w <= 0) {\n    throw Error(\"convolution spatial size collapsed; use the mnist arch on 28x28 or a larger image\");\n  }\n\n  RESNET_CUDNN_CHECK(cudnnSetTensor4dDescriptor(x_desc_.get(), CUDNN_TENSOR_NCHW, cudnn_dtype<T>(), key.n,\n                                                key.c, key.h, key.w));\n  int on = 0, oc = 0, oh = 0, ow = 0;\n  RESNET_CUDNN_CHECK(\n      cudnnGetConvolution2dForwardOutputDim(conv_desc_.get(), x_desc_.get(), w_desc_.get(), &on, &oc, &oh, &ow));\n  if (on != key.n || oc != out_channels_ || oh != expect_h || ow != expect_w) {\n    throw Error(\"cuDNN spatial size disagrees with conv2d_out\");\n  }\n  RESNET_CUDNN_CHECK(\n      cudnnSetTensor4dDescriptor(y_desc_.get(), CUDNN_TENSOR_NCHW, cudnn_dtype<T>(), on, oc, oh, ow));\n\n  const cudnnConvolutionFwdAlgo_t fwd_algos[] = {\n      CUDNN_CONVOLUTION_FWD_ALGO_IMPLICIT_GEMM,\n      CUDNN_CONVOLUTION_FWD_ALGO_IMPLICIT_PRECOMP_GEMM,\n      CUDNN_CONVOLUTION_FWD_ALGO_GEMM,\n  };\n  bool found = false;\n  for (cudnnConvolutionFwdAlgo_t algo : fwd_algos) {\n    std::size_t bytes = 0;\n    if (fwd_workspace<T>(ctx_->cudnn(), x_desc_.get(), w_desc_.get(), conv_desc_.get(), y_desc_.get(), algo,\n                         bytes)) {\n      fwd_algo_ = algo;\n      fwd_workspace_ = bytes;\n      found = true;\n      break;\n    }\n  }\n  if (!found) throw Error(\"no cuDNN forward convolution algorithm for this shape\");\n\n  const cudnnConvolutionBwdDataAlgo_t data_algos[] = {\n      CUDNN_CONVOLUTION_BWD_DATA_ALGO_0,\n      CUDNN_CONVOLUTION_BWD_DATA_ALGO_1,\n  };\n  found = false;\n  for (cudnnConvolutionBwdDataAlgo_t algo : data_algos) {\n    std::size_t bytes = 0;\n    if (bwd_data_workspace<T>(ctx_->cudnn(), w_desc_.get(), y_desc_.get(), conv_desc_.get(), x_desc_.get(),\n                              algo, bytes)) {\n      bwd_data_algo_ = algo;\n      bwd_data_workspace_ = bytes;\n      found = true;\n      break;\n    }\n  }\n  if (!found) throw Error(\"no cuDNN backward-data convolution algorithm for this shape\");\n\n  const cudnnConvolutionBwdFilterAlgo_t filter_algos[] = {\n      CUDNN_CONVOLUTION_BWD_FILTER_ALGO_0,\n      CUDNN_CONVOLUTION_BWD_FILTER_ALGO_1,\n      CUDNN_CONVOLUTION_BWD_FILTER_ALGO_3,\n  };\n  found = false;\n  for (cudnnConvolutionBwdFilterAlgo_t algo : filter_algos) {\n    std::size_t bytes = 0;\n    if (bwd_filter_workspace<T>(ctx_->cudnn(), x_desc_.get(), y_desc_.get(), conv_desc_.get(), w_desc_.get(),\n                                algo, bytes)) {\n      bwd_filter_algo_ = algo;\n      bwd_filter_workspace_ = bytes;\n      found = true;\n      break;\n    }\n  }\n  if (!found) throw Error(\"no cuDNN backward-filter convolution algorithm for this shape\");\n\n  output_.resize({on, oc, oh, ow});\n  grad_input_.resize({key.n, key.c, key.h, key.w});\n  saved_input_.resize({key.n, key.c, key.h, key.w});\n  key_ = key;\n}\n\ntemplate <typename T>\nTensor<T>& Conv2d<T>::forward(const Tensor<T>& input) {\n  configure(input);\n  saved_input_.copy_from_device(input.data());\n  const T one = T(1);\n  const T zero = T(0);\n  void* work = ctx_->workspace(fwd_workspace_);\n  RESNET_CUDNN_CHECK(cudnnConvolutionForward(ctx_->cudnn(), &one, x_desc_.get(), saved_input_.data(),\n                                             w_desc_.get(), weight_.data(), conv_desc_.get(), fwd_algo_, work,\n                                             fwd_workspace_, &zero, y_desc_.get(), output_.data()));\n  if (bias_) {\n    RESNET_CUDNN_CHECK(cudnnAddTensor(ctx_->cudnn(), &one, bias_desc_.get(), bias_.data(), &one, y_desc_.get(),\n                                      output_.data()));\n  }\n  return output_;\n}\n\ntemplate <typename T>\nTensor<T>& Conv2d<T>::backward(const Tensor<T>& grad_out) {\n  if (key_.n < 0) throw Error(\"Conv2d::backward called before forward\");\n  if (grad_out.numel() != output_.numel()) throw Error(\"Conv2d gradient shape mismatch\");\n  const T one = T(1);\n  const T zero = T(0);\n  const std::size_t filter_bytes = bwd_filter_workspace_ > bwd_data_workspace_ ? bwd_filter_workspace_ : bwd_data_workspace_;\n  void* work = ctx_->workspace(filter_bytes);\n  RESNET_CUDNN_CHECK(cudnnConvolutionBackwardFilter(\n      ctx_->cudnn(), &one, x_desc_.get(), saved_input_.data(), y_desc_.get(), grad_out.data(), conv_desc_.get(),\n      bwd_filter_algo_, work, bwd_filter_workspace_, &zero, w_desc_.get(), weight_.grad()));\n  if (bias_) {\n    RESNET_CUDNN_CHECK(cudnnConvolutionBackwardBias(ctx_->cudnn(), &one, y_desc_.get(), grad_out.data(), &zero,\n                                                    bias_desc_.get(), bias_.grad()));\n  }\n  RESNET_CUDNN_CHECK(cudnnConvolutionBackwardData(\n      ctx_->cudnn(), &one, w_desc_.get(), weight_.data(), y_desc_.get(), grad_out.data(), conv_desc_.get(),\n      bwd_data_algo_, work, bwd_data_workspace_, &zero, x_desc_.get(), grad_input_.data()));\n  return grad_input_;\n}\n\ntemplate <typename T>\nvoid Conv2d<T>::collect_parameters(const std::string& prefix, std::vector<NamedParam<T>>& out) {\n  out.push_back({prefix + \".weight\", &weight_});\n  if (bias_) out.push_back({prefix + \".bias\", &bias_});\n}\n\ntemplate class Conv2d<float>;\ntemplate class Conv2d<double>;\n\n}  // namespace resnet\n"
	},
	{
		group: "Layers",
		path: "src/batch_norm.cu",
		code: "#include \"resnet/batch_norm.hpp\"\n\n#include \"resnet/init.hpp\"\n\nnamespace resnet {\n\ntemplate <typename T>\nBatchNorm<T>::BatchNorm(CudnnContext& ctx, const BatchNormConfig& config)\n    : ctx_(&ctx), channels_(config.channels), eps_(config.eps), momentum_(config.momentum) {\n  if (channels_ <= 0) throw Error(\"BatchNorm channels must be positive\");\n  if (eps_ <= 0.0 || momentum_ < 0.0 || momentum_ > 1.0) throw Error(\"invalid BatchNorm config\");\n  const std::size_t c = static_cast<std::size_t>(channels_);\n  scale_ = Tensor<T>({channels_}, true);\n  bias_ = Tensor<T>({channels_}, true);\n  running_mean_ = Tensor<T>({channels_}, false);\n  running_var_ = Tensor<T>({channels_}, false);\n  saved_mean_ = Tensor<T>({channels_}, false);\n  saved_inv_var_ = Tensor<T>({channels_}, false);\n  scale_.from_host(constant_fill<T>(c, T(1)));\n  bias_.from_host(constant_fill<T>(c, T(0)));\n  running_mean_.from_host(constant_fill<T>(c, T(0)));\n  running_var_.from_host(constant_fill<T>(c, T(1)));\n}\n\ntemplate <typename T>\nvoid BatchNorm<T>::configure(const Tensor<T>& input) {\n  if (input.rank() != 4) throw Error(\"BatchNorm expects NCHW\");\n  if (input.dim(1) != channels_) throw Error(\"BatchNorm channel mismatch\");\n  const int n = input.dim(0);\n  const int h = input.dim(2);\n  const int w = input.dim(3);\n  if (n <= 0 || h <= 0 || w <= 0) throw Error(\"BatchNorm got an empty input\");\n  if (n == cached_n_ && h == cached_h_ && w == cached_w_) return;\n  RESNET_CUDNN_CHECK(cudnnSetTensor4dDescriptor(x_desc_.get(), CUDNN_TENSOR_NCHW, cudnn_dtype<T>(), n,\n                                                channels_, h, w));\n  RESNET_CUDNN_CHECK(cudnnDeriveBNTensorDescriptor(bn_desc_.get(), x_desc_.get(), CUDNN_BATCHNORM_SPATIAL));\n  output_.resize(input.shape());\n  grad_input_.resize(input.shape());\n  saved_input_.resize(input.shape());\n  cached_n_ = n;\n  cached_h_ = h;\n  cached_w_ = w;\n}\n\ntemplate <typename T>\nTensor<T>& BatchNorm<T>::forward(const Tensor<T>& input) {\n  configure(input);\n  saved_input_.copy_from_device(input.data());\n  const T one = T(1);\n  const T zero = T(0);\n  if (this->training()) {\n    RESNET_CUDNN_CHECK(cudnnBatchNormalizationForwardTraining(\n        ctx_->cudnn(), CUDNN_BATCHNORM_SPATIAL, &one, &zero, x_desc_.get(), saved_input_.data(), x_desc_.get(),\n        output_.data(), bn_desc_.get(), scale_.data(), bias_.data(), momentum_, running_mean_.data(),\n        running_var_.data(), eps_, saved_mean_.data(), saved_inv_var_.data()));\n  } else {\n    RESNET_CUDNN_CHECK(cudnnBatchNormalizationForwardInference(\n        ctx_->cudnn(), CUDNN_BATCHNORM_SPATIAL, &one, &zero, x_desc_.get(), saved_input_.data(), x_desc_.get(),\n        output_.data(), bn_desc_.get(), scale_.data(), bias_.data(), running_mean_.data(), running_var_.data(),\n        eps_));\n  }\n  return output_;\n}\n\ntemplate <typename T>\nTensor<T>& BatchNorm<T>::backward(const Tensor<T>& grad_out) {\n  if (!this->training()) throw Error(\"BatchNorm::backward requires train mode\");\n  if (cached_n_ < 0) throw Error(\"BatchNorm::backward called before forward\");\n  if (grad_out.numel() != output_.numel()) throw Error(\"BatchNorm gradient shape mismatch\");\n  const T one = T(1);\n  const T zero = T(0);\n  RESNET_CUDNN_CHECK(cudnnBatchNormalizationBackward(\n      ctx_->cudnn(), CUDNN_BATCHNORM_SPATIAL, &one, &zero, &one, &zero, x_desc_.get(), saved_input_.data(),\n      x_desc_.get(), grad_out.data(), x_desc_.get(), grad_input_.data(), bn_desc_.get(), scale_.data(),\n      scale_.grad(), bias_.grad(), eps_, saved_mean_.data(), saved_inv_var_.data()));\n  return grad_input_;\n}\n\ntemplate <typename T>\nvoid BatchNorm<T>::collect_parameters(const std::string& prefix, std::vector<NamedParam<T>>& out) {\n  out.push_back({prefix + \".weight\", &scale_});\n  out.push_back({prefix + \".bias\", &bias_});\n  out.push_back({prefix + \".running_mean\", &running_mean_});\n  out.push_back({prefix + \".running_var\", &running_var_});\n}\n\ntemplate class BatchNorm<float>;\ntemplate class BatchNorm<double>;\n\n}  // namespace resnet\n"
	},
	{
		group: "Layers",
		path: "src/activation.cu",
		code: "#include \"resnet/activation.hpp\"\n\n#include \"resnet/algorithms.hpp\"\n\n#include <thrust/execution_policy.h>\n\nnamespace resnet {\n\ntemplate <typename T>\nTensor<T>& ReLU<T>::forward(const Tensor<T>& input) {\n  if (input.numel() == 0) throw Error(\"ReLU got an empty tensor\");\n  saved_input_.resize(input.shape());\n  output_.resize(input.shape());\n  saved_input_.copy_from_device(input.data());\n  relu(thrust::device, saved_input_.data(), output_.data(), saved_input_.numel());\n  return output_;\n}\n\ntemplate <typename T>\nTensor<T>& ReLU<T>::backward(const Tensor<T>& grad_out) {\n  if (saved_input_.numel() == 0) throw Error(\"ReLU::backward called before forward\");\n  if (grad_out.numel() != saved_input_.numel()) throw Error(\"ReLU gradient shape mismatch\");\n  grad_input_.resize(saved_input_.shape());\n  relu_backward(thrust::device, saved_input_.data(), grad_out.data(), grad_input_.data(),\n                saved_input_.numel());\n  return grad_input_;\n}\n\ntemplate <typename T>\nvoid ReLU<T>::collect_parameters(const std::string&, std::vector<NamedParam<T>>&) {}\n\ntemplate class ReLU<float>;\ntemplate class ReLU<double>;\n\n}  // namespace resnet\n"
	},
	{
		group: "Layers",
		path: "src/pooling.cu",
		code: "#include \"resnet/pooling.hpp\"\n\n#include \"resnet/geometry.hpp\"\n\nnamespace resnet {\n\ntemplate <typename T>\nPool2d<T>::Pool2d(CudnnContext& ctx, PoolKind kind, int kernel, int stride, int pad)\n    : ctx_(&ctx), kind_(kind), kernel_(kernel), stride_(stride), pad_(pad) {\n  if (kind_ == PoolKind::Max && (kernel_ <= 0 || stride_ <= 0 || pad_ < 0)) {\n    throw Error(\"invalid max-pool config\");\n  }\n}\n\ntemplate <typename T>\nvoid Pool2d<T>::configure(const Tensor<T>& input) {\n  if (input.rank() != 4) throw Error(\"Pool2d expects NCHW\");\n  const int n = input.dim(0);\n  const int c = input.dim(1);\n  const int h = input.dim(2);\n  const int w = input.dim(3);\n  if (n <= 0 || c <= 0 || h <= 0 || w <= 0) throw Error(\"Pool2d got an empty input\");\n  if (n == cached_n_ && c == cached_c_ && h == cached_h_ && w == cached_w_) return;\n\n  int k_h = kernel_;\n  int k_w = kernel_;\n  int s_h = stride_;\n  int s_w = stride_;\n  int p_h = pad_;\n  int p_w = pad_;\n  cudnnPoolingMode_t mode = CUDNN_POOLING_MAX;\n  if (kind_ == PoolKind::GlobalAvg) {\n    k_h = h;\n    k_w = w;\n    s_h = 1;\n    s_w = 1;\n    p_h = 0;\n    p_w = 0;\n    mode = CUDNN_POOLING_AVERAGE_COUNT_EXCLUDE_PADDING;\n  }\n  const int expect_h = pool2d_out(h, k_h, s_h, p_h);\n  const int expect_w = pool2d_out(w, k_w, s_w, p_w);\n  if (expect_h <= 0 || expect_w <= 0) throw Error(\"pooling spatial size collapsed\");\n\n  RESNET_CUDNN_CHECK(cudnnSetPooling2dDescriptor(pool_desc_.get(), mode, CUDNN_NOT_PROPAGATE_NAN, k_h, k_w,\n                                                 p_h, p_w, s_h, s_w));\n  RESNET_CUDNN_CHECK(\n      cudnnSetTensor4dDescriptor(x_desc_.get(), CUDNN_TENSOR_NCHW, cudnn_dtype<T>(), n, c, h, w));\n  int on = 0, oc = 0, oh = 0, ow = 0;\n  RESNET_CUDNN_CHECK(\n      cudnnGetPooling2dForwardOutputDim(pool_desc_.get(), x_desc_.get(), &on, &oc, &oh, &ow));\n  if (on != n || oc != c || oh != expect_h || ow != expect_w) {\n    throw Error(\"cuDNN pooling size disagrees with pool2d_out\");\n  }\n  RESNET_CUDNN_CHECK(\n      cudnnSetTensor4dDescriptor(y_desc_.get(), CUDNN_TENSOR_NCHW, cudnn_dtype<T>(), on, oc, oh, ow));\n  output_.resize({on, oc, oh, ow});\n  grad_input_.resize(input.shape());\n  saved_input_.resize(input.shape());\n  cached_n_ = n;\n  cached_c_ = c;\n  cached_h_ = h;\n  cached_w_ = w;\n}\n\ntemplate <typename T>\nTensor<T>& Pool2d<T>::forward(const Tensor<T>& input) {\n  configure(input);\n  saved_input_.copy_from_device(input.data());\n  const T one = T(1);\n  const T zero = T(0);\n  RESNET_CUDNN_CHECK(cudnnPoolingForward(ctx_->cudnn(), pool_desc_.get(), &one, x_desc_.get(),\n                                         saved_input_.data(), &zero, y_desc_.get(), output_.data()));\n  return output_;\n}\n\ntemplate <typename T>\nTensor<T>& Pool2d<T>::backward(const Tensor<T>& grad_out) {\n  if (cached_n_ < 0) throw Error(\"Pool2d::backward called before forward\");\n  if (grad_out.numel() != output_.numel()) throw Error(\"Pool2d gradient shape mismatch\");\n  const T one = T(1);\n  const T zero = T(0);\n  RESNET_CUDNN_CHECK(cudnnPoolingBackward(ctx_->cudnn(), pool_desc_.get(), &one, y_desc_.get(), output_.data(),\n                                          y_desc_.get(), grad_out.data(), x_desc_.get(), saved_input_.data(),\n                                          &zero, x_desc_.get(), grad_input_.data()));\n  return grad_input_;\n}\n\ntemplate <typename T>\nvoid Pool2d<T>::collect_parameters(const std::string&, std::vector<NamedParam<T>>&) {}\n\ntemplate class Pool2d<float>;\ntemplate class Pool2d<double>;\n\n}  // namespace resnet\n"
	},
	{
		group: "Layers",
		path: "src/linear.cu",
		code: "#include \"resnet/linear.hpp\"\n\n#include \"resnet/algorithms.hpp\"\n#include \"resnet/check.hpp\"\n#include \"resnet/init.hpp\"\n\n#include <thrust/execution_policy.h>\n\nnamespace resnet {\nnamespace {\n\n// Row-major GEMM expressed with cuBLAS's column-major kernel.\n// Memory of a row-major (rows, cols) matrix is a column-major (cols, rows) matrix.\n//\n// Forward:  Y[n, m] = sum_k X[n, k] * W[m, k]\n//   Ycm(M, N) = Wcm(K, M)^T * Xcm(K, N)\n// Backward dX: dXcm(K, N) = Wcm(K, M) * dYcm(M, N)\n// Backward dW: dWcm(K, M) = Xcm(K, N) * dYcm(M, N)^T\n\ntemplate <typename T>\nvoid gemm(cublasHandle_t handle, cublasOperation_t trans_a, cublasOperation_t trans_b, int m, int n, int k,\n          const T* a, int lda, const T* b, int ldb, T* c, int ldc, T alpha, T beta);\n\ntemplate <>\nvoid gemm<float>(cublasHandle_t handle, cublasOperation_t trans_a, cublasOperation_t trans_b, int m, int n,\n                 int k, const float* a, int lda, const float* b, int ldb, float* c, int ldc, float alpha,\n                 float beta) {\n  RESNET_CUBLAS_CHECK(cublasSgemm(handle, trans_a, trans_b, m, n, k, &alpha, a, lda, b, ldb, &beta, c, ldc));\n}\n\ntemplate <>\nvoid gemm<double>(cublasHandle_t handle, cublasOperation_t trans_a, cublasOperation_t trans_b, int m, int n,\n                  int k, const double* a, int lda, const double* b, int ldb, double* c, int ldc, double alpha,\n                  double beta) {\n  RESNET_CUBLAS_CHECK(cublasDgemm(handle, trans_a, trans_b, m, n, k, &alpha, a, lda, b, ldb, &beta, c, ldc));\n}\n\ntemplate <typename T>\n__global__ void bias_grad_kernel(const T* grad, T* out, int batch, int width) {\n  const int m = static_cast<int>(blockIdx.x * blockDim.x + threadIdx.x);\n  if (m >= width) return;\n  T sum = 0;\n  for (int n = 0; n < batch; ++n) {\n    sum += grad[static_cast<std::size_t>(n) * static_cast<std::size_t>(width) + m];\n  }\n  out[m] = sum;\n}\n\n}  // namespace\n\ntemplate <typename T>\nLinear<T>::Linear(CudnnContext& ctx, const LinearConfig& config)\n    : ctx_(&ctx),\n      in_features_(config.in_features),\n      out_features_(config.out_features),\n      bias_(config.bias) {\n  if (in_features_ <= 0 || out_features_ <= 0) throw Error(\"invalid Linear config\");\n  const std::size_t wn = static_cast<std::size_t>(out_features_) * static_cast<std::size_t>(in_features_);\n  weight_ = Tensor<T>({out_features_, in_features_}, true);\n  weight_.from_host(he_normal<T>(wn, in_features_, config.seed));\n  if (bias_) {\n    bias_ = Tensor<T>({out_features_}, true);\n    bias_.from_host(constant_fill<T>(static_cast<std::size_t>(out_features_), T(0)));\n  }\n}\n\ntemplate <typename T>\nTensor<T>& Linear<T>::forward(const Tensor<T>& input) {\n  if (input.rank() < 2) throw Error(\"Linear expects rank >= 2 with batch at dim 0\");\n  int features = 1;\n  for (int i = 1; i < input.rank(); ++i) features *= input.dim(i);\n  if (features != in_features_) throw Error(\"Linear feature size mismatch\");\n  batch_ = input.dim(0);\n  if (batch_ <= 0) throw Error(\"Linear got an empty batch\");\n  input_shape_ = input.shape();\n  saved_input_.resize({batch_, in_features_});\n  output_.resize({batch_, out_features_});\n  saved_input_.copy_from_device(input.data());\n\n  const int n = batch_;\n  const int m = out_features_;\n  const int k = in_features_;\n  gemm<T>(ctx_->cublas(), CUBLAS_OP_T, CUBLAS_OP_N, m, n, k, weight_.data(), k, saved_input_.data(), k,\n          output_.data(), m, T(1), T(0));\n  if (bias_) bias_add(thrust::device, output_.data(), bias_.data(), n, m);\n  return output_;\n}\n\ntemplate <typename T>\nTensor<T>& Linear<T>::backward(const Tensor<T>& grad_out) {\n  if (batch_ < 0) throw Error(\"Linear::backward called before forward\");\n  if (grad_out.numel() != output_.numel()) throw Error(\"Linear gradient shape mismatch\");\n  const int n = batch_;\n  const int m = out_features_;\n  const int k = in_features_;\n  grad_input_.resize(input_shape_);\n  gemm<T>(ctx_->cublas(), CUBLAS_OP_N, CUBLAS_OP_N, k, n, m, weight_.data(), k, grad_out.data(), m,\n          grad_input_.data(), k, T(1), T(0));\n  gemm<T>(ctx_->cublas(), CUBLAS_OP_N, CUBLAS_OP_T, k, m, n, saved_input_.data(), k, grad_out.data(), m,\n          weight_.grad(), k, T(1), T(0));\n  if (bias_) {\n    const int threads = 128;\n    const int blocks = (m + threads - 1) / threads;\n    bias_grad_kernel<T><<<blocks, threads>>>(grad_out.data(), bias_.grad(), n, m);\n    RESNET_CUDA_CHECK(cudaGetLastError());\n  }\n  return grad_input_;\n}\n\ntemplate <typename T>\nvoid Linear<T>::collect_parameters(const std::string& prefix, std::vector<NamedParam<T>>& out) {\n  out.push_back({prefix + \".weight\", &weight_});\n  if (bias_) out.push_back({prefix + \".bias\", &bias_});\n}\n\ntemplate class Linear<float>;\ntemplate class Linear<double>;\n\n}  // namespace resnet\n"
	},
	{
		group: "Layers",
		path: "src/residual.cu",
		code: "#include \"resnet/residual.hpp\"\n\n#include \"resnet/algorithms.hpp\"\n#include \"resnet/init.hpp\"\n\n#include <thrust/execution_policy.h>\n\nnamespace resnet {\n\ntemplate <typename T>\nstd::uint64_t BasicBlock<T>::take(std::uint64_t& seed) {\n  const std::uint64_t value = seed;\n  seed = mix_seed(seed, 0xD1B54A32D192ED03ULL);\n  return value;\n}\n\ntemplate <typename T>\nBasicBlock<T>::BasicBlock(CudnnContext& ctx, int in_channels, int out_channels, int stride,\n                          std::uint64_t& seed)\n    : conv1_(ctx, Conv2dConfig{in_channels, out_channels, 3, stride, 1, false, take(seed)}),\n      bn1_(ctx, BatchNormConfig{out_channels}),\n      conv2_(ctx, Conv2dConfig{out_channels, out_channels, 3, 1, 1, false, take(seed)}),\n      bn2_(ctx, BatchNormConfig{out_channels}) {\n  if (stride != 1 || in_channels != out_channels) {\n    down_conv_ = std::make_unique<Conv2d<T>>(\n        ctx, Conv2dConfig{in_channels, out_channels, 1, stride, 0, false, take(seed)});\n    down_bn_ = std::make_unique<BatchNorm<T>>(ctx, BatchNormConfig{out_channels});\n  }\n}\n\ntemplate <typename T>\nvoid BasicBlock<T>::train(bool mode) {\n  Module<T>::train(mode);\n  conv1_.train(mode);\n  bn1_.train(mode);\n  conv2_.train(mode);\n  bn2_.train(mode);\n  if (down_conv_) down_conv_->train(mode);\n  if (down_bn_) down_bn_->train(mode);\n}\n\ntemplate <typename T>\nTensor<T>& BasicBlock<T>::forward(const Tensor<T>& input) {\n  input_shape_ = input.shape();\n  Tensor<T>& hidden = relu1_.forward(bn1_.forward(conv1_.forward(input)));\n  Tensor<T>& residual = bn2_.forward(conv2_.forward(hidden));\n  if (down_conv_) {\n    Tensor<T>& skip = down_bn_->forward(down_conv_->forward(input));\n    if (skip.numel() != residual.numel()) throw Error(\"residual branch sizes differ\");\n    sum_.resize(residual.shape());\n    add(thrust::device, residual.data(), skip.data(), sum_.data(), residual.numel());\n  } else {\n    if (input.numel() != residual.numel()) throw Error(\"identity shortcut shape mismatch\");\n    sum_.resize(residual.shape());\n    add(thrust::device, residual.data(), input.data(), sum_.data(), residual.numel());\n  }\n  return relu_out_.forward(sum_);\n}\n\ntemplate <typename T>\nTensor<T>& BasicBlock<T>::backward(const Tensor<T>& grad_out) {\n  relu_out_.backward(grad_out);\n  const Tensor<T>& grad_sum = relu_out_.grad_input();\n  bn2_.backward(grad_sum);\n  conv2_.backward(bn2_.grad_input());\n  relu1_.backward(conv2_.grad_input());\n  bn1_.backward(relu1_.grad_input());\n  conv1_.backward(bn1_.grad_input());\n  grad_input_.resize(input_shape_);\n  if (down_conv_) {\n    down_bn_->backward(grad_sum);\n    down_conv_->backward(down_bn_->grad_input());\n    add(thrust::device, conv1_.grad_input().data(), down_conv_->grad_input().data(), grad_input_.data(),\n        grad_input_.numel());\n  } else {\n    add(thrust::device, conv1_.grad_input().data(), grad_sum.data(), grad_input_.data(), grad_input_.numel());\n  }\n  return grad_input_;\n}\n\ntemplate <typename T>\nvoid BasicBlock<T>::collect_parameters(const std::string& prefix, std::vector<NamedParam<T>>& out) {\n  conv1_.collect_parameters(prefix + \".conv1\", out);\n  bn1_.collect_parameters(prefix + \".bn1\", out);\n  conv2_.collect_parameters(prefix + \".conv2\", out);\n  bn2_.collect_parameters(prefix + \".bn2\", out);\n  if (down_conv_) down_conv_->collect_parameters(prefix + \".downsample.0\", out);\n  if (down_bn_) down_bn_->collect_parameters(prefix + \".downsample.1\", out);\n}\n\ntemplate class BasicBlock<float>;\ntemplate class BasicBlock<double>;\n\n}  // namespace resnet\n"
	},
	{
		group: "Layers",
		path: "src/resnet.cu",
		code: "#include \"resnet/resnet.hpp\"\n\n#include \"resnet/init.hpp\"\n\n#include <string>\n\nnamespace resnet {\n\ntemplate <typename T>\nstd::string ResNet<T>::join(const std::string& prefix, const std::string& leaf) {\n  return prefix.empty() ? leaf : prefix + \".\" + leaf;\n}\n\ntemplate <typename T>\nResNet<T>::ResNet(CudnnContext& ctx, const ArchSpec& arch, int in_channels, int num_classes,\n                  std::uint64_t seed)\n    : ctx_(&ctx),\n      arch_(arch),\n      in_channels_(in_channels),\n      num_classes_(num_classes),\n      conv1_(ctx, Conv2dConfig{in_channels, arch.conv1_channels, arch.conv1_kernel, arch.conv1_stride,\n                               arch.conv1_pad, false, mix_seed(seed, 1)}),\n      bn1_(ctx, BatchNormConfig{arch.conv1_channels}),\n      gap_(ctx, PoolKind::GlobalAvg) {\n  if (in_channels <= 0 || num_classes <= 0) throw Error(\"ResNet channels and classes must be positive\");\n  if (arch.num_stages <= 0 || arch.num_stages > 4) throw Error(\"ResNet stage count must be 1..4\");\n  if (arch.max_pool) max_pool_ = std::make_unique<Pool2d<T>>(ctx, PoolKind::Max, 3, 2, 1);\n\n  std::uint64_t cursor = mix_seed(seed, 2);\n  int channels = arch.conv1_channels;\n  stages_.resize(static_cast<std::size_t>(arch.num_stages));\n  for (int s = 0; s < arch.num_stages; ++s) {\n    const BlockSpec& spec = arch.stages[s];\n    if (spec.blocks <= 0 || spec.channels <= 0 || spec.stride <= 0) throw Error(\"invalid ResNet stage\");\n    auto& stage = stages_[static_cast<std::size_t>(s)];\n    stage.reserve(static_cast<std::size_t>(spec.blocks));\n    for (int b = 0; b < spec.blocks; ++b) {\n      const int stride = b == 0 ? spec.stride : 1;\n      stage.push_back(std::make_unique<BasicBlock<T>>(ctx, channels, spec.channels, stride, cursor));\n      channels = spec.channels;\n    }\n  }\n  fc_in_ = channels;\n  fc_ = std::make_unique<Linear<T>>(ctx, LinearConfig{fc_in_, num_classes_, true, mix_seed(seed, 3)});\n}\n\ntemplate <typename T>\nvoid ResNet<T>::train(bool mode) {\n  Module<T>::train(mode);\n  conv1_.train(mode);\n  bn1_.train(mode);\n  if (max_pool_) max_pool_->train(mode);\n  for (auto& stage : stages_) {\n    for (auto& block : stage) block->train(mode);\n  }\n  fc_->train(mode);\n}\n\ntemplate <typename T>\nTensor<T>& ResNet<T>::forward(const Tensor<T>& input) {\n  if (input.rank() != 4) throw Error(\"ResNet expects NCHW images\");\n  if (input.dim(1) != in_channels_) throw Error(\"ResNet input channel mismatch\");\n  Tensor<T>* h = &relu_.forward(bn1_.forward(conv1_.forward(input)));\n  if (max_pool_) h = &max_pool_->forward(*h);\n  for (auto& stage : stages_) {\n    for (auto& block : stage) h = &block->forward(*h);\n  }\n  h = &gap_.forward(*h);\n  return fc_->forward(*h);\n}\n\ntemplate <typename T>\nTensor<T>& ResNet<T>::backward(const Tensor<T>& grad_logits) {\n  fc_->backward(grad_logits);\n  gap_.backward(fc_->grad_input());\n  const Tensor<T>* grad = &gap_.grad_input();\n  for (int s = static_cast<int>(stages_.size()) - 1; s >= 0; --s) {\n    auto& stage = stages_[static_cast<std::size_t>(s)];\n    for (int b = static_cast<int>(stage.size()) - 1; b >= 0; --b) {\n      stage[static_cast<std::size_t>(b)]->backward(*grad);\n      grad = &stage[static_cast<std::size_t>(b)]->grad_input();\n    }\n  }\n  if (max_pool_) {\n    max_pool_->backward(*grad);\n    grad = &max_pool_->grad_input();\n  }\n  relu_.backward(*grad);\n  bn1_.backward(relu_.grad_input());\n  conv1_.backward(bn1_.grad_input());\n  return conv1_.grad_input();\n}\n\ntemplate <typename T>\nvoid ResNet<T>::zero_grad() {\n  std::vector<NamedParam<T>> params;\n  collect_parameters(\"\", params);\n  for (NamedParam<T>& param : params) {\n    if (param.tensor->requires_grad()) param.tensor->zero_grad();\n  }\n}\n\ntemplate <typename T>\nvoid ResNet<T>::collect_parameters(const std::string& prefix, std::vector<NamedParam<T>>& out) {\n  conv1_.collect_parameters(join(prefix, \"conv1\"), out);\n  bn1_.collect_parameters(join(prefix, \"bn1\"), out);\n  for (int s = 0; s < static_cast<int>(stages_.size()); ++s) {\n    auto& stage = stages_[static_cast<std::size_t>(s)];\n    for (int b = 0; b < static_cast<int>(stage.size()); ++b) {\n      const std::string name = join(prefix, \"layer\" + std::to_string(s + 1) + \".\" + std::to_string(b));\n      stage[static_cast<std::size_t>(b)]->collect_parameters(name, out);\n    }\n  }\n  fc_->collect_parameters(join(prefix, \"fc\"), out);\n}\n\ntemplate <typename T>\nResNet<T> make_resnet(CudnnContext& ctx, const ArchSpec& arch, int in_channels, int num_classes,\n                      std::uint64_t seed) {\n  return ResNet<T>(ctx, arch, in_channels, num_classes, seed);\n}\n\ntemplate class ResNet<float>;\ntemplate class ResNet<double>;\ntemplate ResNet<float> make_resnet<float>(CudnnContext&, const ArchSpec&, int, int, std::uint64_t);\ntemplate ResNet<double> make_resnet<double>(CudnnContext&, const ArchSpec&, int, int, std::uint64_t);\n\n}  // namespace resnet\n"
	},
	{
		group: "Train",
		path: "include/resnet/loss.hpp",
		code: "#pragma once\n\n#include \"resnet/tensor.hpp\"\n\nnamespace resnet {\n\ntemplate <typename T>\nstruct LossWorkspace {\n  DeviceBuffer<T> per_example;\n  DeviceBuffer<int> counter;\n};\n\n// Device softmax cross-entropy. The per-row math is softmax_cross_entropy_row\n// from algorithms.hpp (the same function the host policy tests). Gradient is\n// the mean over the batch. Returns the mean NLL and synchronizes.\ntemplate <typename T>\nT softmax_cross_entropy_cuda(const T* logits, const int* labels, T* grad, int batch, int classes,\n                             LossWorkspace<T>& workspace);\n\ntemplate <typename T>\nint count_correct_cuda(const T* logits, const int* labels, int batch, int classes,\n                       LossWorkspace<T>& workspace);\n\n}  // namespace resnet\n"
	},
	{
		group: "Train",
		path: "include/resnet/optimizer.hpp",
		code: "#pragma once\n\n#include \"resnet/module.hpp\"\n\n#include <vector>\n\nnamespace resnet {\n\n// Classic ResNet optimizer: momentum SGD with L2 added into the gradient.\n// The element update is sgd_momentum_at, launched through Thrust.\ntemplate <typename T>\nclass SgdMomentum {\n public:\n  SgdMomentum(T learning_rate, T momentum, T weight_decay);\n  void set_lr(T learning_rate) { lr_ = learning_rate; }\n  T lr() const { return lr_; }\n  void step(const std::vector<NamedParam<T>>& params);\n\n private:\n  struct Slot {\n    Tensor<T>* key = nullptr;\n    Tensor<T> velocity;\n  };\n  Tensor<T>& velocity_for(Tensor<T>* param);\n  T lr_ = 0;\n  T momentum_ = 0;\n  T weight_decay_ = 0;\n  std::vector<Slot> slots_;\n};\n\n// AdamW. Moments and the parameter write are adamw_at, also through Thrust.\n// `step` is one global timestep shared by every parameter.\ntemplate <typename T>\nclass AdamW {\n public:\n  AdamW(T learning_rate, T weight_decay, T beta1 = T(0.9), T beta2 = T(0.999), T eps = T(1e-8));\n  void set_lr(T learning_rate) { lr_ = learning_rate; }\n  T lr() const { return lr_; }\n  void step(const std::vector<NamedParam<T>>& params);\n\n private:\n  struct Slot {\n    Tensor<T>* key = nullptr;\n    Tensor<T> first;\n    Tensor<T> second;\n  };\n  Slot& slot_for(Tensor<T>* param);\n  T lr_ = 0;\n  T weight_decay_ = 0;\n  T beta1_ = T(0.9);\n  T beta2_ = T(0.999);\n  T eps_ = T(1e-8);\n  int step_ = 0;\n  std::vector<Slot> slots_;\n};\n\n}  // namespace resnet\n"
	},
	{
		group: "Train",
		path: "include/resnet/checkpoint.hpp",
		code: "#pragma once\n\n#include \"resnet/module.hpp\"\n\n#include <string>\n\nnamespace resnet {\n\n// Writes every collected tensor, including batch-norm running stats.\n// Load matches by name and rejects missing names, extra names, and shape or\n// dtype mismatches. Optimizer velocity is not part of the file.\ntemplate <typename T>\nvoid save_module(const std::string& path, Module<T>& module);\n\ntemplate <typename T>\nvoid load_module(const std::string& path, Module<T>& module);\n\n}  // namespace resnet\n"
	},
	{
		group: "Train",
		path: "include/resnet/trainer.hpp",
		code: "#pragma once\n\n#include \"resnet/mnist.hpp\"\n#include \"resnet/resnet.hpp\"\n\n#include <cstdint>\n#include <string>\n#include <vector>\n\nnamespace resnet {\n\ntemplate <typename T>\nstruct TrainConfig {\n  int epochs = 5;\n  int batch_size = 128;\n  T lr = T(0.05);\n  T momentum = T(0.9);\n  T weight_decay = T(1e-4);\n  int log_interval = 20;\n  std::string checkpoint;  // overwritten whenever test accuracy improves, or at the end\n  std::uint64_t seed = 1;\n  bool adamw = false;\n};\n\ntemplate <typename T>\nstruct EpochStats {\n  int epoch = 0;\n  T mean_loss = 0;\n  T train_accuracy = 0;\n  T test_accuracy = -1;  // negative when no test split was passed\n  double seconds = 0;\n};\n\n// Full-batch-loop trainer. Images are NCHW with a single channel taken from\n// the split. Labels outside [0, num_classes) throw. The context and the model\n// are the caller's; this function does not own them.\ntemplate <typename T>\nstd::vector<EpochStats<T>> train_mnist(CudnnContext& ctx, ResNet<T>& model, const MnistSplit& train,\n                                       const MnistSplit* test, const TrainConfig<T>& config);\n\n}  // namespace resnet\n"
	},
	{
		group: "Train",
		path: "src/loss.cu",
		code: "#include \"resnet/loss.hpp\"\n\n#include \"resnet/algorithms.hpp\"\n#include \"resnet/check.hpp\"\n\n#include <thrust/execution_policy.h>\n#include <thrust/reduce.h>\n\nnamespace resnet {\nnamespace {\n\ntemplate <typename T>\n__global__ void cross_entropy_kernel(const T* logits, const int* labels, T* grad, T* per_example, int batch,\n                                     int classes) {\n  const int n = static_cast<int>(blockIdx.x * blockDim.x + threadIdx.x);\n  if (n >= batch) return;\n  T loss = 0;\n  const T inv_n = T(1) / static_cast<T>(batch);\n  T* grad_row = grad == nullptr ? nullptr : grad + static_cast<std::size_t>(n) * static_cast<std::size_t>(classes);\n  softmax_cross_entropy_row(logits + static_cast<std::size_t>(n) * static_cast<std::size_t>(classes), labels[n],\n                            classes, inv_n, loss, grad_row);\n  per_example[n] = loss;\n}\n\ntemplate <typename T>\n__global__ void accuracy_kernel(const T* logits, const int* labels, int* correct, int batch, int classes) {\n  const int n = static_cast<int>(blockIdx.x * blockDim.x + threadIdx.x);\n  if (n >= batch) return;\n  const int pred =\n      argmax_row(logits + static_cast<std::size_t>(n) * static_cast<std::size_t>(classes), classes);\n  if (pred == labels[n]) atomicAdd(correct, 1);\n}\n\n}  // namespace\n\ntemplate <typename T>\nT softmax_cross_entropy_cuda(const T* logits, const int* labels, T* grad, int batch, int classes,\n                             LossWorkspace<T>& workspace) {\n  if (batch <= 0 || classes <= 0) throw Error(\"cross-entropy batch and classes must be positive\");\n  workspace.per_example.resize(static_cast<std::size_t>(batch));\n  const int threads = 128;\n  const int blocks = (batch + threads - 1) / threads;\n  cross_entropy_kernel<T><<<blocks, threads>>>(logits, labels, grad, workspace.per_example.data(), batch, classes);\n  RESNET_CUDA_CHECK(cudaGetLastError());\n  const T sum = thrust::reduce(thrust::device, workspace.per_example.data(),\n                               workspace.per_example.data() + batch, T(0));\n  return sum / static_cast<T>(batch);\n}\n\ntemplate <typename T>\nint count_correct_cuda(const T* logits, const int* labels, int batch, int classes,\n                       LossWorkspace<T>& workspace) {\n  if (batch <= 0 || classes <= 0) throw Error(\"accuracy batch and classes must be positive\");\n  workspace.counter.resize(1);\n  workspace.counter.zero();\n  const int threads = 128;\n  const int blocks = (batch + threads - 1) / threads;\n  accuracy_kernel<T><<<blocks, threads>>>(logits, labels, workspace.counter.data(), batch, classes);\n  RESNET_CUDA_CHECK(cudaGetLastError());\n  int correct = 0;\n  workspace.counter.copy_to_host(&correct, 1);\n  return correct;\n}\n\ntemplate float softmax_cross_entropy_cuda<float>(const float*, const int*, float*, int, int,\n                                                 LossWorkspace<float>&);\ntemplate double softmax_cross_entropy_cuda<double>(const double*, const int*, double*, int, int,\n                                                   LossWorkspace<double>&);\ntemplate int count_correct_cuda<float>(const float*, const int*, int, int, LossWorkspace<float>&);\ntemplate int count_correct_cuda<double>(const double*, const int*, int, int, LossWorkspace<double>&);\n\n}  // namespace resnet\n"
	},
	{
		group: "Train",
		path: "src/optimizer.cu",
		code: "#include \"resnet/optimizer.hpp\"\n\n#include \"resnet/algorithms.hpp\"\n\n#include <cmath>\n#include <thrust/execution_policy.h>\n\nnamespace resnet {\n\ntemplate <typename T>\nSgdMomentum<T>::SgdMomentum(T learning_rate, T momentum, T weight_decay)\n    : lr_(learning_rate), momentum_(momentum), weight_decay_(weight_decay) {\n  if (lr_ < T(0)) throw Error(\"learning rate must be >= 0\");\n}\n\ntemplate <typename T>\nTensor<T>& SgdMomentum<T>::velocity_for(Tensor<T>* param) {\n  for (Slot& slot : slots_) {\n    if (slot.key == param) return slot.velocity;\n  }\n  Slot slot;\n  slot.key = param;\n  slot.velocity = Tensor<T>(param->shape(), false);\n  slot.velocity.zero_data();\n  slots_.push_back(std::move(slot));\n  return slots_.back().velocity;\n}\n\ntemplate <typename T>\nvoid SgdMomentum<T>::step(const std::vector<NamedParam<T>>& params) {\n  for (const NamedParam<T>& param : params) {\n    if (!param.tensor->requires_grad()) continue;\n    Tensor<T>& velocity = velocity_for(param.tensor);\n    if (velocity.numel() != param.tensor->numel()) {\n      velocity.resize(param.tensor->shape());\n      velocity.zero_data();\n    }\n    sgd_momentum(thrust::device, param.tensor->data(), param.tensor->grad(), velocity.data(),\n                 param.tensor->numel(), lr_, momentum_, weight_decay_);\n  }\n}\n\ntemplate <typename T>\nAdamW<T>::AdamW(T learning_rate, T weight_decay, T beta1, T beta2, T eps)\n    : lr_(learning_rate), weight_decay_(weight_decay), beta1_(beta1), beta2_(beta2), eps_(eps) {\n  if (lr_ < T(0) || eps_ <= T(0)) throw Error(\"invalid AdamW hyperparameters\");\n}\n\ntemplate <typename T>\ntypename AdamW<T>::Slot& AdamW<T>::slot_for(Tensor<T>* param) {\n  for (Slot& slot : slots_) {\n    if (slot.key == param) return slot;\n  }\n  Slot slot;\n  slot.key = param;\n  slot.first = Tensor<T>(param->shape(), false);\n  slot.second = Tensor<T>(param->shape(), false);\n  slot.first.zero_data();\n  slot.second.zero_data();\n  slots_.push_back(std::move(slot));\n  return slots_.back();\n}\n\ntemplate <typename T>\nvoid AdamW<T>::step(const std::vector<NamedParam<T>>& params) {\n  ++step_;\n  const T correct_1 = T(1) - static_cast<T>(std::pow(static_cast<double>(beta1_), step_));\n  const T correct_2 = T(1) - static_cast<T>(std::pow(static_cast<double>(beta2_), step_));\n  for (const NamedParam<T>& param : params) {\n    if (!param.tensor->requires_grad()) continue;\n    Slot& slot = slot_for(param.tensor);\n    adamw(thrust::device, param.tensor->data(), param.tensor->grad(), slot.first.data(), slot.second.data(),\n          param.tensor->numel(), lr_, beta1_, beta2_, eps_, weight_decay_, correct_1, correct_2);\n  }\n}\n\ntemplate class SgdMomentum<float>;\ntemplate class SgdMomentum<double>;\ntemplate class AdamW<float>;\ntemplate class AdamW<double>;\n\n}  // namespace resnet\n"
	},
	{
		group: "Train",
		path: "src/checkpoint.cu",
		code: "#include \"resnet/checkpoint.hpp\"\n\n#include \"resnet/serializer.hpp\"\n\n#include <utility>\n\nnamespace resnet {\n\ntemplate <typename T>\nvoid save_module(const std::string& path, Module<T>& module) {\n  std::vector<NamedParam<T>> params;\n  module.collect_parameters(\"\", params);\n  std::vector<TensorBlob> blobs;\n  blobs.reserve(params.size());\n  for (const NamedParam<T>& param : params) {\n    std::vector<int> shape = param.tensor->shape();\n    blobs.push_back(make_blob<T>(param.name, shape, param.tensor->to_host()));\n  }\n  save_checkpoint(path, blobs);\n}\n\ntemplate <typename T>\nvoid load_module(const std::string& path, Module<T>& module) {\n  std::vector<NamedParam<T>> params;\n  module.collect_parameters(\"\", params);\n  const std::vector<TensorBlob> blobs = load_checkpoint(path);\n  std::vector<char> used(blobs.size(), 0);\n  for (NamedParam<T>& param : params) {\n    const TensorBlob* match = nullptr;\n    for (std::size_t i = 0; i < blobs.size(); ++i) {\n      if (blobs[i].name == param.name) {\n        match = &blobs[i];\n        used[i] = 1;\n        break;\n      }\n    }\n    if (match == nullptr) throw Error(\"checkpoint is missing '\" + param.name + \"'\");\n    if (match->dtype != dtype_tag<T>()) throw Error(\"dtype mismatch for '\" + param.name + \"'\");\n    if (match->shape.size() != param.tensor->shape().size()) {\n      throw Error(\"rank mismatch for '\" + param.name + \"'\");\n    }\n    for (std::size_t d = 0; d < match->shape.size(); ++d) {\n      if (match->shape[d] != param.tensor->shape()[d]) {\n        throw Error(\"shape mismatch for '\" + param.name + \"'\");\n      }\n    }\n    param.tensor->from_host(blob_values<T>(*match));\n  }\n  for (std::size_t i = 0; i < blobs.size(); ++i) {\n    if (!used[i]) throw Error(\"checkpoint has unexpected tensor '\" + blobs[i].name + \"'\");\n  }\n}\n\ntemplate void save_module<float>(const std::string&, Module<float>&);\ntemplate void save_module<double>(const std::string&, Module<double>&);\ntemplate void load_module<float>(const std::string&, Module<float>&);\ntemplate void load_module<double>(const std::string&, Module<double>&);\n\n}  // namespace resnet\n"
	},
	{
		group: "Train",
		path: "src/trainer.cu",
		code: "#include \"resnet/trainer.hpp\"\n\n#include \"resnet/loss.hpp\"\n#include \"resnet/optimizer.hpp\"\n#include \"resnet/checkpoint.hpp\"\n\n#include <algorithm>\n#include <chrono>\n#include <iostream>\n#include <numeric>\n#include <random>\n#include <utility>\n\nnamespace resnet {\nnamespace {\n\ntemplate <typename T>\nT run_split(ResNet<T>& model, const MnistSplit& split, int batch_size, bool training, LossWorkspace<T>& loss_ws,\n            DeviceBuffer<int>& labels_d, Tensor<T>& images, SgdMomentum<T>* sgd, AdamW<T>* adam, T& mean_loss,\n            int log_interval, std::uint64_t seed, int epoch) {\n  std::vector<int> order(static_cast<std::size_t>(split.size()));\n  std::iota(order.begin(), order.end(), 0);\n  if (training) {\n    std::mt19937 rng(static_cast<std::uint32_t>(seed + static_cast<std::uint64_t>(epoch) * 9973u));\n    std::shuffle(order.begin(), order.end(), rng);\n    model.train(true);\n  } else {\n    model.eval();\n  }\n\n  const int classes = model.num_classes();\n  long long correct = 0;\n  long long seen = 0;\n  double loss_sum = 0;\n  int batches = 0;\n  int since_log = 0;\n  double window_loss = 0;\n  HostBatch host;\n  Tensor<T> grad;\n  std::vector<NamedParam<T>> params;\n  if (training) model.collect_parameters(\"\", params);\n\n  for (int begin = 0; begin < split.size(); begin += batch_size) {\n    const int batch = std::min(batch_size, split.size() - begin);\n    fill_batch(split, order, begin, batch, host);\n    for (int i = 0; i < batch; ++i) {\n      const int label = host.labels[static_cast<std::size_t>(i)];\n      if (label < 0 || label >= classes) {\n        throw Error(\"label \" + std::to_string(label) + \" outside 0..\" + std::to_string(classes - 1));\n      }\n    }\n    images.resize({batch, 1, split.rows, split.cols});\n    images.from_host(host.images);\n    labels_d.resize(static_cast<std::size_t>(batch));\n    labels_d.copy_from_host(host.labels.data(), static_cast<std::size_t>(batch));\n\n    Tensor<T>& logits = model.forward(images);\n    if (logits.rank() != 2 || logits.dim(0) != batch || logits.dim(1) != classes) {\n      throw Error(\"model logits are not [batch, classes]\");\n    }\n\n    T* grad_ptr = nullptr;\n    if (training) {\n      grad.resize({batch, classes});\n      grad_ptr = grad.data();\n    }\n    const T loss = softmax_cross_entropy_cuda<T>(logits.data(), labels_d.data(), grad_ptr, batch, classes, loss_ws);\n    const int hit = count_correct_cuda<T>(logits.data(), labels_d.data(), batch, classes, loss_ws);\n    correct += hit;\n    seen += batch;\n    loss_sum += static_cast<double>(loss);\n    ++batches;\n    window_loss += static_cast<double>(loss);\n    ++since_log;\n\n    if (training) {\n      model.zero_grad();\n      model.backward(grad);\n      if (adam != nullptr) adam->step(params);\n      else sgd->step(params);\n      if (log_interval > 0 && since_log >= log_interval) {\n        std::cout << \"  epoch \" << epoch << \"  step \" << (begin / batch_size + 1) << \"  loss \"\n                  << (window_loss / since_log) << \"  lr \" << (adam != nullptr ? adam->lr() : sgd->lr())\n                  << std::endl;\n        window_loss = 0;\n        since_log = 0;\n      }\n    }\n  }\n  mean_loss = batches == 0 ? T(0) : static_cast<T>(loss_sum / batches);\n  if (seen == 0) return T(0);\n  return static_cast<T>(static_cast<double>(correct) / static_cast<double>(seen));\n}\n\n}  // namespace\n\ntemplate <typename T>\nstd::vector<EpochStats<T>> train_mnist(CudnnContext&, ResNet<T>& model, const MnistSplit& train,\n                                       const MnistSplit* test, const TrainConfig<T>& config) {\n  if (train.size() <= 0) throw Error(\"training split is empty\");\n  if (config.epochs <= 0 || config.batch_size <= 0) throw Error(\"epochs and batch size must be positive\");\n  if (train.rows <= 0 || train.cols <= 0) throw Error(\"MNIST spatial size is invalid\");\n\n  SgdMomentum<T> sgd(config.lr, config.momentum, config.weight_decay);\n  AdamW<T> adam(config.lr, config.weight_decay);\n  SgdMomentum<T>* sgd_ptr = config.adamw ? nullptr : &sgd;\n  AdamW<T>* adam_ptr = config.adamw ? &adam : nullptr;\n\n  LossWorkspace<T> loss_ws;\n  DeviceBuffer<int> labels;\n  Tensor<T> images;\n  std::vector<EpochStats<T>> history;\n  history.reserve(static_cast<std::size_t>(config.epochs));\n  T best_accuracy = -1;\n  bool saved = false;\n\n  std::cout << \"train \" << train.size() << \"  test \" << (test != nullptr ? test->size() : 0) << \"  batch \"\n            << config.batch_size << \"  arch \" << model.spec().name << std::endl;\n\n  for (int epoch = 1; epoch <= config.epochs; ++epoch) {\n    if (config.epochs >= 4 && (epoch == config.epochs / 2 || epoch == (3 * config.epochs) / 4)) {\n      const T next = (adam_ptr != nullptr ? adam_ptr->lr() : sgd_ptr->lr()) * T(0.1);\n      if (adam_ptr != nullptr) adam_ptr->set_lr(next);\n      else sgd_ptr->set_lr(next);\n      std::cout << \"learning rate -> \" << next << std::endl;\n    }\n    const auto t0 = std::chrono::steady_clock::now();\n    T train_loss = 0;\n    const T train_acc = run_split<T>(model, train, config.batch_size, true, loss_ws, labels, images, sgd_ptr,\n                                     adam_ptr, train_loss, config.log_interval, config.seed, epoch);\n    T test_acc = -1;\n    if (test != nullptr && test->size() > 0) {\n      T ignored = 0;\n      test_acc = run_split<T>(model, *test, config.batch_size, false, loss_ws, labels, images, nullptr, nullptr,\n                              ignored, 0, config.seed, epoch);\n      model.train(true);\n    }\n    const double seconds = std::chrono::duration<double>(std::chrono::steady_clock::now() - t0).count();\n    std::cout << \"epoch \" << epoch << \"/\" << config.epochs << \"  loss \" << train_loss << \"  train_acc \"\n              << train_acc;\n    if (test_acc >= T(0)) std::cout << \"  test_acc \" << test_acc;\n    std::cout << \"  \" << seconds << \"s\" << std::endl;\n\n    EpochStats<T> stats;\n    stats.epoch = epoch;\n    stats.mean_loss = train_loss;\n    stats.train_accuracy = train_acc;\n    stats.test_accuracy = test_acc;\n    stats.seconds = seconds;\n    history.push_back(stats);\n\n    const bool improved = test_acc >= T(0) && test_acc >= best_accuracy;\n    const bool last = epoch == config.epochs;\n    if (!config.checkpoint.empty() && (improved || (test == nullptr && last) || (test_acc < T(0) && last))) {\n      if (improved) best_accuracy = test_acc;\n      save_module<T>(config.checkpoint, model);\n      saved = true;\n      std::cout << \"wrote \" << config.checkpoint << std::endl;\n    }\n  }\n  (void)saved;\n  return history;\n}\n\ntemplate std::vector<EpochStats<float>> train_mnist<float>(CudnnContext&, ResNet<float>&, const MnistSplit&,\n                                                           const MnistSplit*, const TrainConfig<float>&);\ntemplate std::vector<EpochStats<double>> train_mnist<double>(CudnnContext&, ResNet<double>&, const MnistSplit&,\n                                                             const MnistSplit*, const TrainConfig<double>&);\n\n}  // namespace resnet\n"
	},
	{
		group: "Train",
		path: "src/tensor.cu",
		code: "#include \"resnet/tensor.hpp\"\n\n#include \"resnet/check.hpp\"\n\n#include <utility>\n\nnamespace resnet {\n\ntemplate <typename T>\nDeviceBuffer<T>::DeviceBuffer(std::size_t n) {\n  resize(n);\n}\n\ntemplate <typename T>\nDeviceBuffer<T>::~DeviceBuffer() {\n  if (data_ != nullptr) cudaFree(data_);\n}\n\ntemplate <typename T>\nDeviceBuffer<T>::DeviceBuffer(DeviceBuffer&& other) noexcept\n    : data_(other.data_), size_(other.size_), cap_(other.cap_) {\n  other.data_ = nullptr;\n  other.size_ = 0;\n  other.cap_ = 0;\n}\n\ntemplate <typename T>\nDeviceBuffer<T>& DeviceBuffer<T>::operator=(DeviceBuffer&& other) noexcept {\n  if (this != &other) {\n    if (data_ != nullptr) cudaFree(data_);\n    data_ = other.data_;\n    size_ = other.size_;\n    cap_ = other.cap_;\n    other.data_ = nullptr;\n    other.size_ = 0;\n    other.cap_ = 0;\n  }\n  return *this;\n}\n\ntemplate <typename T>\nvoid DeviceBuffer<T>::resize(std::size_t n) {\n  if (n > cap_) {\n    T* fresh = nullptr;\n    if (n != 0) RESNET_CUDA_CHECK(cudaMalloc(reinterpret_cast<void**>(&fresh), n * sizeof(T)));\n    if (data_ != nullptr) cudaFree(data_);\n    data_ = fresh;\n    cap_ = n;\n  }\n  size_ = n;\n}\n\ntemplate <typename T>\nvoid DeviceBuffer<T>::copy_from_host(const T* src, std::size_t n) {\n  if (n != size_) throw Error(\"host-to-device copy size does not match buffer\");\n  if (n == 0) return;\n  RESNET_CUDA_CHECK(cudaMemcpy(data_, src, n * sizeof(T), cudaMemcpyHostToDevice));\n}\n\ntemplate <typename T>\nvoid DeviceBuffer<T>::copy_to_host(T* dst, std::size_t n) const {\n  if (n != size_) throw Error(\"device-to-host copy size does not match buffer\");\n  if (n == 0) return;\n  RESNET_CUDA_CHECK(cudaMemcpy(dst, data_, n * sizeof(T), cudaMemcpyDeviceToHost));\n}\n\ntemplate <typename T>\nvoid DeviceBuffer<T>::copy_from_device(const T* src, std::size_t n) {\n  if (n != size_) throw Error(\"device copy size does not match buffer\");\n  if (n == 0) return;\n  RESNET_CUDA_CHECK(cudaMemcpy(data_, src, n * sizeof(T), cudaMemcpyDeviceToDevice));\n}\n\ntemplate <typename T>\nvoid DeviceBuffer<T>::zero() {\n  if (size_ == 0) return;\n  RESNET_CUDA_CHECK(cudaMemset(data_, 0, size_ * sizeof(T)));\n}\n\ntemplate <typename T>\nTensor<T>::Tensor(std::vector<int> shape, bool requires_grad) : requires_grad_(requires_grad) {\n  resize(shape);\n}\n\ntemplate <typename T>\nTensor<T>::~Tensor() = default;\n\ntemplate <typename T>\nTensor<T>::Tensor(Tensor&& other) noexcept\n    : shape_(std::move(other.shape_)),\n      numel_(other.numel_),\n      requires_grad_(other.requires_grad_),\n      data_(std::move(other.data_)),\n      grad_(std::move(other.grad_)) {\n  other.numel_ = 0;\n  other.requires_grad_ = false;\n}\n\ntemplate <typename T>\nTensor<T>& Tensor<T>::operator=(Tensor&& other) noexcept {\n  if (this != &other) {\n    shape_ = std::move(other.shape_);\n    numel_ = other.numel_;\n    requires_grad_ = other.requires_grad_;\n    data_ = std::move(other.data_);\n    grad_ = std::move(other.grad_);\n    other.numel_ = 0;\n    other.requires_grad_ = false;\n  }\n  return *this;\n}\n\ntemplate <typename T>\nvoid Tensor<T>::resize(const std::vector<int>& shape) {\n  shape_ = shape;\n  numel_ = checked_numel(shape_);\n  data_.resize(numel_);\n  if (grad_.size() != 0 && grad_.size() != numel_) {\n    grad_.resize(numel_);\n    grad_.zero();\n  }\n}\n\ntemplate <typename T>\nint Tensor<T>::dim(int index) const {\n  if (index < 0 || index >= rank()) throw Error(\"tensor dimension index out of range\");\n  return shape_[static_cast<std::size_t>(index)];\n}\n\ntemplate <typename T>\nT* Tensor<T>::grad() {\n  if (!requires_grad_) throw Error(\"grad() called on a tensor that does not require grad\");\n  if (grad_.size() != numel_) {\n    grad_.resize(numel_);\n    grad_.zero();\n  }\n  return grad_.data();\n}\n\ntemplate <typename T>\nconst T* Tensor<T>::grad() const {\n  if (!requires_grad_ || grad_.size() != numel_) throw Error(\"gradient buffer is not allocated\");\n  return grad_.data();\n}\n\ntemplate <typename T>\nvoid Tensor<T>::zero_grad() {\n  if (!requires_grad_) return;\n  if (grad_.size() != numel_) grad_.resize(numel_);\n  grad_.zero();\n}\n\ntemplate <typename T>\nvoid Tensor<T>::zero_data() {\n  data_.zero();\n}\n\ntemplate <typename T>\nstd::vector<T> Tensor<T>::to_host() const {\n  std::vector<T> host(numel_);\n  data_.copy_to_host(host.data(), numel_);\n  return host;\n}\n\ntemplate <typename T>\nvoid Tensor<T>::from_host(const std::vector<T>& values) {\n  if (values.size() != numel_) throw Error(\"from_host size does not match tensor\");\n  data_.copy_from_host(values.data(), values.size());\n}\n\ntemplate <typename T>\nvoid Tensor<T>::copy_from_device(const T* src) {\n  data_.copy_from_device(src, numel_);\n}\n\ntemplate class DeviceBuffer<float>;\ntemplate class DeviceBuffer<double>;\ntemplate class DeviceBuffer<int>;\ntemplate class Tensor<float>;\ntemplate class Tensor<double>;\n\n}  // namespace resnet\n"
	},
	{
		group: "Train",
		path: "src/context.cu",
		code: "#include \"resnet/context.hpp\"\n\n#include \"resnet/check.hpp\"\n\nnamespace resnet {\n\nCudnnContext::CudnnContext() {\n  RESNET_CUDNN_CHECK(cudnnCreate(&cudnn_));\n  RESNET_CUBLAS_CHECK(cublasCreate(&cublas_));\n  RESNET_CUBLAS_CHECK(cublasSetMathMode(cublas_, CUBLAS_DEFAULT_MATH));\n}\n\nCudnnContext::~CudnnContext() {\n  if (workspace_ != nullptr) cudaFree(workspace_);\n  if (cublas_ != nullptr) cublasDestroy(cublas_);\n  if (cudnn_ != nullptr) cudnnDestroy(cudnn_);\n}\n\nvoid* CudnnContext::workspace(std::size_t bytes) {\n  if (bytes <= workspace_cap_) return workspace_;\n  if (workspace_ != nullptr) {\n    cudaFree(workspace_);\n    workspace_ = nullptr;\n    workspace_cap_ = 0;\n  }\n  if (bytes == 0) return nullptr;\n  RESNET_CUDA_CHECK(cudaMalloc(&workspace_, bytes));\n  workspace_cap_ = bytes;\n  return workspace_;\n}\n\n}  // namespace resnet\n"
	},
	{
		group: "Train",
		path: "src/serializer.cpp",
		code: "#include \"resnet/serializer.hpp\"\n\n#include <fstream>\n#include <limits>\n\nnamespace resnet {\nnamespace {\n\nconstexpr char kMagic[8] = {'R', 'E', 'S', 'N', 'E', 'T', '0', '1'};\nconstexpr std::uint32_t kVersion = 1;\n\nvoid write_bytes(std::ostream& out, const void* data, std::size_t n) {\n  out.write(static_cast<const char*>(data), static_cast<std::streamsize>(n));\n  if (!out) throw Error(\"failed to write checkpoint\");\n}\n\nvoid read_bytes(std::istream& in, void* data, std::size_t n) {\n  in.read(static_cast<char*>(data), static_cast<std::streamsize>(n));\n  if (!in) throw Error(\"checkpoint ended early\");\n}\n\nvoid write_u32(std::ostream& out, std::uint32_t v) {\n  unsigned char b[4] = {static_cast<unsigned char>(v & 0xffu),\n                        static_cast<unsigned char>((v >> 8) & 0xffu),\n                        static_cast<unsigned char>((v >> 16) & 0xffu),\n                        static_cast<unsigned char>((v >> 24) & 0xffu)};\n  write_bytes(out, b, 4);\n}\n\nvoid write_u64(std::ostream& out, std::uint64_t v) {\n  unsigned char b[8];\n  for (int i = 0; i < 8; ++i) b[i] = static_cast<unsigned char>((v >> (8 * i)) & 0xffu);\n  write_bytes(out, b, 8);\n}\n\nvoid write_i32(std::ostream& out, std::int32_t v) {\n  write_u32(out, static_cast<std::uint32_t>(v));\n}\n\nstd::uint32_t read_u32(std::istream& in) {\n  unsigned char b[4];\n  read_bytes(in, b, 4);\n  return static_cast<std::uint32_t>(b[0]) | (static_cast<std::uint32_t>(b[1]) << 8) |\n         (static_cast<std::uint32_t>(b[2]) << 16) | (static_cast<std::uint32_t>(b[3]) << 24);\n}\n\nstd::uint64_t read_u64(std::istream& in) {\n  unsigned char b[8];\n  read_bytes(in, b, 8);\n  std::uint64_t v = 0;\n  for (int i = 0; i < 8; ++i) v |= static_cast<std::uint64_t>(b[i]) << (8 * i);\n  return v;\n}\n\nstd::int32_t read_i32(std::istream& in) { return static_cast<std::int32_t>(read_u32(in)); }\n\nstd::size_t product(const std::vector<std::int32_t>& shape) {\n  std::size_t n = 1;\n  for (std::int32_t dim : shape) {\n    if (dim < 0) throw Error(\"negative dimension in checkpoint\");\n    if (dim != 0 && n > std::numeric_limits<std::size_t>::max() / static_cast<std::size_t>(dim)) {\n      throw Error(\"shape overflow in checkpoint\");\n    }\n    n *= static_cast<std::size_t>(dim);\n  }\n  if (shape.empty()) return 0;\n  return n;\n}\n\n}  // namespace\n\nvoid save_checkpoint(const std::string& path, const std::vector<TensorBlob>& tensors) {\n  std::ofstream out(path, std::ios::binary);\n  if (!out) throw Error(\"cannot open '\" + path + \"' for writing\");\n  write_bytes(out, kMagic, 8);\n  write_u32(out, kVersion);\n  write_u32(out, 0);\n  if (tensors.size() > std::numeric_limits<std::uint32_t>::max()) {\n    throw Error(\"too many tensors to checkpoint\");\n  }\n  write_u32(out, static_cast<std::uint32_t>(tensors.size()));\n  for (const TensorBlob& blob : tensors) {\n    if (blob.name.size() > std::numeric_limits<std::uint32_t>::max()) {\n      throw Error(\"tensor name too long\");\n    }\n    write_u32(out, static_cast<std::uint32_t>(blob.name.size()));\n    write_bytes(out, blob.name.data(), blob.name.size());\n    if (blob.shape.size() > std::numeric_limits<std::uint32_t>::max()) {\n      throw Error(\"rank too high for '\" + blob.name + \"'\");\n    }\n    write_u32(out, static_cast<std::uint32_t>(blob.shape.size()));\n    for (std::int32_t dim : blob.shape) write_i32(out, dim);\n    const std::size_t numel = product(blob.shape);\n    const std::size_t width = blob.dtype == DType::Float64 ? 8u : 4u;\n    if (blob.dtype != DType::Float32 && blob.dtype != DType::Float64) {\n      throw Error(\"unknown dtype for '\" + blob.name + \"'\");\n    }\n    if (blob.bytes.size() != numel * width) {\n      throw Error(\"payload size does not match shape for '\" + blob.name + \"'\");\n    }\n    write_u64(out, static_cast<std::uint64_t>(numel));\n    write_u32(out, static_cast<std::uint32_t>(blob.dtype));\n    write_bytes(out, blob.bytes.data(), blob.bytes.size());\n  }\n}\n\nstd::vector<TensorBlob> load_checkpoint(const std::string& path) {\n  std::ifstream in(path, std::ios::binary);\n  if (!in) throw Error(\"cannot open '\" + path + \"'\");\n  char magic[8];\n  read_bytes(in, magic, 8);\n  for (int i = 0; i < 8; ++i) {\n    if (magic[i] != kMagic[i]) throw Error(\"not a RESNET01 checkpoint: \" + path);\n  }\n  const std::uint32_t version = read_u32(in);\n  if (version != kVersion) throw Error(\"unsupported checkpoint version \" + std::to_string(version));\n  (void)read_u32(in);  // flags\n  const std::uint32_t count = read_u32(in);\n  std::vector<TensorBlob> tensors;\n  tensors.reserve(count);\n  for (std::uint32_t i = 0; i < count; ++i) {\n    TensorBlob blob;\n    const std::uint32_t name_len = read_u32(in);\n    blob.name.resize(name_len);\n    if (name_len) read_bytes(in, blob.name.data(), name_len);\n    const std::uint32_t rank = read_u32(in);\n    blob.shape.resize(rank);\n    for (std::uint32_t d = 0; d < rank; ++d) blob.shape[d] = read_i32(in);\n    const std::uint64_t numel = read_u64(in);\n    if (product(blob.shape) != static_cast<std::size_t>(numel)) {\n      throw Error(\"numel does not match shape for '\" + blob.name + \"'\");\n    }\n    const std::uint32_t dtype = read_u32(in);\n    if (dtype == static_cast<std::uint32_t>(DType::Float32)) blob.dtype = DType::Float32;\n    else if (dtype == static_cast<std::uint32_t>(DType::Float64)) blob.dtype = DType::Float64;\n    else throw Error(\"unknown dtype code in checkpoint\");\n    const std::size_t width = blob.dtype == DType::Float64 ? 8u : 4u;\n    blob.bytes.resize(static_cast<std::size_t>(numel) * width);\n    if (!blob.bytes.empty()) read_bytes(in, blob.bytes.data(), blob.bytes.size());\n    tensors.push_back(std::move(blob));\n  }\n  return tensors;\n}\n\n}  // namespace resnet\n"
	},
	{
		group: "Train",
		path: "src/mnist.cpp",
		code: "#include \"resnet/mnist.hpp\"\n\n#include \"resnet/error.hpp\"\n#include \"resnet/init.hpp\"\n\n#include <fstream>\n\nnamespace resnet {\nnamespace {\n\nstd::uint32_t read_be_u32(std::istream& in) {\n  unsigned char b[4];\n  in.read(reinterpret_cast<char*>(b), 4);\n  if (!in) throw Error(\"IDX file ended early\");\n  return (std::uint32_t{b[0]} << 24) | (std::uint32_t{b[1]} << 16) | (std::uint32_t{b[2]} << 8) |\n         std::uint32_t{b[3]};\n}\n\nvoid put_pixel(std::uint8_t* img, int rows, int cols, int r, int c) {\n  if (r < 0 || c < 0 || r >= rows || c >= cols) return;\n  img[r * cols + c] = 255;\n}\n\nvoid hline(std::uint8_t* img, int rows, int cols, int r, int c0, int c1, int oy, int ox) {\n  if (c1 < c0) {\n    const int t = c0;\n    c0 = c1;\n    c1 = t;\n  }\n  for (int c = c0; c <= c1; ++c) put_pixel(img, rows, cols, r + oy, c + ox);\n}\n\nvoid vline(std::uint8_t* img, int rows, int cols, int c, int r0, int r1, int oy, int ox) {\n  if (r1 < r0) {\n    const int t = r0;\n    r0 = r1;\n    r1 = t;\n  }\n  for (int r = r0; r <= r1; ++r) put_pixel(img, rows, cols, r + oy, c + ox);\n}\n\nvoid paint_digit(std::uint8_t* img, int rows, int cols, int label, int ox, int oy) {\n  const int top = 4;\n  const int bot = rows - 5;\n  const int left = 6;\n  const int right = cols - 7;\n  const int mid = (top + bot) / 2;\n  const int cx = (left + right) / 2;\n  switch (label) {\n    case 0:\n      hline(img, rows, cols, top, left, right, oy, ox);\n      hline(img, rows, cols, bot, left, right, oy, ox);\n      vline(img, rows, cols, left, top, bot, oy, ox);\n      vline(img, rows, cols, right, top, bot, oy, ox);\n      break;\n    case 1:\n      vline(img, rows, cols, cx, top, bot, oy, ox);\n      hline(img, rows, cols, top, cx - 3, cx, oy, ox);\n      hline(img, rows, cols, bot, cx - 4, cx + 4, oy, ox);\n      break;\n    case 2:\n      hline(img, rows, cols, top, left, right, oy, ox);\n      hline(img, rows, cols, mid, left, right, oy, ox);\n      hline(img, rows, cols, bot, left, right, oy, ox);\n      vline(img, rows, cols, right, top, mid, oy, ox);\n      vline(img, rows, cols, left, mid, bot, oy, ox);\n      break;\n    case 3:\n      hline(img, rows, cols, top, left, right, oy, ox);\n      hline(img, rows, cols, mid, left, right, oy, ox);\n      hline(img, rows, cols, bot, left, right, oy, ox);\n      vline(img, rows, cols, right, top, bot, oy, ox);\n      break;\n    case 4:\n      vline(img, rows, cols, left, top, mid, oy, ox);\n      vline(img, rows, cols, right, top, bot, oy, ox);\n      hline(img, rows, cols, mid, left, right, oy, ox);\n      break;\n    case 5:\n      hline(img, rows, cols, top, left, right, oy, ox);\n      hline(img, rows, cols, mid, left, right, oy, ox);\n      hline(img, rows, cols, bot, left, right, oy, ox);\n      vline(img, rows, cols, left, top, mid, oy, ox);\n      vline(img, rows, cols, right, mid, bot, oy, ox);\n      break;\n    case 6:\n      hline(img, rows, cols, top, left, right, oy, ox);\n      hline(img, rows, cols, mid, left, right, oy, ox);\n      hline(img, rows, cols, bot, left, right, oy, ox);\n      vline(img, rows, cols, left, top, bot, oy, ox);\n      vline(img, rows, cols, right, mid, bot, oy, ox);\n      break;\n    case 7:\n      hline(img, rows, cols, top, left, right, oy, ox);\n      vline(img, rows, cols, right, top, bot, oy, ox);\n      break;\n    case 8:\n      hline(img, rows, cols, top, left, right, oy, ox);\n      hline(img, rows, cols, mid, left, right, oy, ox);\n      hline(img, rows, cols, bot, left, right, oy, ox);\n      vline(img, rows, cols, left, top, bot, oy, ox);\n      vline(img, rows, cols, right, top, bot, oy, ox);\n      break;\n    default:\n      hline(img, rows, cols, top, left, right, oy, ox);\n      hline(img, rows, cols, mid, left, right, oy, ox);\n      hline(img, rows, cols, bot, left, right, oy, ox);\n      vline(img, rows, cols, left, top, mid, oy, ox);\n      vline(img, rows, cols, right, top, bot, oy, ox);\n      break;\n  }\n}\n\n}  // namespace\n\nMnistSplit load_mnist_split(const std::string& images_path, const std::string& labels_path) {\n  std::ifstream images(images_path, std::ios::binary);\n  if (!images) throw Error(\"cannot open images '\" + images_path + \"'\");\n  std::ifstream labels(labels_path, std::ios::binary);\n  if (!labels) throw Error(\"cannot open labels '\" + labels_path + \"'\");\n\n  const std::uint32_t image_magic = read_be_u32(images);\n  if (image_magic != 2051u) throw Error(\"bad image magic in '\" + images_path + \"' (expected 2051)\");\n  const std::uint32_t image_count = read_be_u32(images);\n  const std::uint32_t rows = read_be_u32(images);\n  const std::uint32_t cols = read_be_u32(images);\n  if (rows == 0 || cols == 0 || rows > 4096u || cols > 4096u) {\n    throw Error(\"implausible IDX spatial size\");\n  }\n\n  const std::uint32_t label_magic = read_be_u32(labels);\n  if (label_magic != 2049u) throw Error(\"bad label magic in '\" + labels_path + \"' (expected 2049)\");\n  const std::uint32_t label_count = read_be_u32(labels);\n  if (label_count != image_count) throw Error(\"image/label count mismatch\");\n\n  MnistSplit split;\n  split.rows = static_cast<int>(rows);\n  split.cols = static_cast<int>(cols);\n  const std::size_t pixels =\n      static_cast<std::size_t>(image_count) * static_cast<std::size_t>(rows) * cols;\n  split.images.resize(pixels);\n  split.labels.resize(label_count);\n  images.read(reinterpret_cast<char*>(split.images.data()), static_cast<std::streamsize>(pixels));\n  if (!images) throw Error(\"truncated image payload in '\" + images_path + \"'\");\n  labels.read(reinterpret_cast<char*>(split.labels.data()), static_cast<std::streamsize>(label_count));\n  if (!labels) throw Error(\"truncated label payload in '\" + labels_path + \"'\");\n  return split;\n}\n\nMnistSplit make_synthetic_digits(int count, std::uint32_t seed) {\n  if (count < 0) throw Error(\"synthetic count must be >= 0\");\n  MnistSplit split;\n  split.rows = 28;\n  split.cols = 28;\n  split.images.assign(static_cast<std::size_t>(count) * 28u * 28u, 0);\n  split.labels.resize(static_cast<std::size_t>(count));\n  SplitMix64 rng(seed);\n  for (int i = 0; i < count; ++i) {\n    const int label = static_cast<int>(rng.next() % 10u);\n    const int ox = static_cast<int>(rng.next() % 5u) - 2;\n    const int oy = static_cast<int>(rng.next() % 5u) - 2;\n    split.labels[static_cast<std::size_t>(i)] = static_cast<std::uint8_t>(label);\n    paint_digit(split.images.data() + static_cast<std::size_t>(i) * 28u * 28u, 28, 28, label, ox, oy);\n  }\n  return split;\n}\n\nvoid fill_batch(const MnistSplit& data, const std::vector<int>& indices, int begin, int batch,\n                HostBatch& out, float mean, float stddev) {\n  if (batch < 0 || begin < 0) throw Error(\"bad batch range\");\n  if (static_cast<std::size_t>(begin) + static_cast<std::size_t>(batch) > indices.size()) {\n    throw Error(\"batch range exceeds index list\");\n  }\n  if (stddev == 0.f) throw Error(\"stddev must be non-zero\");\n  const int pixels = data.rows * data.cols;\n  out.images.resize(static_cast<std::size_t>(batch) * static_cast<std::size_t>(pixels));\n  out.labels.resize(static_cast<std::size_t>(batch));\n  for (int i = 0; i < batch; ++i) {\n    const int index = indices[static_cast<std::size_t>(begin + i)];\n    if (index < 0 || index >= data.size()) throw Error(\"example index out of range\");\n    const std::uint8_t* src = data.image(index);\n    float* dst = out.images.data() + static_cast<std::size_t>(i) * static_cast<std::size_t>(pixels);\n    for (int p = 0; p < pixels; ++p) {\n      const float x = static_cast<float>(src[p]) / 255.f;\n      dst[p] = (x - mean) / stddev;\n    }\n    out.labels[static_cast<std::size_t>(i)] = static_cast<int>(data.labels[static_cast<std::size_t>(index)]);\n  }\n}\n\n}  // namespace resnet\n"
	},
	{
		group: "Train",
		path: "examples/mnist_train.cu",
		code: "#include \"resnet/all.hpp\"\n\n#include <cstdint>\n#include <iostream>\n#include <string>\n\nnamespace {\n\nvoid usage() {\n  std::cerr\n      << \"mnist_train --data DIR | --synthetic N [options]\\n\"\n      << \"  --data DIR          uncompressed IDX directory\\n\"\n      << \"  --synthetic N       class-conditional digits instead of IDX files\\n\"\n      << \"  --arch mnist|resnet18\\n\"\n      << \"  --epochs N          default 5\\n\"\n      << \"  --batch N           default 128\\n\"\n      << \"  --lr F              default 0.05 (SGD) \\n\"\n      << \"  --momentum F        default 0.9\\n\"\n      << \"  --weight-decay F    default 1e-4\\n\"\n      << \"  --adamw             AdamW instead of momentum SGD\\n\"\n      << \"  --seed N            default 1\\n\"\n      << \"  --checkpoint PATH   write the best (or final) weights\\n\"\n      << \"  --resume PATH       load a checkpoint before training\\n\";\n}\n\nbool take(int& i, int argc, char** argv, std::string& out) {\n  if (i + 1 >= argc) return false;\n  out = argv[++i];\n  return true;\n}\n\n}  // namespace\n\nint main(int argc, char** argv) {\n  std::string data;\n  std::string arch_name = \"mnist\";\n  std::string checkpoint;\n  std::string resume;\n  int epochs = 5;\n  int batch = 128;\n  int synthetic = 0;\n  float lr = 0.05f;\n  float momentum = 0.9f;\n  float weight_decay = 1e-4f;\n  std::uint64_t seed = 1;\n  bool adamw = false;\n\n  for (int i = 1; i < argc; ++i) {\n    const std::string arg = argv[i];\n    std::string value;\n    if (arg == \"--help\" || arg == \"-h\") {\n      usage();\n      return 0;\n    } else if (arg == \"--adamw\") {\n      adamw = true;\n    } else if (arg == \"--data\" && take(i, argc, argv, value)) {\n      data = value;\n    } else if (arg == \"--arch\" && take(i, argc, argv, value)) {\n      arch_name = value;\n    } else if (arg == \"--checkpoint\" && take(i, argc, argv, value)) {\n      checkpoint = value;\n    } else if (arg == \"--resume\" && take(i, argc, argv, value)) {\n      resume = value;\n    } else if (arg == \"--epochs\" && take(i, argc, argv, value)) {\n      epochs = std::stoi(value);\n    } else if (arg == \"--batch\" && take(i, argc, argv, value)) {\n      batch = std::stoi(value);\n    } else if (arg == \"--synthetic\" && take(i, argc, argv, value)) {\n      synthetic = std::stoi(value);\n    } else if (arg == \"--lr\" && take(i, argc, argv, value)) {\n      lr = std::stof(value);\n    } else if (arg == \"--momentum\" && take(i, argc, argv, value)) {\n      momentum = std::stof(value);\n    } else if (arg == \"--weight-decay\" && take(i, argc, argv, value)) {\n      weight_decay = std::stof(value);\n    } else if (arg == \"--seed\" && take(i, argc, argv, value)) {\n      seed = std::stoull(value);\n    } else {\n      usage();\n      return 2;\n    }\n  }\n  if (data.empty() && synthetic <= 0) {\n    usage();\n    return 2;\n  }\n\n  resnet::ArchSpec arch{};\n  if (!resnet::arch_by_name(arch_name.c_str(), arch)) {\n    std::cerr << \"unknown arch '\" << arch_name << \"'\\n\";\n    return 2;\n  }\n\n  resnet::MnistSplit train_split;\n  resnet::MnistSplit test_split;\n  if (synthetic > 0) {\n    const int test_n = synthetic / 5 > 32 ? synthetic / 5 : 32;\n    train_split = resnet::make_synthetic_digits(synthetic, static_cast<std::uint32_t>(seed));\n    test_split = resnet::make_synthetic_digits(test_n, static_cast<std::uint32_t>(seed + 17));\n  } else {\n    train_split = resnet::load_mnist_split(data + \"/train-images-idx3-ubyte\", data + \"/train-labels-idx1-ubyte\");\n    test_split = resnet::load_mnist_split(data + \"/t10k-images-idx3-ubyte\", data + \"/t10k-labels-idx1-ubyte\");\n  }\n\n  resnet::CudnnContext ctx;\n  resnet::ResNet<float> model = resnet::make_resnet<float>(ctx, arch, 1, 10, seed);\n  std::vector<resnet::NamedParam<float>> params;\n  model.collect_parameters(\"\", params);\n  long long trainable = 0;\n  long long buffers = 0;\n  for (const resnet::NamedParam<float>& param : params) {\n    const long long n = static_cast<long long>(param.tensor->numel());\n    if (param.tensor->requires_grad()) trainable += n;\n    else buffers += n;\n    std::cout << (param.tensor->requires_grad() ? \"param \" : \"buffer \") << param.name << \"  \" << n << \"\\n\";\n  }\n  const long long expect = resnet::trainable_parameter_count(arch, 1, 10);\n  if (trainable != expect) {\n    std::cerr << \"trainable count \" << trainable << \" does not match the architecture spec \" << expect << \"\\n\";\n    return 1;\n  }\n  std::cout << \"trainable \" << trainable << \"  bn buffers \" << buffers << \"  fc_in \" << model.fc_in_features()\n            << \"\\n\";\n\n  if (!resume.empty()) {\n    resnet::load_module<float>(resume, model);\n    std::cout << \"loaded \" << resume << \"\\n\";\n  }\n\n  resnet::TrainConfig<float> config;\n  config.epochs = epochs;\n  config.batch_size = batch;\n  config.lr = lr;\n  config.momentum = momentum;\n  config.weight_decay = weight_decay;\n  config.checkpoint = checkpoint;\n  config.seed = seed;\n  config.adamw = adamw;\n  resnet::train_mnist<float>(ctx, model, train_split, &test_split, config);\n  return 0;\n}\n"
	},
	{
		group: "Train",
		path: "tests/test_host.cpp",
		code: "#include \"resnet/algorithms.hpp\"\n#include \"resnet/geometry.hpp\"\n#include \"resnet/init.hpp\"\n#include \"resnet/mnist.hpp\"\n#include \"resnet/serializer.hpp\"\n\n#include <cmath>\n#include <cstdint>\n#include <fstream>\n#include <iostream>\n#include <string>\n#include <vector>\n\nnamespace {\n\nint g_failed = 0;\n\nvoid check(bool cond, const char* expr, const char* file, int line) {\n  if (!cond) {\n    std::cerr << \"FAIL \" << file << \":\" << line << \"  \" << expr << \"\\n\";\n    ++g_failed;\n  }\n}\n\n#define CHECK(cond) ::check(static_cast<bool>(cond), #cond, __FILE__, __LINE__)\n\nbool near(double a, double b, double eps = 1e-5) { return std::fabs(a - b) <= eps; }\n\nvoid write_be_u32(std::ostream& out, std::uint32_t v) {\n  unsigned char b[4] = {static_cast<unsigned char>((v >> 24) & 0xffu),\n                        static_cast<unsigned char>((v >> 16) & 0xffu),\n                        static_cast<unsigned char>((v >> 8) & 0xffu),\n                        static_cast<unsigned char>(v & 0xffu)};\n  out.write(reinterpret_cast<char*>(b), 4);\n}\n\nvoid test_geometry() {\n  const resnet::Spatial mnist = resnet::spatial_after(resnet::mnist_arch(), 28, 28);\n  CHECK(mnist.height == 7);\n  CHECK(mnist.width == 7);\n  CHECK(mnist.channels == 64);\n\n  const resnet::Spatial imagenet = resnet::spatial_after(resnet::resnet18_arch(), 224, 224);\n  CHECK(imagenet.height == 7);\n  CHECK(imagenet.width == 7);\n  CHECK(imagenet.channels == 512);\n\n  const resnet::Spatial tiny = resnet::spatial_after(resnet::resnet18_arch(), 28, 28);\n  CHECK(tiny.height == 1);\n  CHECK(tiny.width == 1);\n  CHECK(tiny.channels == 512);\n\n  CHECK(resnet::trainable_parameter_count(resnet::mnist_arch(), 1, 10) == 174970LL);\n  CHECK(resnet::trainable_parameter_count(resnet::resnet18_arch(), 3, 1000) == 11689512LL);\n\n  resnet::ArchSpec parsed{};\n  CHECK(resnet::arch_by_name(\"mnist\", parsed));\n  CHECK(std::string(parsed.name) == \"mnist\");\n  CHECK(resnet::arch_by_name(\"resnet18\", parsed));\n  CHECK(!resnet::arch_by_name(\"resnet50\", parsed));\n  CHECK(resnet::conv2d_out(28, 3, 1, 1) == 28);\n  CHECK(resnet::conv2d_out(28, 3, 2, 1) == 14);\n}\n\nvoid test_init_and_elementwise() {\n  CHECK(near(resnet::he_stddev(144), std::sqrt(2.0 / 144.0), 1e-12));\n  const auto a = resnet::he_normal<float>(128, 144, 99);\n  const auto b = resnet::he_normal<float>(128, 144, 99);\n  const auto c = resnet::he_normal<float>(128, 144, 100);\n  CHECK(a == b);\n  CHECK(a != c);\n  for (float v : a) CHECK(std::isfinite(v));\n\n  float xs[3] = {-1.f, 0.f, 2.f};\n  float ys[3] = {};\n  resnet::relu(resnet::host_policy, xs, ys, 3);\n  CHECK(ys[0] == 0.f && ys[1] == 0.f && ys[2] == 2.f);\n  float gy[3] = {4.f, 5.f, 6.f};\n  float gx[3] = {};\n  resnet::relu_backward(resnet::host_policy, xs, gy, gx, 3);\n  CHECK(gx[0] == 0.f && gx[1] == 0.f && gx[2] == 6.f);\n\n  float lhs[2] = {1.f, 2.f};\n  float rhs[2] = {3.f, 4.f};\n  float sum[2] = {};\n  resnet::add(resnet::host_policy, lhs, rhs, sum, 2);\n  CHECK(sum[0] == 4.f && sum[1] == 6.f);\n}\n\nvoid test_sgd_and_adam() {\n  float p = 1.f;\n  float g = 0.5f;\n  float v = 0.f;\n  const float lr = 0.1f;\n  const float mom = 0.9f;\n  const float wd = 0.1f;\n  const float g_hat = g + wd * p;\n  const float v_hat = mom * v + g_hat;\n  const float p_hat = p - lr * v_hat;\n  resnet::sgd_momentum(resnet::host_policy, &p, &g, &v, 1, lr, mom, wd);\n  CHECK(near(p, p_hat, 1e-6));\n  CHECK(near(v, v_hat, 1e-6));\n\n  float param = 1.f;\n  float grad = 0.5f;\n  float m = 0.f;\n  float s = 0.f;\n  const float alr = 0.01f;\n  const float b1 = 0.9f;\n  const float b2 = 0.999f;\n  const float eps = 1e-8f;\n  const float bc1 = 1.f - b1;\n  const float bc2 = 1.f - b2;\n  resnet::adamw(resnet::host_policy, &param, &grad, &m, &s, 1, alr, b1, b2, eps, 0.f, bc1, bc2);\n  CHECK(near(m, 0.05f, 1e-6));\n  CHECK(near(s, 0.00025f, 1e-7));\n  CHECK(near(param, 0.99f, 1e-5));\n\n  float param2 = 1.f;\n  float m2 = 0.f;\n  float s2 = 0.f;\n  resnet::adamw(resnet::host_policy, &param2, &grad, &m2, &s2, 1, alr, b1, b2, eps, 0.1f, bc1, bc2);\n  CHECK(near(param2, 0.989f, 1e-4));\n}\n\nvoid test_cross_entropy() {\n  const float logits_one[2] = {0.f, 0.f};\n  const int label_one[1] = {0};\n  float grad_one[2] = {};\n  const float loss_one =\n      resnet::softmax_cross_entropy(resnet::host_policy, logits_one, label_one, grad_one, 1, 2);\n  CHECK(near(loss_one, std::log(2.0), 1e-6));\n  CHECK(near(grad_one[0], -0.5, 1e-6));\n  CHECK(near(grad_one[1], 0.5, 1e-6));\n\n  const float logits_two[4] = {0.f, 0.f, 0.f, 0.f};\n  const int labels_two[2] = {0, 1};\n  float grad_two[4] = {};\n  const float loss_two =\n      resnet::softmax_cross_entropy(resnet::host_policy, logits_two, labels_two, grad_two, 2, 2);\n  CHECK(near(loss_two, std::log(2.0), 1e-6));\n  CHECK(near(grad_two[0], -0.25, 1e-6));\n  CHECK(near(grad_two[1], 0.25, 1e-6));\n  CHECK(near(grad_two[2], 0.25, 1e-6));\n  CHECK(near(grad_two[3], -0.25, 1e-6));\n\n  const float rows[5] = {0.f, 5.f, 1.f, 3.f, -1.f};\n  const int labels[2] = {1, 0};\n  CHECK(resnet::argmax_row(rows, 3) == 1);\n  CHECK(resnet::argmax_row(rows + 3, 2) == 0);\n  CHECK(resnet::count_correct(resnet::host_policy, rows, labels, 1, 3) == 1);\n}\n\nvoid test_checkpoint() {\n  const std::vector<float> values = {1.f, -2.5f, 0.f, 4.f};\n  std::vector<resnet::TensorBlob> blobs;\n  blobs.push_back(resnet::make_blob<float>(\"conv1.weight\", {2, 2}, values));\n  const std::vector<double> wide = {0.25, -8.0};\n  blobs.push_back(resnet::make_blob<double>(\"fc.bias\", {2}, wide));\n  const std::string path = \"/tmp/resnet_host_checkpoint.rsnt\";\n  resnet::save_checkpoint(path, blobs);\n  const std::vector<resnet::TensorBlob> loaded = resnet::load_checkpoint(path);\n  CHECK(loaded.size() == 2);\n  CHECK(loaded[0].name == \"conv1.weight\");\n  CHECK(loaded[0].dtype == resnet::DType::Float32);\n  const std::vector<float> back = resnet::blob_values<float>(loaded[0]);\n  CHECK(back.size() == values.size());\n  for (std::size_t i = 0; i < values.size(); ++i) CHECK(back[i] == values[i]);\n  const std::vector<double> back_d = resnet::blob_values<double>(loaded[1]);\n  CHECK(back_d.size() == 2);\n  CHECK(back_d[0] == 0.25);\n  CHECK(back_d[1] == -8.0);\n\n  bool threw = false;\n  try {\n    resnet::make_blob<float>(\"bad\", {-1, 2}, {});\n  } catch (const resnet::Error&) {\n    threw = true;\n  }\n  CHECK(threw);\n\n  threw = false;\n  try {\n    std::ofstream out(path, std::ios::binary);\n    out << \"NOTAFILE\";\n  } catch (...) {\n  }\n  try {\n    resnet::load_checkpoint(path);\n  } catch (const resnet::Error&) {\n    threw = true;\n  }\n  CHECK(threw);\n}\n\nvoid test_mnist() {\n  const std::string img = \"/tmp/resnet_host_images.idx\";\n  const std::string lbl = \"/tmp/resnet_host_labels.idx\";\n  {\n    std::ofstream images(img, std::ios::binary);\n    std::ofstream labels(lbl, std::ios::binary);\n    write_be_u32(images, 2051);\n    write_be_u32(images, 2);\n    write_be_u32(images, 2);\n    write_be_u32(images, 2);\n    const unsigned char pixels[8] = {255, 0, 0, 0, 0, 255, 128, 0};\n    images.write(reinterpret_cast<const char*>(pixels), 8);\n    write_be_u32(labels, 2049);\n    write_be_u32(labels, 2);\n    const unsigned char ys[2] = {3, 7};\n    labels.write(reinterpret_cast<const char*>(ys), 2);\n  }\n  const resnet::MnistSplit split = resnet::load_mnist_split(img, lbl);\n  CHECK(split.size() == 2);\n  CHECK(split.rows == 2 && split.cols == 2);\n  CHECK(split.image(1)[1] == 255);\n  std::vector<int> order = {1, 0};\n  resnet::HostBatch batch;\n  resnet::fill_batch(split, order, 0, 2, batch, 0.f, 1.f);\n  CHECK(batch.labels[0] == 7);\n  CHECK(batch.labels[1] == 3);\n  CHECK(near(batch.images[1], 1.f, 1e-6));\n  resnet::fill_batch(split, order, 0, 1, batch);\n  const float expected = (1.f - resnet::kMnistMean) / resnet::kMnistStd;\n  CHECK(near(batch.images[1], expected, 1e-5));\n\n  const resnet::MnistSplit synth = resnet::make_synthetic_digits(40, 7);\n  CHECK(synth.size() == 40);\n  CHECK(synth.rows == 28 && synth.cols == 28);\n  bool any = false;\n  bool in_range = true;\n  for (int i = 0; i < synth.size(); ++i) {\n    if (synth.labels[static_cast<std::size_t>(i)] > 9) in_range = false;\n    for (int p = 0; p < 28 * 28; ++p) {\n      if (synth.image(i)[p] == 255) any = true;\n    }\n  }\n  CHECK(any);\n  CHECK(in_range);\n  CHECK(synth.images != resnet::make_synthetic_digits(40, 8).images);\n}\n\n}  // namespace\n\nint main() {\n  test_geometry();\n  test_init_and_elementwise();\n  test_sgd_and_adam();\n  test_cross_entropy();\n  test_checkpoint();\n  test_mnist();\n  if (g_failed != 0) {\n    std::cerr << g_failed << \" checks failed\\n\";\n    return 1;\n  }\n  std::cout << \"host tests passed\\n\";\n  return 0;\n}\n"
	},
	{
		group: "Train",
		path: "scripts/download_mnist.sh",
		code: "#!/bin/sh\n# Uncompressed IDX files, the layout mnist_train --data expects.\nset -eu\ndest=${1:-data/mnist}\nmkdir -p \"$dest\"\nbase=https://ossci-datasets.s3.amazonaws.com/mnist\nfor name in train-images-idx3-ubyte train-labels-idx1-ubyte t10k-images-idx3-ubyte t10k-labels-idx1-ubyte; do\n  if [ ! -f \"$dest/$name\" ]; then\n    curl -fsSL \"$base/$name.gz\" -o \"$dest/$name.gz\"\n    gunzip -f \"$dest/$name.gz\"\n  fi\ndone\necho \"MNIST IDX files are in $dest\"\n"
	},
	{
		group: "Train",
		path: "include/resnet/all.hpp",
		code: "#pragma once\n\n// Umbrella header for the CUDA training stack. Include this from a .cu file.\n#include \"resnet/algorithms.hpp\"\n#include \"resnet/checkpoint.hpp\"\n#include \"resnet/context.hpp\"\n#include \"resnet/conv2d.hpp\"\n#include \"resnet/error.hpp\"\n#include \"resnet/geometry.hpp\"\n#include \"resnet/init.hpp\"\n#include \"resnet/loss.hpp\"\n#include \"resnet/mnist.hpp\"\n#include \"resnet/optimizer.hpp\"\n#include \"resnet/resnet.hpp\"\n#include \"resnet/serializer.hpp\"\n#include \"resnet/trainer.hpp\"\n"
	}
];
var stages = [
	{
		name: "input",
		detail: "1 × 28 × 28"
	},
	{
		name: "conv1 + bn + relu",
		detail: "3×3, 16, stride 1 → 28×28"
	},
	{
		name: "layer1",
		detail: "2 basic blocks, 16, stride 1 → 28×28"
	},
	{
		name: "layer2",
		detail: "2 basic blocks, 32, stride 2 → 14×14"
	},
	{
		name: "layer3",
		detail: "2 basic blocks, 64, stride 2 → 7×7"
	},
	{
		name: "global average pool",
		detail: "64"
	},
	{
		name: "fc",
		detail: "10 logits"
	}
];
function Home() {
	const [tab, setTab] = (0, import_react.useState)("network");
	const [query, setQuery] = (0, import_react.useState)("");
	const [activePath, setActivePath] = (0, import_react.useState)("include/resnet/algorithms.hpp");
	const filtered = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		return libraryFiles.filter((file) => !q || file.path.toLowerCase().includes(q));
	}, [query]);
	const active = libraryFiles.find((file) => file.path === activePath) ?? libraryFiles[0];
	const groups = (0, import_react.useMemo)(() => {
		const order = [];
		for (const file of filtered) if (!order.includes(file.group)) order.push(file.group);
		return order;
	}, [filtered]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-dvh bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "border-b border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 md:flex-row md:items-end md:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs tracking-widest text-accent uppercase",
						children: "C++ / CUDA"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 text-3xl font-semibold tracking-tight",
						children: "ResNet CUDA"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-xl text-muted",
						children: "Convolutional residual blocks for MNIST. cuDNN owns conv, batch-norm, and pooling. cuBLAS owns the classifier. Thrust runs the same update math the host tests lock."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "/resnet-cuda.zip",
					className: "inline-flex h-11 items-center justify-center gap-2 rounded-md bg-accent px-4 font-medium text-accent-fg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
						className: "size-4",
						"aria-hidden": true
					}), "Download source"]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-0 md:grid-cols-[16rem_minmax(0,1fr)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "border-border md:border-r",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-4 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-2 block text-xs font-medium text-muted",
						htmlFor: "file-filter",
						children: "Files"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "file-filter",
						value: query,
						onChange: (event) => setQuery(event.target.value),
						placeholder: "Filter",
						className: "h-11 w-full rounded-md border border-border bg-surface px-3 text-sm text-fg placeholder:text-muted"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden overflow-auto px-2 pb-6 md:block",
					"aria-label": "Library files",
					children: groups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "px-2 py-1 font-mono text-xs text-muted",
							children: group
						}), filtered.filter((file) => file.group === group).map((file) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							title: file.path,
							onClick: () => {
								setActivePath(file.path);
								setTab("source");
							},
							className: `block w-full truncate rounded-md px-2 py-2 text-left font-mono text-xs ${file.path === active.path && tab === "source" ? "bg-raised text-accent" : "text-fg hover:bg-surface"}`,
							children: file.path.split("/").slice(-1)[0]
						}, file.path))]
					}, group))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "min-w-0 px-4 py-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex gap-2",
						role: "tablist",
						"aria-label": "Library sections",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabButton, {
								id: "network",
								current: tab,
								onSelect: setTab,
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, {
									className: "size-4",
									"aria-hidden": true
								}),
								children: "Network"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabButton, {
								id: "source",
								current: tab,
								onSelect: setTab,
								children: "Source"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabButton, {
								id: "train",
								current: tab,
								onSelect: setTab,
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sigma, {
									className: "size-4",
									"aria-hidden": true
								}),
								children: "Train"
							})
						]
					}),
					tab === "network" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NetworkPane, {}) : null,
					tab === "source" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-2 block text-xs text-muted md:hidden",
							htmlFor: "file-pick",
							children: "Open file"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							id: "file-pick",
							className: "mb-3 h-11 w-full rounded-md border border-border bg-surface px-3 font-mono text-sm md:hidden",
							value: active.path,
							onChange: (event) => setActivePath(event.target.value),
							children: (filtered.some((file) => file.path === active.path) ? filtered : [active, ...filtered]).map((file) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: file.path,
								children: file.path
							}, file.path))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 flex items-baseline justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "truncate font-mono text-sm text-accent",
								children: active.path
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "shrink-0 text-xs text-muted",
								children: [active.code.split("\n").length, " lines"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceView, { code: active.code })
					] }) : null,
					tab === "train" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrainPane, {}) : null
				]
			})]
		})]
	});
}
function TabButton({ id, current, onSelect, children, icon }) {
	const selected = current === id;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		role: "tab",
		"aria-selected": selected,
		onClick: () => onSelect(id),
		className: `inline-flex h-11 items-center gap-2 rounded-md px-3 text-sm font-medium ${selected ? "bg-accent text-accent-fg" : "bg-surface text-fg"}`,
		children: [icon, children]
	});
}
function NetworkPane() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-2xl text-muted",
				children: "The default network is the CIFAR-style ResNet from He et al., narrowed for 28×28 grayscale. Convolutions have no bias. Batch-norm carries the affine scale and shift. A stage's first block uses the stage stride; the second is stride 1."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "space-y-2",
				children: stages.map((stage, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "grid grid-cols-[2rem_minmax(0,1fr)] items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-xs text-muted",
						children: index
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-md border border-border bg-surface px-3 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: stage.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-sm text-muted",
							children: stage.detail
						})]
					})]
				}, stage.name))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-md border border-border bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-medium",
						children: "Basic block"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-mono text-sm text-accent",
						children: "y = ReLU(F(x) + S(x))"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: [
									"conv 3×3",
									"bn",
									"relu",
									"conv 3×3",
									"bn"
								].map((chip) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-md bg-raised px-3 py-2 font-mono text-sm",
									children: chip
								}, chip))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: "Shortcut S is identity, or a 1×1 convolution plus batch-norm when channels or stride change."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: ["add", "relu"].map((chip) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-md bg-accent px-3 py-2 font-mono text-sm text-accent-fg",
									children: chip
								}, chip))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 text-sm text-muted",
						children: [
							"Backward splits the gradient at the sum. The two branches are differentiated separately, then their input gradients are added with the Thrust ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-fg",
								children: "add"
							}),
							" algorithm."
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "MNIST trainable",
						value: "174,970",
						note: "1 channel, 10 classes"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "ResNet-18 trainable",
						value: "11,689,512",
						note: "3×1000, torchvision count"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Checkpoint",
						value: "RESNET01",
						note: "little-endian, named tensors"
					})
				]
			})
		]
	});
}
function Stat({ label, value, note }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md border border-border bg-surface p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
				className: "text-xs text-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
				className: "mt-1 font-mono text-lg text-accent",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
				className: "text-sm text-muted",
				children: note
			})
		]
	});
}
function TrainPane() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "max-w-2xl text-muted",
				children: [
					"Training does not run in this page. Build ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-fg",
						children: "mnist_train"
					}),
					" on a machine with the CUDA toolkit and cuDNN, then point it at IDX files or the synthetic digits."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				className: "overflow-auto rounded-md border border-border bg-surface p-4 font-mono text-sm leading-6 text-fg",
				children: `cmake -S . -B build -DCUDNN_ROOT_DIR=/usr
cmake --build build -j
./scripts/download_mnist.sh data/mnist
./build/mnist_train --data data/mnist --epochs 8 --batch 128 --lr 0.05 --checkpoint mnist.rsnt`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "grid gap-2 text-sm text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-fg",
						children: "--arch resnet18"
					}), " uses the 7×7 stem and a max-pool. On 28×28 it ends at 1×1."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-fg",
						children: "--adamw"
					}), " swaps in decoupled weight decay. The default is momentum SGD, which is what the ResNet paper trains with."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Learning rate drops by 10× halfway through and again at three quarters, when there are at least four epochs." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "The checkpoint stores weights and batch-norm running stats by name. Optimizer velocity is not saved." })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferenceMath, {})
		]
	});
}
function ReferenceMath() {
	const [logitA, setLogitA] = (0, import_react.useState)("0");
	const [logitB, setLogitB] = (0, import_react.useState)("0");
	const [label, setLabel] = (0, import_react.useState)(0);
	const [param, setParam] = (0, import_react.useState)("1");
	const [grad, setGrad] = (0, import_react.useState)("0.5");
	const [velocity, setVelocity] = (0, import_react.useState)("0");
	const a = Number(logitA);
	const b = Number(logitB);
	const p0 = Number(param);
	const g0 = Number(grad);
	const v0 = Number(velocity);
	const ce = softmaxPair(a, b, label);
	const sgd = sgdStep(p0, g0, v0, .1, .9, .1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md border border-border bg-surface p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-medium",
				children: "Host reference"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-muted",
				children: [
					"Same formulas as ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-fg",
						children: "softmax_cross_entropy_row"
					}),
					" and",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-fg",
						children: "sgd_momentum_at"
					}),
					". The unit test locks the defaults: loss log(2), gradient −0.5 / 0.5, and the SGD step landing on 0.94."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-4 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "text-sm font-medium",
							children: "Two-class cross-entropy"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
							id: "logit-a",
							label: "logit 0",
							value: logitA,
							onChange: setLogitA
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
							id: "logit-b",
							label: "logit 1",
							value: logitB,
							onChange: setLogitB
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-1 text-xs text-muted",
							children: "label"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-2",
							children: [0, 1].map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setLabel(value),
								className: `h-11 flex-1 rounded-md font-mono ${label === value ? "bg-accent text-accent-fg" : "bg-raised text-fg"}`,
								children: value
							}, value))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-sm",
							children: [
								"loss ",
								fmt(ce.loss),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"grad ",
								fmt(ce.grad[0]),
								" , ",
								fmt(ce.grad[1])
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "text-sm font-medium",
							children: "SGD, lr 0.1, momentum 0.9, decay 0.1"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
							id: "param",
							label: "parameter",
							value: param,
							onChange: setParam
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
							id: "grad",
							label: "gradient",
							value: grad,
							onChange: setGrad
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
							id: "velocity",
							label: "velocity",
							value: velocity,
							onChange: setVelocity
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-sm",
							children: [
								"parameter ",
								fmt(sgd.param),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"velocity ",
								fmt(sgd.velocity)
							]
						})
					]
				})]
			})
		]
	});
}
function NumberField({ id, label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block text-xs text-muted",
		htmlFor: id,
		children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			id,
			inputMode: "decimal",
			value,
			onChange: (event) => onChange(event.target.value),
			className: "mt-1 h-11 w-full rounded-md border border-border bg-bg px-3 font-mono text-sm text-fg"
		})]
	});
}
function softmaxPair(a, b, label) {
	if (!Number.isFinite(a) || !Number.isFinite(b)) return {
		loss: NaN,
		grad: [NaN, NaN]
	};
	const max = Math.max(a, b);
	const ea = Math.exp(a - max);
	const eb = Math.exp(b - max);
	const sum = ea + eb;
	const logits = [a, b];
	return {
		loss: max + Math.log(sum) - logits[label],
		grad: [ea / sum - (label === 0 ? 1 : 0), eb / sum - (label === 1 ? 1 : 0)]
	};
}
function sgdStep(param, grad, velocity, lr, momentum, decay) {
	if (![
		param,
		grad,
		velocity
	].every(Number.isFinite)) return {
		param: NaN,
		velocity: NaN
	};
	const g = grad + decay * param;
	const nextV = momentum * velocity + g;
	return {
		param: param - lr * nextV,
		velocity: nextV
	};
}
function fmt(value) {
	if (!Number.isFinite(value)) return "—";
	return value.toFixed(6).replace(/0+$/, "").replace(/\.$/, "");
}
//#endregion
export { Home as component };
