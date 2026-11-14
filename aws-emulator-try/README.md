# AWS Emulator

- localstack的な。公式の。
- びっくり。予想してなかった。
- ものとしては想像通りだけどまだ使い勝手が悪そう。

```bash
docker compose up --build
AWS_ENDPOINT_URL=https://127.0.0.1:9297 AWS_DEFAULT_REGION=us-east-1 AWS_ACCESS_KEY_ID=test AWS_SECRET_ACCESS_KEY=test aws --no-verify-ssl s3 mb s3://test-bucket
AWS_ENDPOINT_URL=https://127.0.0.1:9297 AWS_DEFAULT_REGION=us-east-1 AWS_ACCESS_KEY_ID=test AWS_SECRET_ACCESS_KEY=test aws --no-verify-ssl s3api get-object --bucket test-bucket --key hello.txt out.txt
```

## Links
- https://github.com/aws/aws-emulator
- https://future-architect.github.io/articles/20261113a/
