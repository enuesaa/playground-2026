# AWS Lambda Web Functions

- これまでの関数は Event Functions と呼称されるようになった。
- Hello World テンプレートが用意されていてボタン一発でデプロイできる
  - 典型的な Node.js のウェブサーバー
- ランタイムは今のところ Node.js 24.x だけ
  - これは意外
  - 今後増えるだろうけどもこれだけとは。
- Function の中に Endpoint という概念がある
  - Endpoint では認証認可とかデプロイ先のリージョンを指定できる
- VPC に接続できる模様
  - MicroVMs に謎にネットワークコネクタってリソースがあって宙に浮いている感じがしてたが、それは Web Functions でも利用するからっぽい
- 環境変数を設定可能
  - SecretsManager との統合はされてないっぽい
- コードを変更したら概ね数秒でデプロイできる

## Links
- https://aws.amazon.com/jp/about-aws/whats-new/2026/10/aws-lambda-web-functions/
- https://dev.classmethod.jp/articles/aws-lambda-web-functions-ga-express/
