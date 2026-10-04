# k8s-homelab-k3s

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
```
