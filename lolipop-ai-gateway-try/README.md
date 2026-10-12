# Lolipop AI Gateway

- ロリポップの新サービス？
  - 2026年8月末にできたらしい
- いわゆる AI Gateway
  - OpenAI の SDK の向き先をロリポップに変えるだけ
  - 裏側はどうなっているのだろう。
- AWS でいう Bedrock 相当
- いろんなモデルがある
- 呼び出し回数とかに制限をかけられる
- モデルによってはドキュメントが不十分そうかも
- codex でも使えるかも
  - https://ai-gateway.lolipop.jp/docs/guides/sdks/codex
  - codex を実行したら最初に「Provide your own API key」ってモーダルみたいなのが出てくるのでそれにAPI Keyを入力するのが良さそう。必ずしも `CODEX_API_KEY=` に入れる必要はない
  - あと codex のデフォルトのモデルが Lolipop にないことがあるので、/model でモデルを変える

## Links
- https://lolipop.jp/ai/gateway/
