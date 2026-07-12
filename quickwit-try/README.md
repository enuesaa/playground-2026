# Quickwit

- クラウドネイティブな検索エンジン
- ユースケースとしてはログの検索っぽい。別にログに限らず使えるっぽいけど

commands
```bash
# インデックス作成
curl -X POST \
    http://localhost:7280/api/v1/indexes \
    -H "Content-Type: application/yaml" \
    --data-binary @index-config.yaml

# データ投入
curl -X POST \
  "http://localhost:7280/api/v1/logs/ingest" \
  -H "Content-Type: application/x-ndjson" \
  --data-binary @data.ndjson

# 検索
curl "http://localhost:7280/api/v1/logs/search?query=database"
curl "http://localhost:7280/api/v1/logs/search?query=level:ERROR"
```

## Links
- https://quickwit.io/
