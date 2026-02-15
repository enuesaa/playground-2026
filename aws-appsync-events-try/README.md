# AWS AppSync Events

- 2024/10月ごろに登場
- AppSync (GraphQL) とは別物
- チャットアプリ的なのを簡単に作れる
  - pub/sub
  - publish して subscribe する
  - http/websocketで通信
  - amplifyに関する記述が多いが、別に使う必要はない
- 認証/認可
  - cognito/iam/api key など
- データソース (DynamoDB, OpenSearch, rdb, eventbridge, lambda, httpなど) へ接続できる
  - なんかLambdaが勝手にできて処理するタイプかと思ったら、そのままほんとに統合されてる様子
- API Gateway と責務が似ていると思った
  - 一方で、構造はけっこう違う
  - dynamodbへ素直に読み書きしたいときは、こっちの方がはるかに便利そう
- 活用できるところ色々ありそう
- HTTPも呼べる
  - がいまいち subscribe でどういう値が入ってくるのか理解できてない
  - https://docs.aws.amazon.com/appsync/latest/eventapi/http-function-reference.html

## Links
- https://zenn.dev/kmiura55/articles/appsync-events-chat
- https://dev.classmethod.jp/articles/appsync-event-api/
