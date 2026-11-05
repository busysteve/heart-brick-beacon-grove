#pragma once

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

// N-D device tensor. `requires_grad` marks optimizer parameters.
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
