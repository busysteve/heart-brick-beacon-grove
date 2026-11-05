#include "resnet/optimizer.hpp"

#include "resnet/algorithms.hpp"

#include <cmath>
#include <thrust/execution_policy.h>

namespace resnet {

template <typename T>
SgdMomentum<T>::SgdMomentum(T learning_rate, T momentum, T weight_decay)
    : lr_(learning_rate), momentum_(momentum), weight_decay_(weight_decay) {
  if (lr_ < T(0)) throw Error("learning rate must be >= 0");
}

template <typename T>
Tensor<T>& SgdMomentum<T>::velocity_for(Tensor<T>* param) {
  for (Slot& slot : slots_) {
    if (slot.key == param) return slot.velocity;
  }
  Slot slot;
  slot.key = param;
  slot.velocity = Tensor<T>(param->shape(), false);
  slot.velocity.zero_data();
  slots_.push_back(std::move(slot));
  return slots_.back().velocity;
}

template <typename T>
void SgdMomentum<T>::step(const std::vector<NamedParam<T>>& params) {
  for (const NamedParam<T>& param : params) {
    if (!param.tensor->requires_grad()) continue;
    Tensor<T>& velocity = velocity_for(param.tensor);
    if (velocity.numel() != param.tensor->numel()) {
      velocity.resize(param.tensor->shape());
      velocity.zero_data();
    }
    sgd_momentum(thrust::device, param.tensor->data(), param.tensor->grad(), velocity.data(),
                 param.tensor->numel(), lr_, momentum_, weight_decay_);
  }
}

template <typename T>
AdamW<T>::AdamW(T learning_rate, T weight_decay, T beta1, T beta2, T eps)
    : lr_(learning_rate), weight_decay_(weight_decay), beta1_(beta1), beta2_(beta2), eps_(eps) {
  if (lr_ < T(0) || eps_ <= T(0)) throw Error("invalid AdamW hyperparameters");
}

template <typename T>
typename AdamW<T>::Slot& AdamW<T>::slot_for(Tensor<T>* param) {
  for (Slot& slot : slots_) {
    if (slot.key == param) return slot;
  }
  Slot slot;
  slot.key = param;
  slot.first = Tensor<T>(param->shape(), false);
  slot.second = Tensor<T>(param->shape(), false);
  slot.first.zero_data();
  slot.second.zero_data();
  slots_.push_back(std::move(slot));
  return slots_.back();
}

template <typename T>
void AdamW<T>::step(const std::vector<NamedParam<T>>& params) {
  ++step_;
  const T correct_1 = T(1) - static_cast<T>(std::pow(static_cast<double>(beta1_), step_));
  const T correct_2 = T(1) - static_cast<T>(std::pow(static_cast<double>(beta2_), step_));
  for (const NamedParam<T>& param : params) {
    if (!param.tensor->requires_grad()) continue;
    Slot& slot = slot_for(param.tensor);
    adamw(thrust::device, param.tensor->data(), param.tensor->grad(), slot.first.data(), slot.second.data(),
          param.tensor->numel(), lr_, beta1_, beta2_, eps_, weight_decay_, correct_1, correct_2);
  }
}

template class SgdMomentum<float>;
template class SgdMomentum<double>;
template class AdamW<float>;
template class AdamW<double>;

}  // namespace resnet
