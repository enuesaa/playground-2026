# AWS Cognito WebAuthn

- Cognito で WebAuthn 機能を使うにはエッセンシャルプランが必要
- 各ユーザーについてパスキーが登録されているかはAWSコンソールで見れないっぽい
  - `aws cognito-idp list-web-authn-credentials` で情報を見れるけどユーザーのアクセストークンが必要
  - まあログインしたらユーザーへ出せそうだし実用上の問題はないとおもう
