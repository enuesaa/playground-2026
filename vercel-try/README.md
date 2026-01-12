# Vercel

- 本格的に使うのは地味に初めてかも
- まあ next.js とかフロントエンドアプリが動くよってだけ。
- db を立てようと思えば立てられる
- 相変わらず良くできてる。
  - DX が素晴らしい

## Commands

```bash
vercel login

# deploy to preview
vercel

# deploy to prod
vercel --prod

# pull .env.local
# edge config や blob store を作成したら、そこにアクセスできるよう .env.local を作成してくれる
vercel env pull
```

## cron Job
- cron みたいな仕組み
- api route を定期的に叩く感じ。
- wordpress の wp-cron と似たような仕組みかな。まあ vercel の方は必ず定期的に決まった時間に実行されるのだが
- いろいろ制限があるらしい。
  - prodだけ
  - hobby では1日1回まで。2 cron jobsまで
  - hobby ではタイムウィンドウ的になっているらしい。時間指定できない
    - `On the Hobby plan, Vercel cannot assure a timely cron job invocation. For example, a cron job configured as 0 1 * * * (every day at 1 am) will trigger anywhere between 1:00 am and 1:59 am.`
    - https://vercel.com/docs/cron-jobs/usage-and-pricing#hobby-scheduling-limits

## Edge Config

- フィーチャーフレグ的なの
- Edge の KV
- 例えばメンテナンスモードへの切り替えに使える
  - https://zenn.dev/putcho/articles/594cec9e2f2f68
- すごく便利
- Vercel の UI で Edge Config の設定をして、値をJSON形式でセットして、環境変数に Edge Config のURLを入れる感じ

## Blob Store

- オブジェクトストレージ
- ファイルをアップロードできる
- アップロードしたらURLが発行される
- Vercel のコンソールからファイルを確認可能
