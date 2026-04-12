# Cloudflare Queues

- キューイング
- 初見では AWS SQS に似てると思った。
- コンソールでメッセージをリストアップできる。また発行できる
  - 便利
  - この点で SQS より使いやすいのでは？と思ってしまう
- aws と同じで2回届くのはあるらしい
- consumer (http pull) を python で実装する方法もあるが、なんか動かず面倒になってやめた
  - wrangler-py 前提で組んであるっぽい。たぶん
  - 単体では使えない？
  - https://developers.cloudflare.com/queues/configuration/pull-consumers/#2-consumer-authentication

### メッセージの取得方法
Workers でとるか HTTP Pull するかの2択。
- Workers の場合は binding できる
- http pull の場合は API Key を発行する
  - ちなみに pull するには edit の権限が必要

```bash
curl "https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/queues/${QUEUE_ID}/messages/pull" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--data '{ "visibility_timeout": 10000, "batch_size": 2 }'
```

### Links
- https://www.cloudflare.com/ja-jp/developer-platform/products/cloudflare-queues/
- https://dev.classmethod.jp/articles/cloudflare-queues/
