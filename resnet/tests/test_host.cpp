#include "resnet/algorithms.hpp"
#include "resnet/geometry.hpp"
#include "resnet/init.hpp"
#include "resnet/mnist.hpp"
#include "resnet/serializer.hpp"

#include <cmath>
#include <cstdint>
#include <fstream>
#include <iostream>
#include <string>
#include <vector>

namespace {

int g_failed = 0;

void check(bool cond, const char* expr, const char* file, int line) {
  if (!cond) {
    std::cerr << "FAIL " << file << ":" << line << "  " << expr << "\n";
    ++g_failed;
  }
}

#define CHECK(cond) ::check(static_cast<bool>(cond), #cond, __FILE__, __LINE__)

bool near(double a, double b, double eps = 1e-5) { return std::fabs(a - b) <= eps; }

void write_be_u32(std::ostream& out, std::uint32_t v) {
  unsigned char b[4] = {static_cast<unsigned char>((v >> 24) & 0xffu),
                        static_cast<unsigned char>((v >> 16) & 0xffu),
                        static_cast<unsigned char>((v >> 8) & 0xffu),
                        static_cast<unsigned char>(v & 0xffu)};
  out.write(reinterpret_cast<char*>(b), 4);
}

void test_geometry() {
  const resnet::Spatial mnist = resnet::spatial_after(resnet::mnist_arch(), 28, 28);
  CHECK(mnist.height == 7);
  CHECK(mnist.width == 7);
  CHECK(mnist.channels == 64);

  const resnet::Spatial imagenet = resnet::spatial_after(resnet::resnet18_arch(), 224, 224);
  CHECK(imagenet.height == 7);
  CHECK(imagenet.width == 7);
  CHECK(imagenet.channels == 512);

  const resnet::Spatial tiny = resnet::spatial_after(resnet::resnet18_arch(), 28, 28);
  CHECK(tiny.height == 1);
  CHECK(tiny.width == 1);
  CHECK(tiny.channels == 512);

  CHECK(resnet::trainable_parameter_count(resnet::mnist_arch(), 1, 10) == 174970LL);
  CHECK(resnet::trainable_parameter_count(resnet::resnet18_arch(), 3, 1000) == 11689512LL);

  resnet::ArchSpec parsed{};
  CHECK(resnet::arch_by_name("mnist", parsed));
  CHECK(std::string(parsed.name) == "mnist");
  CHECK(resnet::arch_by_name("resnet18", parsed));
  CHECK(!resnet::arch_by_name("resnet50", parsed));
  CHECK(resnet::conv2d_out(28, 3, 1, 1) == 28);
  CHECK(resnet::conv2d_out(28, 3, 2, 1) == 14);
}

void test_init_and_elementwise() {
  CHECK(near(resnet::he_stddev(144), std::sqrt(2.0 / 144.0), 1e-12));
  const auto a = resnet::he_normal<float>(128, 144, 99);
  const auto b = resnet::he_normal<float>(128, 144, 99);
  const auto c = resnet::he_normal<float>(128, 144, 100);
  CHECK(a == b);
  CHECK(a != c);
  for (float v : a) CHECK(std::isfinite(v));

  float xs[3] = {-1.f, 0.f, 2.f};
  float ys[3] = {};
  resnet::relu(resnet::host_policy, xs, ys, 3);
  CHECK(ys[0] == 0.f && ys[1] == 0.f && ys[2] == 2.f);
  float gy[3] = {4.f, 5.f, 6.f};
  float gx[3] = {};
  resnet::relu_backward(resnet::host_policy, xs, gy, gx, 3);
  CHECK(gx[0] == 0.f && gx[1] == 0.f && gx[2] == 6.f);

  float lhs[2] = {1.f, 2.f};
  float rhs[2] = {3.f, 4.f};
  float sum[2] = {};
  resnet::add(resnet::host_policy, lhs, rhs, sum, 2);
  CHECK(sum[0] == 4.f && sum[1] == 6.f);
}

void test_sgd_and_adam() {
  float p = 1.f;
  float g = 0.5f;
  float v = 0.f;
  const float lr = 0.1f;
  const float mom = 0.9f;
  const float wd = 0.1f;
  const float g_hat = g + wd * p;
  const float v_hat = mom * v + g_hat;
  const float p_hat = p - lr * v_hat;
  resnet::sgd_momentum(resnet::host_policy, &p, &g, &v, 1, lr, mom, wd);
  CHECK(near(p, p_hat, 1e-6));
  CHECK(near(v, v_hat, 1e-6));

  float param = 1.f;
  float grad = 0.5f;
  float m = 0.f;
  float s = 0.f;
  const float alr = 0.01f;
  const float b1 = 0.9f;
  const float b2 = 0.999f;
  const float eps = 1e-8f;
  const float bc1 = 1.f - b1;
  const float bc2 = 1.f - b2;
  resnet::adamw(resnet::host_policy, &param, &grad, &m, &s, 1, alr, b1, b2, eps, 0.f, bc1, bc2);
  CHECK(near(m, 0.05f, 1e-6));
  CHECK(near(s, 0.00025f, 1e-7));
  CHECK(near(param, 0.99f, 1e-5));

  float param2 = 1.f;
  float m2 = 0.f;
  float s2 = 0.f;
  resnet::adamw(resnet::host_policy, &param2, &grad, &m2, &s2, 1, alr, b1, b2, eps, 0.1f, bc1, bc2);
  CHECK(near(param2, 0.989f, 1e-4));
}

void test_cross_entropy() {
  const float logits_one[2] = {0.f, 0.f};
  const int label_one[1] = {0};
  float grad_one[2] = {};
  const float loss_one =
      resnet::softmax_cross_entropy(resnet::host_policy, logits_one, label_one, grad_one, 1, 2);
  CHECK(near(loss_one, std::log(2.0), 1e-6));
  CHECK(near(grad_one[0], -0.5, 1e-6));
  CHECK(near(grad_one[1], 0.5, 1e-6));

  const float logits_two[4] = {0.f, 0.f, 0.f, 0.f};
  const int labels_two[2] = {0, 1};
  float grad_two[4] = {};
  const float loss_two =
      resnet::softmax_cross_entropy(resnet::host_policy, logits_two, labels_two, grad_two, 2, 2);
  CHECK(near(loss_two, std::log(2.0), 1e-6));
  CHECK(near(grad_two[0], -0.25, 1e-6));
  CHECK(near(grad_two[1], 0.25, 1e-6));
  CHECK(near(grad_two[2], 0.25, 1e-6));
  CHECK(near(grad_two[3], -0.25, 1e-6));

  const float rows[5] = {0.f, 5.f, 1.f, 3.f, -1.f};
  const int labels[2] = {1, 0};
  CHECK(resnet::argmax_row(rows, 3) == 1);
  CHECK(resnet::argmax_row(rows + 3, 2) == 0);
  CHECK(resnet::count_correct(resnet::host_policy, rows, labels, 1, 3) == 1);
}

void test_checkpoint() {
  const std::vector<float> values = {1.f, -2.5f, 0.f, 4.f};
  std::vector<resnet::TensorBlob> blobs;
  blobs.push_back(resnet::make_blob<float>("conv1.weight", {2, 2}, values));
  const std::vector<double> wide = {0.25, -8.0};
  blobs.push_back(resnet::make_blob<double>("fc.bias", {2}, wide));
  const std::string path = "/tmp/resnet_host_checkpoint.rsnt";
  resnet::save_checkpoint(path, blobs);
  const std::vector<resnet::TensorBlob> loaded = resnet::load_checkpoint(path);
  CHECK(loaded.size() == 2);
  CHECK(loaded[0].name == "conv1.weight");
  CHECK(loaded[0].dtype == resnet::DType::Float32);
  const std::vector<float> back = resnet::blob_values<float>(loaded[0]);
  CHECK(back.size() == values.size());
  for (std::size_t i = 0; i < values.size(); ++i) CHECK(back[i] == values[i]);
  const std::vector<double> back_d = resnet::blob_values<double>(loaded[1]);
  CHECK(back_d.size() == 2);
  CHECK(back_d[0] == 0.25);
  CHECK(back_d[1] == -8.0);

  bool threw = false;
  try {
    resnet::make_blob<float>("bad", {-1, 2}, {});
  } catch (const resnet::Error&) {
    threw = true;
  }
  CHECK(threw);

  threw = false;
  try {
    std::ofstream out(path, std::ios::binary);
    out << "NOTAFILE";
  } catch (...) {
  }
  try {
    resnet::load_checkpoint(path);
  } catch (const resnet::Error&) {
    threw = true;
  }
  CHECK(threw);
}

void test_mnist() {
  const std::string img = "/tmp/resnet_host_images.idx";
  const std::string lbl = "/tmp/resnet_host_labels.idx";
  {
    std::ofstream images(img, std::ios::binary);
    std::ofstream labels(lbl, std::ios::binary);
    write_be_u32(images, 2051);
    write_be_u32(images, 2);
    write_be_u32(images, 2);
    write_be_u32(images, 2);
    const unsigned char pixels[8] = {255, 0, 0, 0, 0, 255, 128, 0};
    images.write(reinterpret_cast<const char*>(pixels), 8);
    write_be_u32(labels, 2049);
    write_be_u32(labels, 2);
    const unsigned char ys[2] = {3, 7};
    labels.write(reinterpret_cast<const char*>(ys), 2);
  }
  const resnet::MnistSplit split = resnet::load_mnist_split(img, lbl);
  CHECK(split.size() == 2);
  CHECK(split.rows == 2 && split.cols == 2);
  CHECK(split.image(1)[1] == 255);
  std::vector<int> order = {1, 0};
  resnet::HostBatch batch;
  resnet::fill_batch(split, order, 0, 2, batch, 0.f, 1.f);
  CHECK(batch.labels[0] == 7);
  CHECK(batch.labels[1] == 3);
  CHECK(near(batch.images[1], 1.f, 1e-6));
  resnet::fill_batch(split, order, 0, 1, batch);
  const float expected = (1.f - resnet::kMnistMean) / resnet::kMnistStd;
  CHECK(near(batch.images[1], expected, 1e-5));

  const resnet::MnistSplit synth = resnet::make_synthetic_digits(40, 7);
  CHECK(synth.size() == 40);
  CHECK(synth.rows == 28 && synth.cols == 28);
  bool any = false;
  bool in_range = true;
  for (int i = 0; i < synth.size(); ++i) {
    if (synth.labels[static_cast<std::size_t>(i)] > 9) in_range = false;
    for (int p = 0; p < 28 * 28; ++p) {
      if (synth.image(i)[p] == 255) any = true;
    }
  }
  CHECK(any);
  CHECK(in_range);
  CHECK(synth.images != resnet::make_synthetic_digits(40, 8).images);
}

}  // namespace

int main() {
  test_geometry();
  test_init_and_elementwise();
  test_sgd_and_adam();
  test_cross_entropy();
  test_checkpoint();
  test_mnist();
  if (g_failed != 0) {
    std::cerr << g_failed << " checks failed\n";
    return 1;
  }
  std::cout << "host tests passed\n";
  return 0;
}
