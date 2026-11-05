#pragma once

#include "resnet/geometry.hpp"
#include "resnet/linear.hpp"
#include "resnet/pooling.hpp"
#include "resnet/residual.hpp"

#include <cstdint>
#include <memory>
#include <string>
#include <vector>

namespace resnet {

// ResNet built from ArchSpec.
//   mnist:    3x3 stem, 16-32-64, two basic blocks per stage. 174,970 trainable
//             values at 1 input channel and 10 classes.
//   resnet18: 7x7 stem + max-pool, 64-128-256-512. 11,689,512 trainable values
//             at 3 input channels and 1000 classes (torchvision resnet18).
template <typename T>
class ResNet : public Module<T> {
 public:
  ResNet(CudnnContext& ctx, const ArchSpec& arch, int in_channels, int num_classes, std::uint64_t seed);
  Tensor<T>& forward(const Tensor<T>& input);
  Tensor<T>& backward(const Tensor<T>& grad_logits);
  void train(bool mode) override;
  void zero_grad();
  void collect_parameters(const std::string& prefix, std::vector<NamedParam<T>>& out) override;

  const ArchSpec& spec() const { return arch_; }
  int in_channels() const { return in_channels_; }
  int num_classes() const { return num_classes_; }
  int fc_in_features() const { return fc_in_; }

 private:
  static std::string join(const std::string& prefix, const std::string& leaf);

  CudnnContext* ctx_ = nullptr;
  ArchSpec arch_{};
  int in_channels_ = 1;
  int num_classes_ = 10;
  int fc_in_ = 0;
  Conv2d<T> conv1_;
  BatchNorm<T> bn1_;
  ReLU<T> relu_;
  std::unique_ptr<Pool2d<T>> max_pool_;
  std::vector<std::vector<std::unique_ptr<BasicBlock<T>>>> stages_;
  Pool2d<T> gap_;
  std::unique_ptr<Linear<T>> fc_;
};

template <typename T>
ResNet<T> make_resnet(CudnnContext& ctx, const ArchSpec& arch, int in_channels, int num_classes,
                      std::uint64_t seed);

}  // namespace resnet
