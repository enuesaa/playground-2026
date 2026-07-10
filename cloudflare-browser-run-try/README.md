# Cloudflare Browser Run

- リモートでヘッドレスブラウザが動く
  - おそらく puppeteer ペース
  - よく分からないが cloudflare が puppeteer をフォークしているっぽい
- Browser Run 自体は Container の上に乗っかっている
  - https://blog.cloudflare.com/browser-run-containers/
- QuickAction というのが用意されている
  - https://developers.cloudflare.com/browser-run/quick-actions/
  - スクショを撮ったり HTML を解析したりリンクを取り出したりJSON形式にしてくれるっぽい（AI使って）
  - 結構いっぱいあるし便利そう
- QuickAction でまかなえないものは @cloudflare/puppeteer 経由でいろいろできるっぽい
  - goto したり
  - @cloudflare/puppeteer は内部で `env.BROWSER.fetch()` を呼び出すんじゃないかなおそらく。
    - type に書かれている説明文を見る限り
- 思ったより全然便利そう
- コンソールでブラウザのアクション履歴が見れる。これは興味深い

## Links
- https://developers.cloudflare.com/browser-run/get-started/#browser-sessions
