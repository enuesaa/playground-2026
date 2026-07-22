# AWS CloudWatch Coding Agent Insights

- CloudWatch で claude code のトークン数とか誰が使っているのか確認できるようになった。
- これは使う側の機能ではなくて管理する側の機能っぽい
  - 例えば部署単位やロケーションでトークン数を確認できる
- 確認できるのはトークン数やコスト（正確なのか不明）やコード量や Input/Output の別のトークン数とか
- ベースは CloudWatch Metrics らしい
  - APIキーを発行してそれを環境変数にセットして、あと otel の設定とかしたらいけた
  - ぶっちゃけ導入面倒かも
  - https://docs.aws.amazon.com/ja_jp/AmazonCloudWatch/latest/monitoring/coding-agents-claude-code-bearer-token.html
  - 企業向けには別の設定方法があるっぽい
