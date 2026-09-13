# k8s-homelab-eks

### ArgoCD
- EKS Capabilities で有効化
- ArgoCD へのサーバーの登録方法
  https://docs.aws.amazon.com/eks/latest/userguide/argocd-comparison.html
- 以前試した時の記録
  https://github.com/enuesaa/playground-2026/blob/main/aws-eks-try/README.md

```bash
# これAWSコンソールに記載ある。ArgoCDのエンドポイントのこと。
# 例: xxx.eks-capabilities.region.amazonaws.com
export ARGOCD_SERVER=$(aws eks describe-capability --cluster-name cluster --capability-name argocd --query 'capability.configuration.argoCd.serverUrl' --output text | sed 's|^https://||')

# ArgoCDのUIで発行する
export ARGOCD_AUTH_TOKEN="token"
export ARGOCD_OPTS="--grpc-web"

# EKSのARN
export CLUSTER_ARN=$(aws eks describe-cluster --name cluster --query 'cluster.arn' --output text)

# Install ArgoCD CLI
curl -sSL -o argocd https://github.com/argoproj/argo-cd/releases/latest/download/argocd-linux-amd64
sudo install -m 555 argocd /usr/local/bin/argocd

# Register
aws eks update-kubeconfig --name cluster
argocd cluster add $CLUSTER_ARN --aws-cluster-name $CLUSTER_ARN --name in-cluster  --project default
```
