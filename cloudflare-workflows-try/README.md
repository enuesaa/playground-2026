# Cloudflare Workflows

- いわゆるステートマシン的な
- コードで定義するっぽい
  - というか実態としては worker なんだろうな
  - いわゆる durable functions の方向性に見える
  - あと Apache Airflow にも近いのかなーと思った
- 定義と worker の部分のコードの2種類があるのは面白い

```bash
$ curl <WorkerのURL>
{"id":"xxx"} // イベントが投入されidがかえる

$ curl <WorkerのURL>/?instanceId=<id>&approve=1
{"status":{"status":"complete","error":null,"rollback":null}} // approveされる
```

## Links
- https://www.cloudflare.com/ja-jp/developer-platform/products/workflows/

