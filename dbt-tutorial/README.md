# dbt tutorial

- https://docs.getdbt.com/guides/manual-install?step=15
- https://docs.getdbt.com/guides/bigquery?step=8

を試した。

- Big Query 前提っぽい。
- `~/.dbt/profiles.yml` は下記

```yml
jaffle_shop:
  target: dev
  outputs:
    dev:
      type: bigquery
      method: service-account
      keyfile: /Users/aaa/.dbt/<filename>
      project: <Google Cloud Project ID>
      dataset: jaffle_shop
      threads: 1
      timeout_seconds: 300
      location: US # 大元のデータセットがUSにあるのでUSじゃないと厳しそう
      priority: interactive
```

## Commands
```bash
uv add dbt-core
uv add dbt-bigquery

# run
# 挙動を見てると冪等っぽい
uv run dbt run

# target/ とかを消すっぽい
uv run dbt clean

# materizalized を変更したとき Big Query では full refresh が必要になるそう？あんまよくわかってない
uv run dbt run --full-refresh

# ドキュメント生成
uv run dbt docs generate
uv run dbt docs serve
```
