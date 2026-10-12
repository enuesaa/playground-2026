# Cloudflare Hyperdrive

- DB へ接続するサービス
- Cloudflare 外にホストされている DB への接続情報を保存したり、実際に接続する（クライアント）
- 基本的には Cloudflare Workers VPC の Tunnel 経由で DB へ接続
- Cloudflare Worker に Hyperdrive を binding して DB へ接続できる

## Links
- https://developers.cloudflare.com/hyperdrive/
- https://zenn.dev/kameoncloud/articles/217263d6c87815
