# dogwood

- ポリシー言語
- cedar みたいな。
- cli がある？
  - https://github.com/dogwood-policy/dogwood
  - rust で書かれているっぽい
- ベースは cedar っぽい？
  - cedar にステートを加えた感じ？
  - 初見では waf の動的なルール的な印象を覚えた
- read after login という example がわかりやすい
  - https://github.com/dogwood-policy/dogwood/tree/main/dogwood-docs/examples/read_after_login
  ```bash
  dogwood validate policy.dw --policy-schema schema.cedarschema
  dogwood lower policy.dw --policy-schema schema.cedarschema --emit both # cedar になおす?っぽい
  dogwood replay policy.dw --policy-schema schema.cedarschema --trace trace.log # これはログファイルからリプレイするっぽい
  ```
- ステートはどこに保存するのだろう。がっつりシステムに組み込む必要ありそうに見えている

## Links
- https://aws.amazon.com/jp/blogs/opensource/introducing-dogwood-runtime-verification-for-ai-agents/
- https://github.com/dogwood-policy/dogwood
- https://zenn.dev/exwzd/articles/20260813-dogwood-agent-policy
