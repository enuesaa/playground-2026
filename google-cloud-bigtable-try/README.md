# BigTable

- Google Cloud
- NoSQL
- リソースを作成するときリージョンの指定が必要
  - グローバルリソースではないということ
  - またインスタンスを作成する系のDBであるということ
- 概念としては `インスタンス > テーブル > データ` っぽい
  - 1インスタンスに複数のテーブルを置ける
  - テーブルを作成できる

### Pythonでデータを読む
```bash
GOOGLE_APPLICATION_CREDENTIALS=cred.json uv run main.py
```

### SQL でデータを引っ張る
```sql
SELECT *
FROM `weather-data`(WITH_HISTORY=>FALSE)
LIMIT 10;
```

### Links
- https://blog.g-gen.co.jp/entry/bigtable-explained
