# AWS Tunnel Endpoints

- 何となくわかった
- VPC Peering と Endpoint Service の間って理解
- 具体的な運用は考える必要ありそう
  - どこで使うべきか、ちょっと悩む

## 手順
- terraform apply
- vpc a
  - Resource Gateway を作成
  - Resource Configuration を作成
- vpc b
  - Tunnel Endpoint を作成
  - EC2からvpc aへ接続

## Links
- https://aws.amazon.com/jp/about-aws/whats-new/2026/9/privatelink-tunnel-endpoint/
- https://dev.classmethod.jp/articles/aws-privatelink-tunnel-endpoint-cross-account/
