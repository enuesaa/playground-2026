# R2

- 地味にこれまで触ったことなかったかも
- オブジェクトストレージ
- Public Development URL というので静的ウェブホスティングできる
  - Development ってついているのだけ気になるが、普通にホスティングできた
  - CSSも読み込めたので間違いない
  - https://developers.cloudflare.com/r2/buckets/public-buckets/#public-development-url
- S3 API との互換性
  - https://developers.cloudflare.com/r2/api/s3/api/
  - AWS CLI でアップロードできた
  - R2 のコンソールに AWS アクセスキー相当のトークンを発行する画面がある
    - R2 専用っぽい
    - Read/Writeとか権限設定できる

```
AWS_ACCESS_KEY_ID=<R2 Access Key ID>
AWS_SECRET_ACCESS_KEY=<R2 Secrets Access key>
aws s3 cp ./a.html s3://<bucket>/a.html --endpoint-url https://<accountID>.r2.cloudflarestorage.com
```