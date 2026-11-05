#pragma once

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
