#!/bin/sh
# Uncompressed IDX files, the layout mnist_train --data expects.
set -eu
dest=${1:-data/mnist}
mkdir -p "$dest"
base=https://ossci-datasets.s3.amazonaws.com/mnist
for name in train-images-idx3-ubyte train-labels-idx1-ubyte t10k-images-idx3-ubyte t10k-labels-idx1-ubyte; do
  if [ ! -f "$dest/$name" ]; then
    curl -fsSL "$base/$name.gz" -o "$dest/$name.gz"
    gunzip -f "$dest/$name.gz"
  fi
done
echo "MNIST IDX files are in $dest"
