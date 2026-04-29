# AWS EKS 

- 初めて触った。
- とりあえず Auto Mode
  - 去年くらいにできたらしい
  - EC2 Managed Instances ベース
  - k8s の場合、ノードの管理はユーザーの責務であるが、Auto Mode ではAWSが部分的に管理してくれるそう。追加料金あるっぽい
  - https://speakerdeck.com/_takahash/lets-start-eks-auto-mode
- EKS Capability
  - 去年末に登場
  - Argo CD 等をセットアップしてくれるらしい
    - 実際に Argo CD を立ててみた。
    - AWS SSO と連携する前提。SSO のユーザーを Argo CD のユーザーにマッピングする感じ
    - https://tech.guitarrapc.com/entry/2025/12/03/220000
