#pragma once

#include <stdexcept>
#include <string>

namespace resnet {

// Project-wide exception. Thrown for shape errors, bad checkpoints, cuDNN/CUDA
// failures, and illegal training-state transitions.
class Error : public std::runtime_error {
 public:
  explicit Error(const std::string& message) : std::runtime_error(message) {}
};

}  // namespace resnet
