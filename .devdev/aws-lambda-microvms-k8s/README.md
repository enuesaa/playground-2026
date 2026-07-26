# aws lambda microvms k8s try

- k3s を動かしたいが、なんか上手くいかない。kernel module が足りない？らしい
```bash
dnf install -y kernel-modules-extra
dnf install -y vim iproute iptables iptables-nft kmod procps-ng util-linux

# install k3s
curl -sfL https://get.k3s.io | sh -
curl -sfL https://get.k3s.io | INSTALL_K3S_EXEC="server --flannel-backend=none" sh -
k3s kubectl get nodes
```

- kind は動いた？
```bash
dnf install -y docker
systemctl start docker
systemctl status docker

# install kind
curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.32.0/kind-linux-arm64
chmod +x ./kind
mv ./kind /usr/local/bin/kind

# create cluster
kind create cluster

# install kubectl
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/arm64/kubectl"
install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
kubectl version --client
kubectl get nodes
kubectl get pods

# start nginx deployment
touch nginx.yml
dnf install -y vim
vim nginx.yml 
kubectl apply -f nginx.yml 
kubectl port-forward service/nginx 8080:80

curl http://localhost:8080
```

構成ざっくり
```mermeid
flowchart TB
    subgraph M["AWS Lambda MicroVM"]
        subgraph K["Kubernetes (kind)"]
            S["Service"]
            D["Deployment"]
            P1["Pod"]
            P2["Pod"]

            S --> D
            D --> P1
            D --> P2
        end
    end
```
