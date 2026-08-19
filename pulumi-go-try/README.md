# Pulumi

- いまさらだが
- Go
- あまり重たくはないが数秒くらい plan にかかっていそう
- パスフレーズが必要

## Commands
```bash
brew install pulumi/tap/pulumi
pulumi login --local
pulumi new aws-go --force # create project
pulumi up # apply
pulumi destroy # destroy
```
