# traefik

- クラウドネイティブなリバースプロキシらしい
- vhost 的なのを動的に行える
  - docker コンテナが立ち上がったら、そのコンテナのラベルを見て、動的にロードバランシングする
  - というかそもそもろんで docker コンテナに向けられるってのが良い
- traefik 自体は Go で書かれており、バイナリをダウンロードすれば動くし docker コンテナとしても動かせる
- 優秀
- 期待通り動く
- systemd の unit file example
  - https://gist.github.com/ubergesundheit/7c9d875befc2d7bfd0bf43d8b3862d85
  - https://doc.traefik.io/traefik-enterprise/installing/on-premise/#systemd-linux-only

## EC2に立ててみる

traefik.yml を作成
```yml
api:
  insecure: true
entryPoints:
  web:
    address: ":80"
  postgres:
    address: ":5432"
providers:
  docker:
    endpoint: "unix:///var/run/docker.sock"
    exposedByDefault: false
```

traefik を起動
```bash
curl -L https://github.com/traefik/traefik/releases/download/v3.6.12/traefik_v3.6.12_linux_arm64.tar.gz -o traefik.tar.gz
tar -xzf traefik.tar.gz
mv traefik /usr/local/bin/
```

docker コンテナを立てる

```
docker run -d \
  --name nginx \
  -l 'traefik.enable=true' \
  -l 'traefik.http.routers.nginx.rule=Host(`aaa.testapp.example.com`)' \
  -l 'traefik.http.routers.nginx.entrypoints=web' \
  -l 'traefik.http.services.nginx.loadbalancer.server.port=80' \
  nginx

docker run -d \
  --name whoami \
  -l 'traefik.enable=true' \
  -l 'traefik.http.routers.whoami.rule=Host(`whoami.testapp.example.com`)' \
  -l 'traefik.http.routers.whoami.entrypoints=web' \
  -l 'traefik.http.services.whoami.loadbalancer.server.port=80' \
  traefik/whoami

docker run -d \
  --name postgres1 \
  -e POSTGRES_PASSWORD=pass \
  -l 'traefik.enable=true' \
  -l 'traefik.tcp.routers.pg1.rule=HostSNI(`db1.testapp.example.com`)' \
  -l 'traefik.tcp.routers.pg1.entrypoints=postgres' \
  -l 'traefik.tcp.routers.pg1.tls=true' \
  -l 'traefik.tcp.services.pg1.loadbalancer.server.port=5432' \
  postgres

docker run -d \
  --name postgres2 \
  -e POSTGRES_PASSWORD=pass \
  -l 'traefik.enable=true' \
  -l 'traefik.tcp.routers.pg2.rule=HostSNI(`db2.testapp.example.com`)' \
  -l 'traefik.tcp.routers.pg2.entrypoints=postgres' \
  -l 'traefik.tcp.routers.pg2.tls=true' \
  -l 'traefik.tcp.services.pg2.loadbalancer.server.port=5432' \
  postgres
```

ワイルドカードなサブドメインをEC2のPublicIPアドレスへ向ける。

## Links
- https://traefik.io/traefik
- https://doc.traefik.io/traefik/getting-started/quick-start/
