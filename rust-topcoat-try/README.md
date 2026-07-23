# Topcoat

- rust のウェブフレームワーク
- tokio が作ってるらしい
- axum との違い
  - https://tokio.rs/blog/2026-07-22-announcing-topcoat#what-about-axum
  - axum の方が薄め？
- Topcoat UI というのもあるらしい
  - https://github.com/tokio-rs/topcoat#premade-components-you-can-edit
- tailwind が使える
- よくできている。久しぶりにわくわくした

## Commands
```bash
# デフォルトのポートは3000
cargo run

# topcoat cli
cargo install topcoat-cli

# ホットリロードできる
topcoat dev

# shadcn/ui ライクかな？
topcoat ui init
```

## Links
- https://github.com/tokio-rs/topcoat
- https://tokio.rs/blog/2026-07-22-announcing-topcoat
