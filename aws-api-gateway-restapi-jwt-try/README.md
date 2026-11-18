# AWS API Gateway REST API JWT Authorizer

- ついに。
- 素晴らしい。
- 試した時は us-east-1 でしか使えなさそうだった。そのうち使えるようになるはず
- AWS IAM outbound identity federation で試してみた。

```bash
➜ aws sts get-web-identity-token --audience xxx --signing-algorithm RS256 --duration-seconds 300

➜ curl https://xxx.execute-api.us-east-1.amazonaws.com/v1/pets
{"message":"Unauthorized"}

➜ curl https://xxx.execute-api.us-east-1.amazonaws.com/v1/pets -H Authorization:xxx
[
  {
    "id": 1,
    "type": "dog"
  },
  {
    "id": 2,
    "type": "cat"
  }
]
```

## Links
- https://aws.amazon.com/about-aws/whats-new/2026/11/amazon-api-gateway-rest-jwt-authorizers/
