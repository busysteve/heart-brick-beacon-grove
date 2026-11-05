#pragma once

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
