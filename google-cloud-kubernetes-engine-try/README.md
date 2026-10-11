# GKE

- Kubernetes Engine API の有効化が必要
- 作成ウィンドウで何も変えずに作成ボタンを押したらクラスタができてた
  - GKE Autopilot というやつっぽい
  - VPC はデフォルトのやつを使っている様子
  - まじで詳細確認する前に作成ボタンを押してしまった
- サービスは「ワークロード」というページに表示される

### nginx のサービスをデプロイ

1. GKE のクラスターページで「接続」をクリック
2. Cloud Shell が開く
3. `kubectl get pods,svc,ingress`
4. `vim nginx.yaml`
5. `kubectl apply -f nginx.yaml`

nginx.yaml はこれ。
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
spec:
  replicas: 2
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
          image: nginx:1.27
          ports:
            - containerPort: 80
          resources:
            requests:
              cpu: 250m
              memory: 256Mi
            limits:
              cpu: 250m
              memory: 256Mi
---
apiVersion: v1
kind: Service
metadata:
  name: nginx
spec:
  type: LoadBalancer
  selector:
    app: nginx
  ports:
    - port: 80
      targetPort: 80
```

Google Cloud でロードバランサーが自動的に立つっぽい

## Python3app

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: python3app
spec:
  replicas: 2
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
          resources:
            requests:
              cpu: 250m
              memory: 256Mi
            limits:
              cpu: 250m
              memory: 256Mi
---
apiVersion: v1
kind: Service
metadata:
  name: python3app
spec:
  type: LoadBalancer
  selector:
    app: python3app
  ports:
    - port: 8000
      targetPort: 8000
```

これだと LB がまた一個増えた

## Links
- https://zenn.dev/google_cloud_jp/articles/gke-korekara-101
