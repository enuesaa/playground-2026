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
  - 例えばnginxを立てるなら
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
