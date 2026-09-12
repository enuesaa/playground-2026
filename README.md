# k8s-homelab-argocd

```bash
# k3s
curl -sfL https://get.k3s.io | sh -
k3s kubectl get nodes

# kubeconfig
mkdir -p ~/.kube
cp /etc/rancher/k3s/k3s.yaml ~/.kube/config
kubectl get nodes

# traefik
kubectl get pods -n kube-system | grep traefik

# argocd
# see https://argo-cd.readthedocs.io/en/release-2.1/operator-manual/installation/
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
kubectl get pods -n argocd -w
# argocd initial password
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
# argocd ui. 立ち上げたらブラウザからログイン
kubectl -n argocd port-forward --address 0.0.0.0 svc/argocd-server 8080:443

# clone
dnf install -y git
git clone https://github.com/enuesaa/k8s-homelab-argocd.git
cd k8s-homelab-argocd

# application
kubectl apply -f argocd.yaml
kubectl -n argocd get application k8s-homelab

# confirm
kubectl get pods,svc,ingress
curl -H "Host: nginx.example.com" http://<EC2 IP>/
curl -H "Host: app.example.com" http://<EC2 IP>/
```

## メモ
- ArgoCDはデフォルトで3分間隔でGitリポジトリをポーリング
  - git pushすると自動で同期される。面白い。
  - https://argo-cd.readthedocs.io/en/stable/faq/#how-often-does-argo-cd-check-for-changes-to-my-git-repository
