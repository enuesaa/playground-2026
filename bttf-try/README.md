# bttf

- 日付関係の便利ツール
- フォーマットやタイムゾーン変換、時刻操作ができる
- なんか新鮮。興味はある
- rust 製

```bash
➜ bttf time fmt now
2026-06-04T21:00:14.040296+09:00[Asia/Tokyo]

➜ bttf time fmt now -f %Y-%m-%d
2026-06-04

➜ bttf time fmt now -f rfc3339
2026-06-04T21:00:07.042361+09:00

➜ bttf time fmt now -f %Y-%m-%d
2026-06-04

➜ bttf time add -1w now
2026-05-28T21:00:33.869691+09:00[Asia/Tokyo]
```

## Links
- https://github.com/BurntSushi/bttf
