# AWS EventBridge Webhook

- EventBridge で Webhook がサポートされた
- Custom Event Bus を作成して、それに投げられる感じ
  - しれっと Event Bus も新しくなってそう？
  - もともとのやつは Classic って表示がされている
- Custom Event Bridge を作成して、それに Event Source というリソースを作成する
  - そこで Webhook というタイプのものがあるからそれを選択
  - 認証方法も選択
  - 固定文字列とかBasic認証とかHMACを選べるよう
- 作成したら SecretsManager にシークレットが置かれる

```bash
curl https://xxx.events-webhook.us-east-1.on.aws/xxx/ \
  --json '{"specversion":"1.0","type":"com.example.event","source":"my-service","data":{"key":"value"}}' \
  -H 'X-Webhook-Token:xxx'
```

## Links
- https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-custom-bus-webhook-sources.html
