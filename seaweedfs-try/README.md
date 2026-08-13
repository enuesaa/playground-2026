# seaweedfs

- minioの代わり
- go で書かれている
- ちょっと玄人向け。ローカル開発にはオーバーだなあ。

## Command

```bash
export AWS_ACCESS_KEY_ID=admin
export AWS_SECRET_ACCESS_KEY=admin

aws --endpoint-url http://localhost:8333 s3 mb s3://test
aws --endpoint-url http://localhost:8333 s3 cp ./test.txt s3://test/test.txt
```

## Links
- https://github.com/seaweedfs/seaweedfs
- https://engineering.nifty.co.jp/blog/37175
