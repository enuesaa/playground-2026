# Lolipop デプロイナウ

- 主にフロントエンドアプリのホスティングサービス
  - 立ち位置としては Vercel に似ている
  - ソースコードをアップロードしてクラウドでビルド & デプロイするタイプっぽい
- npm しか使えないっぽい
  - pnpm のコマンドを渡したら `WARN: pnpm-lock.yaml / yarn.lock を検知しました。本プラットフォームは npm に統一しているため無視されます。` というエラーメッセージが表示された。
- 料金プラン
  - 無料プランあり
  - 何となく法人で使う際はサポートついていた方が無難に思える
  - https://lolipop.jp/deploy-now/#pricing

## Commands
```bash
### Install lolipop cli
$ npm add -D lolipop
$ npx lolipop health
Operational

### Login with browser
$ npx lolipop login

### 利用できるフレームワークのリスト
$ npx lolipop frameworks list
┌────────┬────────────┐
│ 名前   │ 表示名     │
├────────┼────────────┤
│ next   │ Next.js    │
│ nuxt   │ Nuxt       │
│ static │ 静的サイト │
└────────┴────────────┘

### プロジェクトを作成してデプロイ
$ npx lolipop deploy --name aaaa --framework static --output dist --root . --domain aaaa --install 'npm i' --build 'npm run build'

### 再デプロイ
$ npx lolipop deploy
```

## Links
- https://lolipop.jp/deploy-now/
