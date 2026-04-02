# emdash

- cloudflare が作った CMS
- 管理画面のデザインはまんま wordpress
  - wordpress からデータを移行できるらしい
- 触った感じ、普通の CMS という印象
  - 雑に作った感じはしない
  - ある程度本気なのだと思う
- astro & worker & d1 ベース
  - cloudflare で CMS を作るならこれだ！って感じの構成
  - なぜ astro なのかはよくわからんが、まあマークダウンもかきやすいから、、という判断なのかな。不明。
    - ちなみに cloudflare の worker のテンプレに astro があったのでそれなりに推しているのだろう
- プラグインシステムはある
  - ただし完全にゼロから。
  - wordpress のプラグインを移行できるわけではない
  - 今現状は、cloudflare 公式のものにしかない
  - どれだけコミュニティとして発展するかは見もの。
  - form というプラグインがあるのは気になる
    - google form レベルの簡単なものは作れそう
    - だがurlがどこにあるかわからなかった
    - 期待
- 概して普通のCMS
  - クラウドネイティブにサーバレスに作るとこうなるよね？という感じ
  - プラグインの実行環境を v8 で隔離？しているようで、それはなるほどなーと思った。
- headless cms にしよう！みたいな感じはしない
  - あくまでデザインと一体

## Links
- https://blog.cloudflare.com/emdash-wordpress/
- https://zenn.dev/z4ck_key/articles/try-emdash-cms
- https://dev.classmethod.jp/articles/tried-emdash-astro-based-oss-cms-by-cloudflare/
