# OpenShip

- Vercel みたいなホスティングプラットフォームらしい
- セルフホストできる
- git 連携等できる
- 同名？のプロジェクトがあるっぽいのでそっちと混同しないよう注意
- git, docker が必須
- いちおうローカルで public repository の登録 & git clone & ビルド まではできたが、どこで見れるのかわからない
- なんとなくまだできたばっかぽさがある

Amazon Linux 2023 で試した
```bash
# 必要っぽい
dnf install -y git
dnf install -y docker
systemctl enable --now docker

# install
## なんかこれが bun をインストールしてそっからopenshipのセットアップ？をするっぽい
## see https://openship.io/docs/getting-started/installation
curl -fsSL https://get.openship.io | sh
openship --help

# setup
## admin の情報とか入れる。最後に管理サーバーが立ち上がる様子
openship

# ドメイン変更するには
openship up --public-url http://<domain>:3001/
openship stop # 一度再起動が必要
openship up --public-url http://<domain>:3001/
```

## Links
- http://gihyo.jp/article/2026/07/openship
- https://github.com/oblien/openship
