# AWS ElastiCache for valkey

- こちらもいまさらながらトライ
- MemoryDB for valkey に比べて立ち上げが早かった。
  - 5分くらい。それ以下
- Serverless がある
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
