# ministack

- AWS API のエミュレータ
- LocalStack みたいな
- 基本的には AWS のエミュレータらしい。Google Cloud とかはなさそう？ それが floci との大きな違いかも

```bash
➜ AWS_ENDPOINT_URL=http://localhost:4566 AWS_DEFAULT_REGION=us-east-1 AWS_ACCESS_KEY_ID=test AWS_SECRET_ACCESS_KEY=test aws s3api create-bucket --bucket aaaaaaaa

➜ AWS_ENDPOINT_URL=http://localhost:4566 AWS_DEFAULT_REGION=us-east-1 AWS_ACCESS_KEY_ID=test AWS_SECRET_ACCESS_KEY=test aws s3api list-buckets
{
    "Buckets": [
        {
            "Name": "aaaaaaaa",
            "CreationDate": "2026-10-04T06:39:11.498000+00:00",
            "BucketRegion": "us-east-1",
            "BucketArn": "arn:aws:s3:::aaaaaaaa"
        }
    ],
    "Owner": {
        "DisplayName": "ministack",
        "ID": "xxx"
    },
    "Prefix": null
}

➜ echo "hello" > hello.txt && AWS_ENDPOINT_URL=http://localhost:4566 AWS_DEFAULT_REGION=us-east-1 AWS_ACCESS_KEY_ID=test AWS_SECRET_ACCESS_KEY=test aws s3api put-object --bucket aaaaaaaa --key hello.txt --body hello.txt

➜ AWS_ENDPOINT_URL=http://localhost:4566 AWS_DEFAULT_REGION=us-east-1 AWS_ACCESS_KEY_ID=test AWS_SECRET_ACCESS_KEY=test aws s3api list-objects-v2 --bucket aaaaaaaa

➜ AWS_ENDPOINT_URL=http://localhost:4566 AWS_DEFAULT_REGION=us-east-1 AWS_ACCESS_KEY_ID=test AWS_SECRET_ACCESS_KEY=test aws s3 presign s3://aaaaaaaa/hello.txt --expires-in 3600
```

## Links
- https://github.com/ministackorg/ministack
- https://gigazine.net/news/20261003-ministack/
