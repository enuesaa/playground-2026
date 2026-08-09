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
- Azure Storage の静的ウェブサイトホスティングをオリジンとして指定可能
  - そもそも Storage アカウントを作って、そこで静的ウェブサイトホスティングを有効化する
  - で、$web というところ？にファイルをアップロードすると外から見れるようになる
  - https://qiita.com/yotan/items/69ea9c005bb2bff32f45
  - のでそのURLを目掛けてオリジン設定すれば良い
  - Front Door Premium では Private Link で接続できる。実務ではそっちだろうなあ。
    - https://learn.microsoft.com/ja-jp/azure/frontdoor/standard-premium/how-to-enable-private-link-storage-account?pivots=front-door-portal
    - http://tech-blog.cloud-config.jp/2025-02-14-azure-frontdoor-privatelink-applicationgateway
- App Service をオリジンにするのもできる
  - オリジンへの直アクセスも制限可能
  - 比較的柔軟。筋がいいと思う
  - https://dev.classmethod.jp/articles/azure-front-door-app-service-access-restrict/
- なんか思ったより難しい
  - 管理画面で設定してからラグがあるっぽい
  - 10~30分くらい見た方がいい
  https://qiita.com/developer-kikikaikai/items/abe391d597df873c2ac4
  - 初回構築でなんか page not found ってのが表示されることが多い？けどカスタムドメインを追加とかしてたらいつの間にか表示されている

## Links
- https://zenn.dev/headwaters/articles/7ed3a8aecbba57
