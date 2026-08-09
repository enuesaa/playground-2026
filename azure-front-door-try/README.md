# Azure Front Door

- CDN
- AWS でいう CloudFront に相当
- オリジンを選んで、そこへルーティングできる
  - 例えばAzure Static Web Appsを選べる
  - 配信元グループと呼ぶ
- CloudFront でいうビヘイビアの概念もある
- 料金はそこそこ高いかも
  - 0円からスタートできない
  - 立っている時間だけお金かかる？
    - Standard plan で $35/month
    - https://azure.microsoft.com/ja-jp/pricing/details/frontdoor/
  - あとデータ転送料金
- なんか思ったより難しい
  - 管理画面で設定してからラグがあるっぽい
  - 初回構築でなんか page not found ってのが表示されることが多い？けどカスタムドメインを追加とかしてたらいつの間にか表示されている

## Links
- https://zenn.dev/headwaters/articles/7ed3a8aecbba57
