# Google Cloud Certificate Manager

- AWS における ACM みたいなもん
- 証明書を発行して LB に紐づける
- DNS認証できる
  - LB認証？っていうのもあるらしい
  - https://docs.cloud.google.com/certificate-manager/docs/deploy-google-managed-lb-auth?hl=ja
- 発行してみたら普通に証明書をダウンロードできた。エクスポートできるみたい。
- 料金
  - 100件までは無料
  - https://cloud.google.com/certificate-manager/pricing?hl=ja

## Links
- https://blog.g-gen.co.jp/entry/google-managed-cert-with-dns-auth
- https://iret.media/104183
- https://dryaki.gicloud.co.jp/articles/certificate-manager
- https://belonginc.dev/members/ttyfky/posts/leverage-certificate-manager-in-cloud-run/
