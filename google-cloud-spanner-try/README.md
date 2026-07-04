# Spanner

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
  - エディションってのは2024年に生まれたものらしい
    - https://zenn.dev/cloud_ace_jp/articles/introducing-spanner-editions
- 料金
  - コンピューティング料金だけでいうと Standard エディションで $683/月 (tokyo)
    - 思っていたほど高くはないがそれなりにはするなあ。
    - これは 1ノード (1000 Processing Units) の時の料金かも。
    - 参考サイトには16,000円/月くらいの金額からって書いてある
  - 処理ユニット(PU)って概念がありデフォルトは1000。最小100
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

## Links
- https://blog.g-gen.co.jp/entry/cloud-spanner-explained
- https://zenn.dev/apstndb/articles/spanner-cost-comparison-firestore
- https://silasol.la/posts/2025-12-16-01_cloud-spanner/
