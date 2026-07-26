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
  kubectl exec -it nginx -- bash
  kubectl port-forward nginx 8000:80
  kubectl delete pod nginx
  ```
- ReplicaSet / Deployment
  - https://www.ios-net.co.jp/blog/20230614-1141/
  - この辺りがこれまであんまよく分かってなかった
  - ReplicaSet はようは (昔の) ECS Service に相当。Podを何台起動するとか設定できる。
  - Deployment は CodeDeploy に相当。デプロイ戦略を指定できる
  - Deployment は内部的に ReplicaSet をコントロールする？らしく、なので直接 ReplicaSet を触るのはよくないらしい。基本 Deployment をさわれば良い
  - 例えば
    ```bash
    kubectl apply --filename deploymentnginx.yml
    kubectl get pod -o wide
    kubectl apply --filename deploymentnginx.yml # イメージを変えたり
    kubectl get pod -o wide --watch
    kubectl describe pod
    kubectl delete --filename deploymentnginx.yml
    ```
- Service というのはLB相当かな。
  - 正確にはpodのprivate ipアドレスをまとめあげるイメージ
  - 例えば 
    ```bash
    kubectl delete deploymentnginx.yml
    kubectl delete --filename deploymentnginx.yml
    kubectl apply --filename deploymentnginx.yml
    kubectl apply --filename servicenginx.yml
    kubectl port-forward service/nginx-service 8080:80
    kubectl get service nginx-service
    kubectl delete --filename deploymentnginx.yml
    kubectl delete --filename servicenginx.yml
    ```
  - コンテナ内なら nginx-service.default.svc.cluster.local で名前解決できるっぽい
- ConfigMap はパラメータストアみたい。
  - 再度デプロイが必要
  - 例えば
    ```bash
    kubectl apply --filename configmaptest.yml
    kubectl get pod
    kubectl exec -it nginx-deployment-9cf97f849-pvd9p -- printenv
    kubectl apply --filename configmaptest.yml
    kubectl rollout restart deployment/nginx-deployment
    kubectl get pod
    kubectl exec -it nginx-deployment-587d589b76-9rmxh  -- printenv
    ```
  - Secret みたいなものもあるらしい
- Job は ECS RunTask に相当
  - これはそのまま
- CronJob は Job を定期実行できる
  - まあ EventBridge に相当
  - 例えば
    ```bash
    kubectl apply -f cronjobtest.yml
    kubectl get cronjob
    kubectl get job
    kubectl delete -f cronjobtest.yml
    ```
  - watch するとこんな感じ
    ```bash
    ➜ kubectl get pod --watch
    NAME                           READY   STATUS    RESTARTS   AGE
    hello-cronjob-29750761-cp2tw   0/1     Pending   0          0s
    hello-cronjob-29750761-cp2tw   0/1     Pending   0          0s
    hello-cronjob-29750761-cp2tw   0/1     ContainerCreating   0          0s
    hello-cronjob-29750761-cp2tw   0/1     ContainerCreating   0          0s
    hello-cronjob-29750761-cp2tw   1/1     Running             0          4s
    hello-cronjob-29750761-cp2tw   0/1     Completed           0          4s
    hello-cronjob-29750761-cp2tw   0/1     Completed           0          5s
    hello-cronjob-29750761-cp2tw   0/1     Completed           0          6s
    hello-cronjob-29750762-p8m4t   0/1     Pending             0          0s
    hello-cronjob-29750762-p8m4t   0/1     Pending             0          0s
    hello-cronjob-29750762-p8m4t   0/1     ContainerCreating   0          0s
    hello-cronjob-29750762-p8m4t   0/1     ContainerCreating   0          0s
    hello-cronjob-29750762-p8m4t   1/1     Running             0          1s
    hello-cronjob-29750762-p8m4t   0/1     Completed           0          2s
    hello-cronjob-29750762-p8m4t   0/1     Completed           0          3s
    hello-cronjob-29750762-p8m4t   0/1     Completed           0          4s
    ```
- コンテナのヘルスチェック的なのもできるらしい
  - https://qiita.com/MAKOTO1995/items/a087746d6b430601f94b
  - https://cstoku.dev/posts/2018/k8sdojo-10/
  - 概念としては docker のヘルスチェックのやつと同じだけどできることはこっちの方が多そう
  - Startup Probe というのはここ最近できたらしい
