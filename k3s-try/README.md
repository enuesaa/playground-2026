# k3s

何度かさわっているが改めて。

## Commands
### Install
```bash
curl -sfL https://get.k3s.io | sh -
k3s kubectl get nodes
```

### nginx 起動
```bash
kubectl run nginx --image=nginx --port=80
kubectl get pods
kubectl exec -it nginx -- bash
kubectl delete pod nginx
```

### nginx 起動 (kubectl apply)
```bash
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

### kubernetes-dashboard
```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.7.0/aio/deploy/recommended.yaml
kubectl get pods -n kubernetes-dashboard

# create admin-user
kubectl apply -f admin-user.yaml
kubectl -n kubernetes-dashboard create token admin-user # token発行

# run
kubectl -n kubernetes-dashboard port-forward svc/kubernetes-dashboard 8443:443

# ssm で port forward
aws ssm start-session \
  --target <target> \
  --document-name AWS-StartPortForwardingSession \
  --parameters '{"portNumber":["8443"],"localPortNumber":["8443"]}'
```

```yaml
# admin-user.yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: admin-user
  namespace: kubernetes-dashboard
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: admin-user
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: admin-user
  namespace: kubernetes-dashboard
```

## Links
- https://k3s.io/

### kubernetes 入門
- https://speakerdeck.com/cybozuinsideout/introduction-to-kubernetes
- https://speakerdeck.com/hihihiroro/kubernetesniru-men-sitai?slide=24
