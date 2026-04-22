# さくらのクラウド

## IAM系
- ユーザーの追加
- サービスプリンシパルの追加
- 権限の付与

ができる。  

- いわゆるIAMロールは事前定義されているらしい
- IAMポリシーでプリンシパル（ユーザーやサービスプリンしパスなど）を選んで権限（IAMロール）を付与する感じ

構造的には Google Cloud の IAM に似ているかな。  
サービスポリシーという AWS SCP 相当の機能もある様子。  
https://manual.sakura.ad.jp/cloud/controlpanel/settings/service-policy.html

## プロダクト全般
- 東京1,2,石狩1,2,3,sandboxというゾーンがある様子
- sandbox はテスト用の環境
  - https://manual.sakura.ad.jp/cloud/server/sandbox.html
  - コスト的に大丈夫なのかしらんがこういうのがあるのはいいなと思った

## サーバー
- EC2相当
- まあサーバーだね。
- 特段変わったことはない。
- これはさくらのVPSとかと正直同じじゃないかな。まあリソースを上下できるのはあるが。
- IPアドレスとる時月額最低料金がありそうなので注意。たぶん

## Links
- https://cloud.sakura.ad.jp/column/sakura-cloud-network-starter-1/
- https://cloud.sakura.ad.jp/example/
- https://zenn.dev/sakura_internet/articles/6050096aa9bc13
