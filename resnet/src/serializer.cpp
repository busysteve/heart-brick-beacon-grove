#include "resnet/serializer.hpp"

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
