# crystal

- 前から知ってたけど試したことなかったっぽい
- ruby の syntax 風味の言語
- 静的型付け
- LLVM でコンパイル。バイナリを作れる。動的リンクする
- 普通に動く。安定してそうに見える

install
```bash
brew install crystal
```

hello
```bash
crystal run hello.cr
crystal build hello.cr --release --no-debug
./hello
```

curlもどき
```bash
➜ crystal run mycurl.cr -- https://example.com
HTTP 200
<!doctype html><html lang=en><head><meta ..
```

## Links
- https://crystal-lang.org/
