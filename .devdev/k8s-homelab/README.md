# k8s-homelab

nginx と python3app の pod をそれぞれ立ててルーティングしてみる

## Commands
```bash
curl -sfL https://get.k3s.io | sh -
k3s kubectl get nodes
mkdir -p ~/.kube
cp /etc/rancher/k3s/k3s.yaml ~/.kube/config
chown $(id -u):$(id -g) ~/.kube/config
kubectl get nodes
```

### nginx
```bash
touch nginx.yaml
kubectl apply -f nginx.yaml
```
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - name: nginx
          image: nginx
          ports:
            - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: nginx
spec:
  type: NodePort
  selector:
    app: nginx
  ports:
    - port: 80
      targetPort: 80
```

### python3app
```bash
touch python3app.yaml
kubectl apply -f python3app.yaml
```
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: python3app
spec:
  replicas: 1
  selector:
    matchLabels:
      app: python3app
  template:
    metadata:
      labels:
        app: python3app
    spec:
      containers:
        - name: python3app
          image: python:3-alpine
          command: ["python3", "-m", "http.server", "8000"]
          ports:
            - containerPort: 8000
---
apiVersion: v1
kind: Service
metadata:
  name: python3app
spec:
  type: NodePort
  selector:
    app: python3app
  ports:
    - port: 8000
      targetPort: 8000
```

確認

```bash
kubectl get pods -o wide
kubectl logs nginx-5cf8dc6bc5-fbnxg
kubectl get svc

# NodePort でそれぞれアクセス
curl localhost:32549 # nginxのNodePort
curl localhost:31277 # python3appのNodePort

# クラスタ内から疎通確認
kubectl run curl --image=curlimages/curl -it --rm -- sh
curl nginx
curl python3app:8000
```
