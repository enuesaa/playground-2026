# reCAPTCHA

- v2がパズルのやつでv3は自動的にチェックする系らしい
- Google Cloud と統合されたらしい
  - Fraud Defense のなかの reCAPTCHA Enterprise という名前
  - なのでそちらを使う必要がありそう
  - https://cloud.google.com/security/products/recaptcha?hl=ja
- v3 を試してみた。
  - 仕組みとしては以前と変わらない。
  - フロントエンドにウィジェットを置いてその中で勝手に評価される
  - その値をバックエンドへ送信
  - バックエンドで Google Cloud API を叩く感じ。
- 手順
  - Google Cloud で reCAPTCHA Enterprise API を有効化
  - Fraud Defense のなかの reCAPTCHA Enterprise というページを開く
  - キーを作成（そういう名前のリソース）
    - SITE_KEY をここで得る
    - PROJECT_ID は普通に Google Cloud のプロジェクトID
    - API Key ってのは Google Cloud の API Key。サーバーから reCAPTCHA Enterprise API を叩くのに必要。https://qiita.com/aizunoinu/items/0207ff5a9bf4b7e748dd

## Links
- https://laboratory.kiyono-co.jp/2070/gcp/
