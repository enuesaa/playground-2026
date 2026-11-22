# AWS ExtendDB

- RDB を DynamoDB API で操作できる
- どちらかというと Emulator という感じをした。
  - 既存の RDB にかぶせて Dynamo DB API に操作するわけではないらしい

## Commands
立ち上げ
```bash
docker compose up
sqlite3 data/extenddb.sqlite 
```

```bash
export AWS_ENDPOINT_URL=http://127.0.0.1:18080
export AWS_DEFAULT_REGION=us-east-1

### 注意
### なんかExample用のキーがあるらしくそれを指定しないと動かないっぽい
### see https://github.com/ExtendDB/extenddb/blob/8c643330c8a31f877b5d4c284904ba7eba043ea6/docs/dev-image.md?plain=1#L21
export AWS_ACCESS_KEY_ID=
export AWS_SECRET_ACCESS_KEY=

### Create Table
aws dynamodb create-table --table-name memos --attribute-definitions AttributeName=pk,AttributeType=S AttributeName=sk,AttributeType=S --key-schema AttributeName=pk,KeyType=HASH AttributeName=sk,KeyType=RANGE --billing-mode PAY_PER_REQUEST
aws dynamodb list-tables

### Put Item
aws dynamodb put-item --table-name memos --item '{"pk":{"S":"user#1"},"sk":{"S":"profile"},"name":{"S":"alice"}}'
aws dynamodb get-item --table-name memos --consistent-read --key '{"pk":{"S":"user#1"},"sk":{"S":"profile"}}'

### Query
aws dynamodb query --table-name memos --key-condition-expression 'pk = :pk' --expression-attribute-values '{":pk":{"S":"user#1"}}'
```

SQLite をみにいったらこんな感じ。これはdevのイメージだからこうなっているのか。不明。
```bash
extenddb.sqlite-> .table
backup_index iam_group_members iam_sessions schema_history tables ...

extenddb.sqlite-> select table_name from tables limit 1;
╭────────────╮
│ table_name │
╞════════════╡
│ memos      │
╰────────────╯
```

## Links
- https://aws.amazon.com/jp/about-aws/whats-new/2026/11/aws-extenddb-1-0/
