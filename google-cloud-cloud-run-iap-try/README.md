# Cloud Run IAP

- ALB での Cognito 認証に近い
- Cloud Run の設定画面に「認証が必要です」「Identity-Aware Proxy（IAP）」というチェックボックスがあるのでそれを有効化すると、IAP API が有効化されて、ページを見るのにGoogleアカウントでのログイン画面が出てくる
- IAP の設定画面で、特定ユーザーのメアドをプリンシパルに入れて「IAP-secured Web App User」というロールを付与すれば良い
- こういうのできるの知らなかった。
- 手順さえわかれば手軽。GUIで全部できそう

## Links
- https://kakakakakku.hatenablog.com/entry/2026/06/25/125109
- https://qiita.com/tomoyuki-suzuki/items/26533d96ffb93c52a96c
