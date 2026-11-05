#pragma once

#include "resnet/module.hpp"

namespace resnet {

// ReLU via the Thrust execution-policy algorithm in algorithms.hpp.
// The mask is the saved pre-activation (x > 0), matching relu_backward_at.
template <typename T>
class ReLU : public Module<T> {
 public:
  ReLU() = default;
  Tensor<T>& forward(const Tensor<T>& input);
  Tensor<T>& backward(const Tensor<T>& grad_out);
  Tensor<T>& grad_input() { return grad_input_; }
  void collect_parameters(const std::string& prefix, std::vector<NamedParam<T>>& out) override;

 private:
  Tensor<T> output_;
  Tensor<T> grad_input_;
  Tensor<T> saved_input_;
};

}  // namespace resnet
