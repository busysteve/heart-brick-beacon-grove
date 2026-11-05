#pragma once

#include "resnet/module.hpp"

#include <string>

namespace resnet {

// Writes every collected tensor, including batch-norm running stats.
// Load matches by name and rejects missing names, extra names, and shape or
// dtype mismatches. Optimizer velocity is not part of the file.
template <typename T>
void save_module(const std::string& path, Module<T>& module);

template <typename T>
void load_module(const std::string& path, Module<T>& module);

}  // namespace resnet
