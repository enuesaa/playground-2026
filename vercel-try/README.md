# Vercel

- 本格的に使うのは地味に初めてかも
- まあ next.js とかフロントエンドアプリが動くよってだけ。
- db を立てようと思えば立てられる

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
