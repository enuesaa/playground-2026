# GKE

## Argo CD

- 下記の手順で Argo CD をセットアップ
- por forward した後に Cloud Shell のウェブプレビューで 8080 を見ると Argo CD のUIが表示される
  - これで実運用するのは厳しいが一瞬使う分には十分。

```bash
kubectl create namespace argocd
kubectl apply -n argocd --server-side --force-conflicts -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

kubectl get pods -n argocd -w

kubectl patch configmap argocd-cmd-params-cm -n argocd --type merge -p '{"data":{"server.insecure":"true"}}'
kubectl rollout restart deployment argocd-server -n argocd

kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
kubectl port-forward svc/argocd-server -n argocd 8080:80
```

apply するには
- クラスタは登録済み（in-cluster）
- リポジトリを登録。手順はいつもと同じ
- その後アプリケーションを作成
- Sync すれば普通に Pod が立ち上がる
- 難点はなかった。だいたいいつもと同じ。
