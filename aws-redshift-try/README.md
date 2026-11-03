# AWS Redshift

- いわゆる列指向のDB
- Big Query に思ったよりも似ている
- VPCリソースっぽい。subnetやsgを選択する必要ある
- Serverless あり
  - namespace とワークグループがある。1:1らしい
  - ワークグループというのはコンピューティングのこと。
  - VPC の設定とかはワークグループ持ち
  - namespace ってのは OpenSearch Serverless の Collection 的なものかも。
- 思ったより使いやすい
- クエリエディタ的なのもある
  - <img src="./queryeditor.png" width="600px" />

## Links
- https://www.ctc-g.co.jp/solutions/cloud/column/article/154.html
