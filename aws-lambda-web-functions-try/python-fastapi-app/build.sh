rm -rf package lambda.zip
uv export --no-dev --no-hashes --no-emit-project | uv pip install -r - --target package --python-platform aarch64-manylinux2014 --python-version 3.15 --only-binary=:all:
cp main.py package/
cd package && zip -r ../lambda.zip . && cd ..
