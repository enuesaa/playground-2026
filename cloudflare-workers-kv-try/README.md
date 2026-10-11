# Cloudflare Workers KV

- まあKVだね
- だいぶ前に触った事あるはず
- Durable Objects との使い分けは悩むが設計的に KV の方がシンプルであるから KV で十分な場合にはそっちがいいかも

デプロイ
```bash
pnpm wrangler kv namespace create MY_KV
pnpm wrangler deploy
```

動作確認
```bash
$ curl -X PUT -d 'testst' <workerのurl>
put ok

$ curl -X GET <workerのurl>
testst
```

## Links
- https://www.cloudflare.com/ja-jp/developer-platform/products/workers-kv/
