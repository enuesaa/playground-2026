# AWS ElastiCache for valkey

- こちらもいまさらながらトライ
- MemoryDB for valkey に比べて立ち上げが早かった。
  - 5分くらい。それ以下
- Serverless がある
  - 料金は Serverless の方が高いっぽい
  - https://dev.classmethod.jp/articles/amazon-elasticache-serverless-ops-made-easy/#Serverless%25E3%2581%25AE%25E8%25B2%25BB%25E7%2594%25A8%25E3%2581%25AF%25E8%25A9%25A6%25E7%25AE%2597%25E3%2581%258C%25E9%259B%25A3%25E3%2581%2597%25E3%2581%2584
- 接続方法は同じ。
  - ec2 から valkey cli にて。

EC2 から接続
```bash
$ dnf install -y valkey
$ valkey-cli --tls -h <endpoint>.amazonaws.com -p 6379
> SET mykey "Hello, ElastiCache!"
OK
> GET mykey
"Hello, ElastiCache!"
```
