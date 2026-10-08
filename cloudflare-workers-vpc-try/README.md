# Cloudflare Workers VPC

- Workers から Tunnel を介してプライベートネットワークへ接続できるらしい
- VPC を binding するイメージ
- まだbeta
- だいたい想像通り。Tunnel してそれを Worker から読み取るイメージ。

### 手順
1. Cloudflare のコンソールで Tunnel を作成
    - ここにコマンドとか表示されてる
2. AWS で EC2 (AL2023) を立ち上げ
3. cloudflared をインストール
    - https://pkg.cloudflare.com/index.html#Amazon-Linux
    - コマンド
        ```bash
        curl -fsSl https://pkg.cloudflare.com/cloudflared.repo | tee /etc/yum.repos.d/cloudflared.repo
        yum update
        yum install cloudflared
        cloudflared service install xxx ## Cloudflare のコンソールに表示されている
        systemctl status cloudflared
        ```
4. EC2 で nginx を起動
    ```bash
    dnf install -y nginx
    systemctl enable --now nginx
    curl localhost:80
    ```
5. Cloudflare VPC Service を作成
    - これは Tunnel を選ぶ。
    - Binding 用のリソースを作成するイメージ
6. 接続用の Worker をデプロイ
7. Worker のURLをブラウザで開くと Nginx のトップページが表示された

## Links
- https://developers.cloudflare.com/workers-vpc/
- https://zenn.dev/takaakisuzuki/articles/55ac5494c80d35
