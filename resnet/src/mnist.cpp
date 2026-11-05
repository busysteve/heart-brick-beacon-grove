#include "resnet/mnist.hpp"

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
