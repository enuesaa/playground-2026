# Cloudflare Hyperdrive

- DB へ接続するサービス
- Cloudflare 外にホストされている DB への接続情報を保存したり、実際に接続する（クライアント）
- 基本的には Cloudflare Workers VPC の Tunnel 経由で DB へ接続
- Cloudflare Worker に Hyperdrive を binding して DB へ接続できる

## 手順

1. EC2 を起動
2. Cloudflare Tunnel をセットアップ
```bash
curl -fsSl https://pkg.cloudflare.com/cloudflared.repo | tee /etc/yum.repos.d/cloudflared.repo
yum update
yum install cloudflared
cloudflared service install xxx ## Cloudflare のコンソールに表示されている
systemctl status cloudflared
```
3. MariaDB を立ち上げる
```bash
dnf install -y mariadb105-server
mariadb <<'SQL'
CREATE DATABASE appdb
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

CREATE USER '<UESRNAME>'@'%' IDENTIFIED BY '<PASSWORD>';
GRANT ALL PRIVILEGES ON appdb.* TO '<UESRNAME>'@'%';

USE appdb;

CREATE TABLE notes (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

INSERT INTO notes (title, content) VALUES
    ('買い物リスト', '牛乳、卵、パン'),
    ('作業メモ', 'EC2 の MariaDB 接続を確認する'),
    ('アイデア', 'メモを管理するアプリを作る');
SQL
mariadb -u <USERNAME> -p<PASSWORD> appdb
```
4. Cloudflare Hyperdrive の設定
  - Cloudflare Workers VPC (Tunnel) をここで選ぶ
  - MySQLかPostgreSQL化選択
  - DB名, ユーザ名, パスワードを入力
5. connectdbworker をデプロイ

すると DB へ接続されて画面にレコード一覧が表示される

## Links
- https://developers.cloudflare.com/hyperdrive/
- https://zenn.dev/kameoncloud/articles/217263d6c87815
