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

## ArgoCD
- これも初めて使った。
- 存在自体は知ってたけど。
- GitHub と連携するときは GitHub App や SSH 等を選べる
  - GitHub App のセットアップが面倒だったのでSSHにした。
  - https://zenn.dev/ring_belle/articles/argocd-private-ssh-key
- ArgoCD CLI のインストール
  - クライアントとサーバーという概念がある。MySQL とかと一緒
  - ArgoCD の一部の設定は ArgoCD CLIからしか制御できない
  - のでArgoCD CLIのインストールが必要
  - ArgoCD Server と ArgoCD Client のバージョンは一致している必要がある
    ```
    $ argocd version
    argocd: v3.2.7+48549a2
    BuildDate: 2026-02-18T13:25:18Z
    GoVersion: go1.25.6
    Compiler: gc
    Platform: linux/arm64
    argocd-server: v3.2.7+eks-1
    BuildDate: 2026-04-24T09:39:27Z
    GoVersion: go1.26.2
    Compiler: gc
    Platform: linux/amd64
    Kustomize Version: v5.7.0 2025-06-28T07:00:07Z
    Helm Version: v3.18.4+gd80839c
    Jsonnet Version: v0.21.0
    ```
  - インストールコマンド (Ubuntu ARM64)
    - https://argo-cd.readthedocs.io/en/stable/cli_installation/
    ```bash
    curl -sSL -o argocd-linux-arm64 https://github.com/argoproj/argo-cd/releases/download/v3.2.7/argocd-linux-arm64
    install -m 555 argocd-linux-arm64 /usr/local/bin/argocd
    ```
  - ArgoCD へログイン
    - argocd login という簡単なコマンドがあるらしいけどそれは EKS Capability の制約で使えないそう
    - https://docs.aws.amazon.com/eks/latest/userguide/argocd-register-clusters.html
    - https://tech.guitarrapc.com/entry/2025/12/03/220000
    - https://note.shiftinc.jp/n/n41b35d9b46d7
    ```bash
    export ARGOCD_SERVER=$(aws eks describe-capability --cluster-name aaa --capability-name aaa-argocd  --query 'capability.configuration.argoCd.serverUrl' --output text | sed 's|^https://||')
    export ARGOCD_AUTH_TOKEN=
    export ARGOCD_OPTS="--grpc-web"
    argocd repo list

    # Cluster の追加
    aws eks update-kubeconfig --name aaa --region ap-northeast-1 # これはローカルにクレデンシャルをおくっぽい
    argocd cluster add $CLUSTER_ARN --aws-cluster-name $CLUSTER_ARN --name local-cluster   --project default
    ```
  - EKS へデプロイ
    - の前にアクセスポリシーの修正が必要。じゃないと権限エラーっぽいのが出た。
    - ArgoCD の IAM ロールに AmazonEKSClusterAdminPolicy を追加する。
    - https://tech.guitarrapc.com/entry/2025/12/03/220000#EKS-Access-Entry%E3%81%AE%E6%A8%A9%E9%99%90%E3%82%92%E8%AA%BF%E6%95%B4%E3%81%99%E3%82%8B
  - ArgoCD でデプロイしたら Pod の Private IP をAWSコンソールで確認して、CloudShell で VPC に乗り込み、レスポンスが返ってくる確認
