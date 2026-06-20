# Transfer Postgres DB Data to Snowflake DWH

- EC2 (AL2023) に Postgres 17 の DB を立てる
- Snowflake Connector for PostgreSQL のコンテナを立てる
- そして Snowflake へデータを転送する。

## 感想
- EC2にDBを立てる構成であるためそのセットアップが面倒で、Snowflake Connector 用のユーザーを作ったり docker コンテナからアクセスできるよう pg_hba を調整するのが面倒だったが、
- Snowflake Connector の単体について言えば言うほど難しくはない
- Snowflake 側では dest の設定が必要
- データの同期に多少のラグはありそう
  - 数分程度
  - これは自分の設定がいけないのかも

## 参考

- https://dev.classmethod.jp/articles/snowflake-connector-for-postgresql-config-try-snowflakedb/
- https://docs.snowflake.com/en/connectors/postgres6/install-agent

## 手順
```bash
### Install postgres 17
$ dnf install -y https://download.postgresql.org/pub/repos/yum/reporpms/EL-9-x86_64/pgdg-redhat-repo-latest.noarch.rpm
$ dnf -qy module disable postgresql
$ dnf install -y postgresql17-server postgresql17
$ /usr/bin/postgresql-setup --initdb
$ systemctl enable --now postgresql

### Create dummy data
$ sudo -u postgres psql
postgres=# CREATE DATABASE app;
postgres=# CREATE TABLE notes (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

postgres=# INSERT INTO notes (title, body)
SELECT
    'Note #' || g,
    repeat('This is the body of Note #' || g || E'.\n', 20)
FROM generate_series(1,10000) AS g;

postgres=# SELECT * FROM notes WHERE id = 3;

### Change DB Settings
### see https://docs.snowflake.com/en/connectors/postgres6/postgresql-characteristics#server-settings

$ vim /var/lib/pgsql/data/postgresql.conf
wal_level = logical
listen_addresses = '*'

$ systemctl restart postgresql

$ sudo -u postgres psql
postgres=# CREATE PUBLICATION mypublication FOR ALL TABLES;
postgres=# ALTER PUBLICATION mypublication ADD TABLE notes;
postgres=# ALTER USER postgres WITH PASSWORD 'your-password';

$ vim /var/lib/pgsql/data/pg_hba.conf
host    all             all             0.0.0.0/0            scram-sha-256 ## 注意

$ systemctl reload postgresql

### Install docker compose
$ dnf install spal-release
$ dnf search docker --repo=amazonlinux-spal
$ dnf install docker-cli docker-compose
$ systemctl enable --now docker

### Start Snowflake Connector for PostgreSQL Agent Container
$ vim compose.yml
services:
  agent:
    image: snowflakedb/database-connector-agent:latest
    volumes:
      - ./agent-keys:/home/agent/.ssh
      - ./configuration/snowflake.json:/home/agent/snowflake.json
      - ./configuration/datasources.json:/home/agent/datasources.json
    environment:
      - JAVA_OPTS=-Xmx5g
    extra_hosts:
      - "host.docker.internal:host-gateway"
$ docker compose up
```
