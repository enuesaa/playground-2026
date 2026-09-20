---
name: no-comments
description: Avoid unnecessary comments when writing or editing code. Use whenever writing, generating, or editing source code.
---

基本的にコメントを書かないこと。
- 自明なことを説明するコメントは禁止である
- コードのブロック分けのためにコメントを書くのは許可するが、1単語にすること。

### Bad
```go
// README.md を読む
os.Read("./README.md")
```

### Good
```go
// Setup
db := connectDB()
cache := connectCache()

// Validation
if err := validate(input); err != nil {
  return err
}
```
