# k8s-homelab-eks

- EKS のコンソールでクラスターを作成
- EKS Capabilities で ArgoCD を有効化
  - AWS SSO にてログイン
  - やっぱ登場したばかりなのでこの Capabilities を使う事例は少なそう

### ArgoCD
- ArgoCD へのサーバーの登録方法
  https://docs.aws.amazon.com/eks/latest/userguide/argocd-comparison.html
- 以前試した時の記録
  https://github.com/enuesaa/playground-2026/blob/main/aws-eks-try/README.md

```bash
# Clusterへ接続
export CLUSTER_ARN=$(aws eks describe-cluster --name cluster --query 'cluster.arn' --output text)
aws eks update-kubeconfig --name cluster

# Install ArgoCD CLI
curl -sSL -o argocd https://github.com/argoproj/argo-cd/releases/latest/download/argocd-linux-amd64
sudo install -m 555 argocd /usr/local/bin/argocd

# Setup ArgoCD Creds
export ARGOCD_AUTH_TOKEN="token"
export ARGOCD_OPTS="--grpc-web"

# ArgoCDのエンドポイント。これAWSコンソールに記載ある
# 例: xxx.eks-capabilities.region.amazonaws.com
export ARGOCD_SERVER=$(aws eks describe-capability --cluster-name cluster --capability-name argocd --query 'capability.configuration.argoCd.serverUrl' --output text | sed 's|^https://||')

# Register
argocd cluster add $CLUSTER_ARN --aws-cluster-name $CLUSTER_ARN --name in-cluster  --project default
```
