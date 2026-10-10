# Cloudflare Turnstile

- ざっくり Google の reCPATCHA と同じような仕組み
  - フロントエンドにウィジェットを置いて、それが人間 or botの判定をする
  - で、その結果をサーバーに送って、サーバーで Cloudflare の API を呼ぶ
- Cloudflare のコンソールに下記の prompt のリンクが置いてあったけど文章長すぎて何書いてあるかよくわからんかった
  - https://developers.cloudflare.com/turnstile/spin/prompt.md
- 手順
  - cloudflare turnstile のコンソールでウィジェット作成
     - site key と secret を得られる
  - cloudflare workers へアプリをデプロイ
    - このとき独自ドメインにする必要あり
    - https://zenn.dev/kameoncloud/articles/cdf8f67bd8ce6f
  - シークレットを登録
    - `pnpm wrangler secret put TURNSTILE_SECRET`
    - プロンプトで値を聞かれるのでそこに turnstile のシークレットを入れる

## Links
- https://www.cloudflare.com/ja-jp/application-services/products/turnstile/
