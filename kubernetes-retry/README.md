# Kubernetes

- kind
  - docker in docker らしい
  - https://adengineer.internet.gmo/2019/09/19/kind-kubernetes-in-docker/
    ```bash
    brew install kind
    kind version
    kind create cluster
    kubectl cluster-info
    kubectl get nodes
    cat ~/.kube/config
    kind delete cluster
    kubectl get nodes
    ```
- 例えばnginxのpodを立てるなら
  ```bash
  kubectl get pod --namespace default
  kubectl apply --filename podnginx.yml --namespace default
  kubectl get pod --namespace default
  kubectl get pod -n default -o wide
  kubectl describe pod nginx
  kubectl logs -f nginx
  kubectl exec --stdin --tty nginx -- bash
  kubectl port-forward nginx 8000:80
  kubectl delete pod nginx
  ```
- ReplicaSet / Deployment
  - https://www.ios-net.co.jp/blog/20230614-1141/
  - この辺りがこれまであんまよく分かってなかった
  - ReplicaSet はようは (昔の) ECS Service に相当。Podを何台起動するとか設定できる。
  - Deployment は CodeDeploy に相当。デプロイ戦略を指定できる
  - Deployment は内部的に ReplicaSet をコントロールする？らしく、なので直接 ReplicaSet を触るのはよくないらしい。基本 Deployment をさわれば良い
- 例えばdeployment
  ```bash
  kubectl apply --filename deploymentnginx.yml
  kubectl get pod -o wide
  kubectl apply --filename deploymentnginx.yml # イメージを変えたり
  kubectl get pod -o wide --watch
  kubectl describe pod
  kubectl delete --filename deploymentnginx.yml
  ```
