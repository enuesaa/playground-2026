# Bref

- PHP アプリを lambda でホストできる
- 構成
  - ウェブ: API Gateway (HTTP API) + Lambda
  - Artisan: EventBridge + Lambda
  - CloudFront とも統合されており、そっちからリクエストを受けることもできるっぽい
- PHP 8.3 の Lambda レイヤーがついていた
  - https://runtimes.bref.sh/?region=ap-northeast-1
- Severless Framework ベース
  - なんか有料化以降、OSS の Severless Framework が登場して、同じ serverless コマンドで使えるっぽい
  - `npm install -g osls`
  - https://github.com/oss-serverless/serverless
  - https://qiita.com/kenpi1313/items/f4ab501ed3daad25f81f
- あんがい事例あるっぽい
  - https://serverless.co.jp/blog/038/
  - https://creators.bengo4.com/entry/2025/12/14/000000

## Links
- https://bref.sh/
- https://kakakakakku.hatenablog.com/entry/2026/03/17/090726
