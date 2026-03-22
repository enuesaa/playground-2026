# floci

- localstack みたいなやつ
- java で書かれてるっぽい
- docker compose で動かせる
- aws cli 経由で呼び出せた
  ```bash
  ➜ AWS_ENDPOINT_URL=http://localhost:4566 AWS_DEFAULT_REGION=us-east-1 AWS_ACCESS_KEY_ID=test AWS_SECRET_ACCESS_KEY=test aws s3api create-bucket --bucket a
  ➜ AWS_ENDPOINT_URL=http://localhost:4566 AWS_DEFAULT_REGION=us-east-1 AWS_ACCESS_KEY_ID=test AWS_SECRET_ACCESS_KEY=test aws s3api list-buckets
  {
      "Buckets": [
          {
              "Name": "a",
              "CreationDate": "2026-03-22T08:05:07.627139+00:00"
          }
      ],
      "Owner": {
          "DisplayName": "owner",
          "ID": "owner"
      },
      "Prefix": null
  }
  ```
- なんか create-bucket すると ./data/s3/<bucket-name> が作成された。
  - ここにアップロードファイルが永続化されるっぽい

## Links
- https://github.com/hectorvent/floci

