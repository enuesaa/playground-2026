# AWS DocumentDB

- mongodb 互換
- 概念的には rds に似ている
  - サブネットグループ、パラメータグループ、バックアップの設定、パフォーマンスインサイトなど
- インターネットからアクセスできないっぽい
  - 踏み台(bastion)経由でのアクセスになりそう
  - ssm でポートフォワーディングしたら多分アクセスできる
  - 今回は面倒だったので ec2 から直接 documentdb にアクセスした。
  - https://docs.aws.amazon.com/ja_jp/documentdb/latest/developerguide/connect-from-outside-a-vpc.html
