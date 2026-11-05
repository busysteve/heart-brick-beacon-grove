#pragma once

#include "resnet/tensor.hpp"

#include <string>
#include <vector>

namespace resnet {

template <typename T>
struct NamedParam {
  std::string name;
  Tensor<T>* tensor = nullptr;
};

// Common surface for parameter collection and train/eval.
// Forward and backward stay concrete on each layer so multi-input ops
// (the residual add) are not forced through a single tensor.
template <typename T>
class Module {
 public:
  virtual ~Module() = default;
  virtual void train(bool mode) { training_ = mode; }
  void eval() { train(false); }
  bool training() const { return training_; }
  virtual void collect_parameters(const std::string& prefix, std::vector<NamedParam<T>>& out) = 0;

 protected:
  bool training_ = true;
};

}  // namespace resnet
