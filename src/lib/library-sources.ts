export type LibraryFile = { group: string; path: string; code: string };

import f0 from "../../resnet/README.md?raw";
import f1 from "../../resnet/CMakeLists.txt?raw";
import f2 from "../../resnet/Makefile?raw";
import f3 from "../../resnet/include/resnet/algorithms.hpp?raw";
import f4 from "../../resnet/include/resnet/geometry.hpp?raw";
import f5 from "../../resnet/include/resnet/init.hpp?raw";
import f6 from "../../resnet/include/resnet/serializer.hpp?raw";
import f7 from "../../resnet/include/resnet/mnist.hpp?raw";
import f8 from "../../resnet/include/resnet/tensor.hpp?raw";
import f9 from "../../resnet/include/resnet/module.hpp?raw";
import f10 from "../../resnet/include/resnet/context.hpp?raw";
import f11 from "../../resnet/include/resnet/check.hpp?raw";
import f12 from "../../resnet/include/resnet/descriptors.hpp?raw";
import f13 from "../../resnet/include/resnet/error.hpp?raw";
import f14 from "../../resnet/include/resnet/conv2d.hpp?raw";
import f15 from "../../resnet/include/resnet/batch_norm.hpp?raw";
import f16 from "../../resnet/include/resnet/activation.hpp?raw";
import f17 from "../../resnet/include/resnet/pooling.hpp?raw";
import f18 from "../../resnet/include/resnet/linear.hpp?raw";
import f19 from "../../resnet/include/resnet/residual.hpp?raw";
import f20 from "../../resnet/include/resnet/resnet.hpp?raw";
import f21 from "../../resnet/src/conv2d.cu?raw";
import f22 from "../../resnet/src/batch_norm.cu?raw";
import f23 from "../../resnet/src/activation.cu?raw";
import f24 from "../../resnet/src/pooling.cu?raw";
import f25 from "../../resnet/src/linear.cu?raw";
import f26 from "../../resnet/src/residual.cu?raw";
import f27 from "../../resnet/src/resnet.cu?raw";
import f28 from "../../resnet/include/resnet/loss.hpp?raw";
import f29 from "../../resnet/include/resnet/optimizer.hpp?raw";
import f30 from "../../resnet/include/resnet/checkpoint.hpp?raw";
import f31 from "../../resnet/include/resnet/trainer.hpp?raw";
import f32 from "../../resnet/src/loss.cu?raw";
import f33 from "../../resnet/src/optimizer.cu?raw";
import f34 from "../../resnet/src/checkpoint.cu?raw";
import f35 from "../../resnet/src/trainer.cu?raw";
import f36 from "../../resnet/src/tensor.cu?raw";
import f37 from "../../resnet/src/context.cu?raw";
import f38 from "../../resnet/src/serializer.cpp?raw";
import f39 from "../../resnet/src/mnist.cpp?raw";
import f40 from "../../resnet/examples/mnist_train.cu?raw";
import f41 from "../../resnet/tests/test_host.cpp?raw";
import f42 from "../../resnet/scripts/download_mnist.sh?raw";
import f43 from "../../resnet/include/resnet/all.hpp?raw";

export const libraryFiles: LibraryFile[] = [
  { group: 'Overview', path: 'README.md', code: f0 },
  { group: 'Overview', path: 'CMakeLists.txt', code: f1 },
  { group: 'Overview', path: 'Makefile', code: f2 },
  { group: 'Spec', path: 'include/resnet/algorithms.hpp', code: f3 },
  { group: 'Spec', path: 'include/resnet/geometry.hpp', code: f4 },
  { group: 'Spec', path: 'include/resnet/init.hpp', code: f5 },
  { group: 'Spec', path: 'include/resnet/serializer.hpp', code: f6 },
  { group: 'Spec', path: 'include/resnet/mnist.hpp', code: f7 },
  { group: 'Runtime', path: 'include/resnet/tensor.hpp', code: f8 },
  { group: 'Runtime', path: 'include/resnet/module.hpp', code: f9 },
  { group: 'Runtime', path: 'include/resnet/context.hpp', code: f10 },
  { group: 'Runtime', path: 'include/resnet/check.hpp', code: f11 },
  { group: 'Runtime', path: 'include/resnet/descriptors.hpp', code: f12 },
  { group: 'Runtime', path: 'include/resnet/error.hpp', code: f13 },
  { group: 'Layers', path: 'include/resnet/conv2d.hpp', code: f14 },
  { group: 'Layers', path: 'include/resnet/batch_norm.hpp', code: f15 },
  { group: 'Layers', path: 'include/resnet/activation.hpp', code: f16 },
  { group: 'Layers', path: 'include/resnet/pooling.hpp', code: f17 },
  { group: 'Layers', path: 'include/resnet/linear.hpp', code: f18 },
  { group: 'Layers', path: 'include/resnet/residual.hpp', code: f19 },
  { group: 'Layers', path: 'include/resnet/resnet.hpp', code: f20 },
  { group: 'Layers', path: 'src/conv2d.cu', code: f21 },
  { group: 'Layers', path: 'src/batch_norm.cu', code: f22 },
  { group: 'Layers', path: 'src/activation.cu', code: f23 },
  { group: 'Layers', path: 'src/pooling.cu', code: f24 },
  { group: 'Layers', path: 'src/linear.cu', code: f25 },
  { group: 'Layers', path: 'src/residual.cu', code: f26 },
  { group: 'Layers', path: 'src/resnet.cu', code: f27 },
  { group: 'Train', path: 'include/resnet/loss.hpp', code: f28 },
  { group: 'Train', path: 'include/resnet/optimizer.hpp', code: f29 },
  { group: 'Train', path: 'include/resnet/checkpoint.hpp', code: f30 },
  { group: 'Train', path: 'include/resnet/trainer.hpp', code: f31 },
  { group: 'Train', path: 'src/loss.cu', code: f32 },
  { group: 'Train', path: 'src/optimizer.cu', code: f33 },
  { group: 'Train', path: 'src/checkpoint.cu', code: f34 },
  { group: 'Train', path: 'src/trainer.cu', code: f35 },
  { group: 'Train', path: 'src/tensor.cu', code: f36 },
  { group: 'Train', path: 'src/context.cu', code: f37 },
  { group: 'Train', path: 'src/serializer.cpp', code: f38 },
  { group: 'Train', path: 'src/mnist.cpp', code: f39 },
  { group: 'Train', path: 'examples/mnist_train.cu', code: f40 },
  { group: 'Train', path: 'tests/test_host.cpp', code: f41 },
  { group: 'Train', path: 'scripts/download_mnist.sh', code: f42 },
  { group: 'Train', path: 'include/resnet/all.hpp', code: f43 },
];
