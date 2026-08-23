# Kyverno

- k8s のポリシーエンジンらしい
- 仕組み的にはClusterPolicy
  - k8s clusterに Kyverno のpodが立つ
  - で新しくpodが立つ時にそこにwebhookがいくっぽい
- ちなみに一部非推奨なポリシーがあるぽいので実際使う時は変更が必要
  ```bash
  WARNING: The legacy kyverno.io policy types are deprecated and will be removed in a future release. Migrate to their policies.kyverno.io replacements:
      - ClusterPolicy / Policy → ValidatingPolicy, MutatingPolicy, GeneratingPolicy, ImageValidatingPolicy (and their namespaced variants)
      - ClusterCleanupPolicy / CleanupPolicy → DeletingPolicy / NamespacedDeletingPolicy
      - PolicyException (kyverno.io) → PolicyException (policies.kyverno.io)
  ```

Commands

```bash
### create cluster
kind create cluster
kubectl cluster-info
kubectl get nodes

### setup kyverno
helm repo add kyverno https://kyverno.github.io/kyverno/
helm repo update
helm install kyverno kyverno/kyverno --namespace kyverno --create-namespace
kubectl get pods -n kyverno

### apply clusterpolicy
vim require-app-label.yml
kubectl apply -f require-app-label.yml # これはpodにlabelがあるかチェックする
kubectl get clusterpolicies
```

クラスターポリシー
```bash
➜ kubectl get clusterpolicies

NAME                ADMISSION   BACKGROUND   READY   AGE     MESSAGE
require-app-label   true        true         True    4m39s   Ready
```

バリデーションはこんな感じ。

```bash
$ kubectl apply -f podnginx.yml
Error from server: error when creating "podnginx.yml": admission webhook "validate.kyverno.svc-fail" denied the request:

resource Pod/default/nginx was blocked due to the following policies

require-app-label:
  require-app-label: 'validation error: Pod must have an app label. rule require-app-label failed at path /metadata/labels/'
```

## Links
- https://kyverno.io/
