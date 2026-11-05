#include "resnet/activation.hpp"

#include "resnet/algorithms.hpp"

#include <thrust/execution_policy.h>

namespace resnet {

template <typename T>
Tensor<T>& ReLU<T>::forward(const Tensor<T>& input) {
  if (input.numel() == 0) throw Error("ReLU got an empty tensor");
  saved_input_.resize(input.shape());
  output_.resize(input.shape());
  saved_input_.copy_from_device(input.data());
  relu(thrust::device, saved_input_.data(), output_.data(), saved_input_.numel());
  return output_;
}

template <typename T>
Tensor<T>& ReLU<T>::backward(const Tensor<T>& grad_out) {
  if (saved_input_.numel() == 0) throw Error("ReLU::backward called before forward");
  if (grad_out.numel() != saved_input_.numel()) throw Error("ReLU gradient shape mismatch");
  grad_input_.resize(saved_input_.shape());
  relu_backward(thrust::device, saved_input_.data(), grad_out.data(), grad_input_.data(),
                saved_input_.numel());
  return grad_input_;
}

template <typename T>
void ReLU<T>::collect_parameters(const std::string&, std::vector<NamedParam<T>>&) {}

template class ReLU<float>;
template class ReLU<double>;

}  // namespace resnet
