# Litestream

- 数年前に触った事あるけど
  https://github.com/enuesaa/playground-2024/tree/main/litestream-tutorial
- S3 の sqlite へ書き込めるって理解をしていたが、そうではなくて正確には「ローカルの sqlite を s3 へレプリケート」する

install
```bash
$ brew install benbjohnson/litestream/litestream
$ litestream version
0.5.14
```

ローカルの sqlite へ書き込み
```bash
$ sqlite3 test.db
SQLite version 3.51.0 2025-06-12 13:14:41
Enter ".help" for usage hints.
sqlite> create table users(id integer primary key, name text);
sqlite> insert into users(name) values ('alice');
```

ローカルの sqlite を s3 へレプリケート。このコマンドはずっと続く
```bash
$ litestream replicate test.db s3://xxx/test.db
time=2026-07-18T17:20:11.308+09:00 level=INFO msg=litestream version=0.5.14 level=INFO
time=2026-07-18T17:20:11.308+09:00 level=INFO msg="initialized db" path=/litestream-retry/test.db
time=2026-07-18T17:20:11.308+09:00 level=INFO msg="replicating to" type=s3 sync-interval=1s bucket=xxx path=test.db region="" endpoint=""
time=2026-07-18T17:20:11.308+09:00 level=INFO msg="starting compaction monitor" system=store level=2 interval=5m0s
```

## Links
- https://litestream.io/install/mac/
