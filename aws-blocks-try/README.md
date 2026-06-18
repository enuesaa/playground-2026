# AWS Blocks

- 今のところ CDK を使って作るウェブアプリという理解
- チュートリアル
  - https://docs.aws.amazon.com/blocks/latest/devguide/getting-started.html
  - `pnpm dev` でローカル開発環境を立ち上げ。すると `localhost:3000` にウェブアプリが立ち上がる
  - ローカル開発環境はAWSのクレデンシャル不要っぽい
  - データはファイルとして保存してそう。`./.bb-data` に。
    - これなんかすごい既視感がある
    - cloudflare の emdash もこんな感じだった記憶
  - ローカルでの挙動を見る限りただのウェブフレームワークだな
- サンプルコードを見てみたら。
  - フロントエンドは中身がすごく小さい
    - lit で実装されてる
  - バックエンドはどこで動く想定かわかってない。
    - ロジックがあるので、どこかでホスティングする想定と思う
    - DynamoDB を使うってのはわかるのだが、コンピューティングが何かわからんな。Lambda かな
    - https://docs.aws.amazon.com/blocks/latest/devguide/getting-started.html#getting-started-explore-backend

- テレメトリをオフにするには `npx blocks-telemetry --disable`

## Links
- https://aws.amazon.com/about-aws/whats-new/2026/06/aws-blocks-preview/
- https://github.com/aws-devtools-labs/aws-blocks
