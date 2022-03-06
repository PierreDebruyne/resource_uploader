mkdir tmp

mkdir tmp/linux
cp apps/linux/* tmp/linux/
cp binaries/resource_uploader-linux tmp/linux

rm -rf builds
mkdir builds
zip -j builds/resource_uploader-linux.zip tmp/linux/*

rm -rf tmp/
