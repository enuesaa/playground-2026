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
- AB テスト的なのできる
  - これはAWSでABテストしたいとき一番簡単じゃないかな
  - なんか雰囲気的に CodePipeline でカナリアリリース的なのできるようになりそうだなあーとうっすら思った。
- 取り急ぎネックはランタイムが Node.js しかない点
- マルチリージョンにデプロイしてもコンソール上は、関数を作ったリージョンにしか表示されないっぽい
  - ログはどうなのかは不明
- 認証は IAM かなし(アプリケーション管理)のいずれか
- OAC の例の問題が解消された様子。
  - ランタイムが Node.js 以外にも対応したらこちらが上位互換になりそうな印象ある
  - https://dev.classmethod.jp/articles/shuntaka-lambda-web-functions-cloudfront-oac/

## Links
- https://aws.amazon.com/jp/about-aws/whats-new/2026/10/aws-lambda-web-functions/
- https://dev.classmethod.jp/articles/aws-lambda-web-functions-ga-express/
