# Amazon Neptune

- グラフDB
- 前提として Neptune には DB と Analytics の2つがある
  - 今回は DB
  - Analytics は 2023 年の re invent で発表されたっぽい
  - https://dev.classmethod.jp/articles/news-ga-amazon-neptune-analytics/
  - Analytics は詳細を見れてないが分析系の機能っぽい。
- 外から接続するには IAM DB 認証にチェックを入れる必要がある？ぽい
- グラフの可視化方法
  - 基本的に gremlin に対応していれば使えるはず
  - だが IAM DB 認証が面倒なので例えば踏み台経由にしたりする必要ありそう
  - aws/graph-explorer
    - ローカルで docker compose で立ち上げてみているが、なんか接続できない
    - https://dev.classmethod.jp/articles/tried-graph-explorer-a-graph-db-visualization-tool-from-aws/
- サーバーレスもある
  - https://dev.classmethod.jp/articles/serverless-is-now-available-for-amazon-neptune-a-graph-database/

## Links
- https://pages.awscloud.com/rs/112-TZM-766/images/AWS-Black-Belt_2023_Amazon%20Neptune_0730_v1.pdf
