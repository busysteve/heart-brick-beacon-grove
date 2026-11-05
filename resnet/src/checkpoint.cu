#include "resnet/checkpoint.hpp"

#include "resnet/serializer.hpp"

#include <utility>

namespace resnet {

template <typename T>
void save_module(const std::string& path, Module<T>& module) {
  std::vector<NamedParam<T>> params;
  module.collect_parameters("", params);
  std::vector<TensorBlob> blobs;
  blobs.reserve(params.size());
  for (const NamedParam<T>& param : params) {
    std::vector<int> shape = param.tensor->shape();
    blobs.push_back(make_blob<T>(param.name, shape, param.tensor->to_host()));
  }
  save_checkpoint(path, blobs);
}

template <typename T>
void load_module(const std::string& path, Module<T>& module) {
  std::vector<NamedParam<T>> params;
  module.collect_parameters("", params);
  const std::vector<TensorBlob> blobs = load_checkpoint(path);
  std::vector<char> used(blobs.size(), 0);
  for (NamedParam<T>& param : params) {
    const TensorBlob* match = nullptr;
    for (std::size_t i = 0; i < blobs.size(); ++i) {
      if (blobs[i].name == param.name) {
        match = &blobs[i];
        used[i] = 1;
        break;
      }
    }
    if (match == nullptr) throw Error("checkpoint is missing '" + param.name + "'");
    if (match->dtype != dtype_tag<T>()) throw Error("dtype mismatch for '" + param.name + "'");
    if (match->shape.size() != param.tensor->shape().size()) {
      throw Error("rank mismatch for '" + param.name + "'");
    }
    for (std::size_t d = 0; d < match->shape.size(); ++d) {
      if (match->shape[d] != param.tensor->shape()[d]) {
        throw Error("shape mismatch for '" + param.name + "'");
      }
    }
    param.tensor->from_host(blob_values<T>(*match));
  }
  for (std::size_t i = 0; i < blobs.size(); ++i) {
    if (!used[i]) throw Error("checkpoint has unexpected tensor '" + blobs[i].name + "'");
  }
}

template void save_module<float>(const std::string&, Module<float>&);
template void save_module<double>(const std::string&, Module<double>&);
template void load_module<float>(const std::string&, Module<float>&);
template void load_module<double>(const std::string&, Module<double>&);

}  // namespace resnet
