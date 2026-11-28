# AWS Elastic Load Balancing for Envoy

- Envoy のマネージドサービず
- Envoy 自体はL7のロードバランサーらしい
  - まともに触ったの初めてかも
  - 設定ファイルをもとにバックエンドへload balancingする
- ものは Envoy なので Envoy を知っている人からすれば大したことないとおもう
  - が自分は設定ファイルの見方がわからないので初見ではビビった
  - 構成要素自体はALBに似ている
- EKS や ECS Express と相性良さそうにおもう
- AWS WAFと統合できるらしい
- リソース作成時にIAM Roleが必要だが、ロギングの権限さえあれば良いそう
  - https://dev.classmethod.jp/articles/aws-elb-for-envoy-ga-create-proxy/
- ACM の証明書もアタッチできる

### 設定ファイルの例
```yaml
static_resources:
  listeners:
  - name: web_listener
    address:
      socket_address:
        address: 0.0.0.0
        port_value: 80
    filter_chains:
    - filters:
      - name: envoy.filters.network.http_connection_manager
        typed_config:
          "@type": type.googleapis.com/envoy.extensions.filters.network.http_connection_manager.v3.HttpConnectionManager
          stat_prefix: web
          http_filters:
          - name: envoy.filters.http.router
            typed_config:
              "@type": type.googleapis.com/envoy.extensions.filters.http.router.v3.Router
          route_config:
            virtual_hosts:
            - name: web
              domains: ["*"]
              routes:
              - match:
                  prefix: /
                route:
                  cluster: web_cluster

  clusters:
  - name: web_cluster
    type: STATIC
    load_assignment:
      cluster_name: web_cluster
      endpoints:
      - lb_endpoints:
        - endpoint:
            address:
              socket_address:
                address: 172.x.x.x
                port_value: 80
```

## Links
- https://aws.amazon.com/about-aws/whats-new/2026/11/elastic-load-balancing-for-envoy-generally-available/