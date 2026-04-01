# knative

- cloud run が内部で使ってるらしい？
- アクセスがないとき scale to zero にする

```bash
# install k3s
curl -sfL https://get.k3s.io | sh -
mkdir -p ~/.kube
sudo k3s kubectl config view --raw > ~/.kube/config
chmod 600 ~/.kube/config

# knative serving
kubectl apply -f https://github.com/knative/serving/releases/download/knative-v1.14.0/serving-crds.yaml
kubectl apply -f https://github.com/knative/serving/releases/download/knative-v1.14.0/serving-core.yaml

# Kourier（Ingress）
kubectl apply -f https://github.com/knative/net-kourier/releases/download/knative-v1.14.0/kourier.yaml
kubectl patch configmap/config-network \
  -n knative-serving \
  --type merge \
  -p '{"data":{"ingress-class":"kourier.ingress.networking.knative.dev"}}'

# ドメイン設定
kubectl patch configmap/config-domain \
  -n knative-serving \
  --type merge \
  -p '{"data":{"example.com":""}}'
kubectl rollout restart deployment controller -n knative-serving

# サンプルアプリ
cat <<EOF | kubectl apply -f -
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: hello
spec:
  template:
    spec:
      containers:
        - image: ghcr.io/knative/helloworld-go:latest
          env:
            - name: TARGET
              value: "Knative"
EOF

# url 確認
kubectl get ksvc hello

# EC2内でアクセス
curl -H "Host: hello.default.example.com" http://localhost:31123
```

## Links
- https://knative.dev/docs/getting-started/quickstart-install/

### k3s
- https://k3s.io/
- https://future-architect.github.io/articles/20200929/
