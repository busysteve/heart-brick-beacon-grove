#pragma once

#include "resnet/module.hpp"

#include <vector>

namespace resnet {

// Classic ResNet optimizer: momentum SGD with L2 added into the gradient.
// The element update is sgd_momentum_at, launched through Thrust.
template <typename T>
class SgdMomentum {
 public:
  SgdMomentum(T learning_rate, T momentum, T weight_decay);
  void set_lr(T learning_rate) { lr_ = learning_rate; }
  T lr() const { return lr_; }
  void step(const std::vector<NamedParam<T>>& params);

 private:
  struct Slot {
    Tensor<T>* key = nullptr;
    Tensor<T> velocity;
  };
  Tensor<T>& velocity_for(Tensor<T>* param);
  T lr_ = 0;
  T momentum_ = 0;
  T weight_decay_ = 0;
  std::vector<Slot> slots_;
};

// AdamW. Moments and the parameter write are adamw_at, also through Thrust.
// `step` is one global timestep shared by every parameter.
template <typename T>
class AdamW {
 public:
  AdamW(T learning_rate, T weight_decay, T beta1 = T(0.9), T beta2 = T(0.999), T eps = T(1e-8));
  void set_lr(T learning_rate) { lr_ = learning_rate; }
  T lr() const { return lr_; }
  void step(const std::vector<NamedParam<T>>& params);

 private:
  struct Slot {
    Tensor<T>* key = nullptr;
    Tensor<T> first;
    Tensor<T> second;
  };
  Slot& slot_for(Tensor<T>* param);
  T lr_ = 0;
  T weight_decay_ = 0;
  T beta1_ = T(0.9);
  T beta2_ = T(0.999);
  T eps_ = T(1e-8);
  int step_ = 0;
  std::vector<Slot> slots_;
};

}  // namespace resnet
