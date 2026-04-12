# Google Cloud Storage + LB + CDN

AWS でいう S3 + CloudFront の構成を試す

- Cloud Load Balancing をはさむ必要があるらしい
  - というか Cloud CDN が Cloud Load Balancing の一機能であり、Cloud CDN の作成 = Cloud Load Balancing の作成になるみたい
  - 必然的に CDN と言いつつ Aレコードが払いだされる
  - 料金は微妙
    - 転送ルールの数 & 転送量で費用がかかるってことかな。
    - AWS とだいたい同じくらいな料金になりそう
    - https://cloud.google.com/vpc/network-pricing?hl=ja#cloud-load-balancing
- Cloud CDN
  - キャッシュ削除機能あり
    - これはAWSとほぼ一緒
  - カスタムレスポンスヘッダーもつけられる
  - キャッシュポリシー的なのもあり
  - ネガティブキャッシュというのもある
  - CloudFront Functions, lambda@Edge 的なのはない
- Cloud Storage の設定
  - なんかバケットを非公開にするのは簡単じゃないらしい
  - allUsers に閲覧者権限を付与しないと、Cloud LB からオブジェクトを取得できなかった
    - あっているか不明
    - 何も案内がないのでちょっとコンソールが不親切だと思う

## Links
- https://techblog.nhn-techorus.com/archives/30565
- https://iret.media/107854
