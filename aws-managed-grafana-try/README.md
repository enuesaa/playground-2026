# AWS Managed Grafana

- grafana のマネージドサービス
- datasource として cloudwatch や xray を指定できる
  - というかAWSコンソールで選択するとそういうふうにセットアップしてくれる
- 認証認可は AWS SSO か SAML
  - ちなみに aws sso へログインした後の画面のデザインが最近変わったっぽい
- ユーザーの種別というのがあるらしい
  - 管理者
  - 閲覧者 ... デフォルトはこっち？
- アクティブユーザーだけが請求されるらしい
  - とりあえずアカウント発行するだけもありかな
  - 管理者が9ドル。閲覧者が5ドル
- まあ普通に garfana だな

## Links
- https://pages.awscloud.com/rs/112-TZM-766/images/AWS-Black-Belt_2025_Amazon-Managed-Grafana_0831_v1.pdf
- https://dev.classmethod.jp/articles/amazon-managed-grafana-awssso/
