#pragma once

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
