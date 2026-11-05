#pragma once

#include <cmath>
#include <cstdint>
#include <vector>

namespace resnet {

// SplitMix64. Deterministic across platforms, unlike std::normal_distribution.
class SplitMix64 {
 public:
  explicit SplitMix64(std::uint64_t seed) : state_(seed) {}

  std::uint64_t next() {
    std::uint64_t z = (state_ += 0x9e3779b97f4a7c15ULL);
    z = (z ^ (z >> 30)) * 0xbf58476d1ce4e5b9ULL;
    z = (z ^ (z >> 27)) * 0x94d049bb133111ebULL;
    return z ^ (z >> 31);
  }

  // (0, 1) with 53 bits of mantissa. Never returns 0.
  double uniform_open() {
    double u = static_cast<double>(next() >> 11) * (1.0 / 9007199254740992.0);
    if (u < 1e-12) u = 1e-12;
    return u;
  }

  double normal() {
    const double u1 = uniform_open();
    const double u2 = uniform_open();
    constexpr double kTwoPi = 6.28318530717958647692;
    return std::sqrt(-2.0 * std::log(u1)) * std::cos(kTwoPi * u2);
  }

 private:
  std::uint64_t state_;
};

inline std::uint64_t mix_seed(std::uint64_t seed, std::uint64_t index) {
  SplitMix64 rng(seed ^ (index * 0x9e3779b97f4a7c15ULL));
  return rng.next();
}

inline double he_stddev(int fan_in) {
  return std::sqrt(2.0 / static_cast<double>(fan_in < 1 ? 1 : fan_in));
}

// He normal: N(0, sqrt(2 / fan_in)). fan_in for conv is in_channels * kH * kW.
template <typename T>
std::vector<T> he_normal(std::size_t count, int fan_in, std::uint64_t seed) {
  SplitMix64 rng(seed);
  const double scale = he_stddev(fan_in);
  std::vector<T> out(count);
  for (std::size_t i = 0; i < count; ++i) {
    out[i] = static_cast<T>(rng.normal() * scale);
  }
  return out;
}

template <typename T>
std::vector<T> constant_fill(std::size_t count, T value) {
  return std::vector<T>(count, value);
}

}  // namespace resnet
