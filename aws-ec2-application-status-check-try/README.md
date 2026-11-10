# EC2 Application Status Check

- EC2インスタンスに対して死活監視をできる
- HTTP 80 番ポートへ 1 分おきにリクエストを投げてそのステータスコードが200であるか、は設定できた
  - メトリクスが発行されるのではなく、あくまで成功/失敗の2値
  - そのためどちらかというと集中管理用に思える
- ステータスチェックアラームというのは実体は CloudWatch Alarm

## Links
- https://aws.amazon.com/about-aws/whats-new/2026/08/amazon-ec2-application-status-checks/
