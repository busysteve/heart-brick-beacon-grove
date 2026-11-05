cmake_minimum_required(VERSION 3.18)
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
  HINTS ${CUDNN_ROOT_DIR} $ENV{CUDNN_ROOT} ${CUDAToolkit_INCLUDE_DIRS}
  PATH_SUFFIXES include)
find_library(CUDNN_LIBRARY
  NAMES cudnn
  HINTS ${CUDNN_ROOT_DIR} $ENV{CUDNN_ROOT} ${CUDAToolkit_LIBRARY_ROOT}
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
  ${CMAKE_CURRENT_SOURCE_DIR}/include
  ${CUDNN_INCLUDE_DIR}
)
target_link_libraries(resnet PUBLIC CUDA::cudart CUDA::cublas ${CUDNN_LIBRARY})
target_compile_features(resnet PUBLIC cxx_std_17)

add_executable(mnist_train examples/mnist_train.cu)
target_link_libraries(mnist_train PRIVATE resnet)
