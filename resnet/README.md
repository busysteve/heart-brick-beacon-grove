# ResNet for MNIST, on CUDA

A small C++ class set that trains a residual network with the libraries that
actually own each job:

| Piece | Where it runs |
| --- | --- |
| Convolution, batch-norm, max-pool, global average pool | cuDNN |
| Classifier GEMM | cuBLAS (column-major view of row-major `N x K` storage) |
| ReLU, residual add, bias add, SGD, AdamW | Thrust execution-policy algorithms |
| Softmax cross-entropy | One `__host__ __device__` row function. Host policy is a loop; the device path is the same function in a kernel, then `thrust::reduce` |

The scalar updates live in `include/resnet/algorithms.hpp`. `sgd_momentum_at`,
`adamw_at`, `relu_at`, and `softmax_cross_entropy_row` are the only copies of
that math. `host_policy` runs them on the CPU (this is what the host tests
lock). A Thrust device policy runs the same functions on the GPU.

## Layout

```
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
```

`ArchSpec` in `geometry.hpp` is the single description of both networks.
`trainable_parameter_count` is checked by the host tests:

- MNIST stem, 1 channel, 10 classes: **174,970** trainable values
- ResNet-18, 3 channels, 1000 classes: **11,689,512** (torchvision `resnet18`)

Convolutions have no bias (batch-norm follows). The classifier has a bias.
Downsample is a 1x1 conv plus batch-norm when the stride or width changes.
The MNIST network keeps 28x28 through the stem (no max-pool) and finishes at
7x7x64 before global average pooling. ResNet-18 on 224x224 finishes at 7x7x512.
On 28x28 it still runs and finishes at 1x1x512; prefer `--arch mnist` there.

## Build

CUDA toolkit and cuDNN 8 or 9 (legacy conv / batch-norm / pooling API, still
shipped in `libcudnn`).

```
cmake -S . -B build -DCUDNN_ROOT_DIR=/usr
cmake --build build -j
./scripts/download_mnist.sh data/mnist
./build/mnist_train --data data/mnist --epochs 8 --batch 128 --lr 0.05
```

`--arch resnet18` builds the ImageNet stem with 1 input channel so it can read
MNIST. `--adamw` swaps the optimizer. `--checkpoint model.rsnt` writes the best
test-accuracy weights. `--resume model.rsnt` loads them (optimizer moments start
over). `--synthetic 4096` trains on geometric digits when you have no IDX files.

A 5–8 epoch run of the MNIST architecture at batch 128 and lr 0.05 commonly
clears 99% test accuracy. That is a property of the task, not a guarantee of
every seed.

Host-only tests (serialization, IDX, the shared math, the architecture counts)
do not need a GPU:

```
make test
```

## Checkpoint

Magic `RESNET01`, version 1, explicit little-endian. Every collected tensor is
stored by name, including batch-norm running mean and variance. Load is strict:
missing names, unexpected names, rank, shape, and dtype all fail. Names follow
the torchvision pattern (`layer2.0.conv1.weight`, `layer2.0.downsample.0.weight`,
`bn1.running_var`, `fc.bias`).

## What is not in here

No data-parallel training, no mixed precision, no cuDNN graph fusion. Workspace
and algorithm choice prefer the first supported implicit-GEMM style kernel so
the shapes in this repo run, not so they win a benchmark. One `CudnnContext`
per thread; it must outlive the model.
