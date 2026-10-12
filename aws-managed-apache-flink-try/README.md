# AWS Managed Apache Flink

- Kinesis Data Analytics と呼ばれていたもの
- 雑にいうと分析系
- 2つのタイプがある
  - Apache Flink applications
  - Studio notebooks
- 手軽なのは Studio notebooks で、これはデータをストリーミングしてくる必要がない。
  - というか逆にいうと前者は Kinesis Firehose とかに繋げる。
  - いつも思い浮かべたtのは前者だけど。
- とりあず Studio notebooks を試す
  - Create notebook して Run ボタンを押したら立ち上がる様子
  - その先で見えるのは Zeppelin と Apache Flink のUI
- Zeppelin は初見では Jupyter Notebook ライクな印象。
  - SQLを実行できる？
  - でそのSQLの実行結果をリアルタイムに取得できる？
  - ウィジェットの近くに Apache Flink へのリンクがあって、それをクリックすると Flink 側のUIを見れる
- どんな時に使うのかわかってないかも

## Links
- https://dev.classmethod.jp/articles/try-amazon-managed-service-for-apache-flink-studio/
- https://aws.amazon.com/jp/managed-service-apache-flink/studio/
