# AgentCore Runtime V2

- v2 が出た
- 実体は Lambda MicroVMs だろうなあ。
  - 特徴が似ている
- v2 ではスナップショットからの起動となる
  - 特に業務ではどういう挙動なのか正確に理解した方が良さそう
- EFS / S3 Files をマウントできる
  - v1 でもできてたが
  - Lambda MicroVMs の方は対応してなさそうな認識をしているが、どうなっているのだろう
- これと関係あるかわからないが EC2 でも動かせるようになったらしい
  - これは嬉しい人いそう
- 関係ないがAWSコンソールでの体験が良かった。デフォルト値のまま作成できる

## Links
- https://aws.amazon.com/jp/blogs/machine-learning/the-new-agentcore-runtime-elastic-optimized-and-consistently-fast-starts/
- https://dev.classmethod.jp/articles/amazon-bedrock-agentcore-runtime-v2-tried/
- https://qiita.com/yama3133/items/c7b437006f89fc49e4d9
