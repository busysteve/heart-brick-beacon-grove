#include "resnet/tensor.hpp"

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
