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
