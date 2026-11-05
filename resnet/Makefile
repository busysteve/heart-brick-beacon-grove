# Host tests only. The CUDA library is built with CMake — see README.md.
CXX ?= g++
CXXFLAGS ?= -std=c++17 -Wall -Wextra -Werror -I include

.PHONY: test
test:
	mkdir -p build
	$(CXX) $(CXXFLAGS) tests/test_host.cpp src/serializer.cpp src/mnist.cpp -o build/test_host
	./build/test_host
