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
    kind delete cluster
    kubectl get nodes
    ```