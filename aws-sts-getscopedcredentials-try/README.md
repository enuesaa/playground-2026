# AWS STS GetScopedCredentials

- IAM の権限を使うときにさらに絞れるそう
- どういう意味・ユースケースがあるのか不明
  - 考えてみたら CloudShell で権限絞るのが簡単になりそう。
  - まだひと手間あるけどそれもなんか発表ありそうな雰囲気。JSON作るのめんどうだけどなんかあるんじゃね？

```bash
CREDS=$(aws sts get-scoped-credentials --policy file://policy.json --scoped-session-description aa --output json)
export AWS_ACCESS_KEY_ID=$(echo "$CREDS" | jq -r .Credentials.AccessKeyId)
export AWS_SECRET_ACCESS_KEY=$(echo "$CREDS" | jq -r .Credentials.SecretAccessKey)
export AWS_SESSION_TOKEN=$(echo "$CREDS" | jq -r .Credentials.SessionToken)

aws s3api list-objects-v2 --bucket <bucket>
```

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::<bucket>"
    }
  ]
}
```

## Links
- https://aws.amazon.com/about-aws/whats-new/2026/11/sts-getscopedcredentials/
