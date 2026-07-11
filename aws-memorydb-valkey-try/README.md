# AWS MemoryDB Valkey

- いまさらながらトライ
- クラスタが立ち上がるのに十分くらいかかった
- Valkey 7
  - これは Redis 7 のフォーク先なので、ほとんど互換性あるのでは？
  - https://docs.aws.amazon.com/ja_jp/AmazonElastiCache/latest/dg/VersionManagementConsiderations-valkey.html
  - Valkey 8 からは重大な変更が入ってる
- ACL って概念がある
- 耐久性があるらしい
- 接続の際は valkey-cli から。
  - https://valkey.io/topics/installation/
  - https://blog.serverworks.co.jp/memorydb-valkey

EC2から接続してみる
```bash
$ dnf install -y valkey

$ valkey-cli --version
valkey-cli 9.0.4

$ valkey-cli -h <endpoint>.amazonaws.com -p 6379 -c --tls
> keys *
(empty array)
> set a b
OK
> get a
"b"
> keys *
1) "a"
```

## Liks
- https://valkey.io/
