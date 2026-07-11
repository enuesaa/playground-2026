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

### Liks
- https://valkey.io/

## ElastiCache と MemoryDB の違い
MemoryDB の方がデータの耐久性がありそうという理解。
ただ ElastiCache にもそういう機能があるらしく剪定は難しいと思った。

- https://blog.serverworks.co.jp/amazon-memorydb-multi-region-ga#Amazon-ElastiCache%E3%81%A8%E3%81%AE%E9%81%95%E3%81%84
- https://docs.aws.amazon.com/ja_jp/AmazonElastiCache/latest/dg/related-services-choose-between-memorydb-and-redis.html
- https://www.reddit.com/r/aws/comments/pchg4m/elasticache_or_memorydb_which_i_should_i_use/?tl=ja
- https://dev.classmethod.jp/articles/amazon-elasticache-valkey-durability/
