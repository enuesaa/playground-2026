# spanner

- 水平スケールするRDBって認識
- 作る時は、リージョンを選んでインスタンス名/IDを入力する
  - ストレージは10GBだった
  - 無料トライアルだからこうなっているのかな
- エディションっていうのがあるらしひ
  - http://docs.cloud.google.com/spanner/docs/editions-overview
  - Standard/Enterprise/Enterprise Plus の3段階
  - Enterpriseから全文検索が使える
    - 増分バックアップもEnterpriseからだな..
    - 実務では Enterprise も視野にいれざるをえないかも?
- 料金
  - コンピューティング料金だけでいうと Standard エディションで $683/月 (tokyo)
  - 思っていたほど高くはないがそれなりにはするなあ。
  - https://cloud.google.com/spanner/pricing

## サンプルアプリ
Go から接続してみた。クレデンシャルのJSONファイルをいつもは渡してたけど `gcloud auth application-default login` ってコマンドでログインできるのを知った。

```bash
➜ gcloud auth application-default login

➜ go run .
=== Read ===
UserId=456 Email=user456@example.com
UserId=106814 Email=robertsbrandon@example.net
=== Insert ===
Insert completed.

➜ go run .
=== Read ===
UserId=8 Email=exampletest@example.com
UserId=456 Email=user456@example.com
=== Insert ===
panic: spanner: code = "AlreadyExists", desc = "Row [8] in table Users already exists", requestID = ""
```
