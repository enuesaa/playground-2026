# aws-s3pipeline

- S3::PutObject イベントを起点に、CodePipeline を実行する
- だいぶ前に試したやつ
- 記憶では、S3 のイベントの検知の仕方がいくつかある
  a. ポーリング型
  b. EventBridge で検知する方法
  - https://dev.classmethod.jp/articles/codepipeline-s3-trigger-hooked-on/

- ここでは b の実装の仕方をしているはず。
