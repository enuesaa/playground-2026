# Transfer Postgres DB Data to Snowflake DWH

## DBのセットアップ
EC2 で。

```bash
$ cat /etc/os-release
NAME="Amazon Linux"
VERSION="2023"

### Install postgres 17

$ dnf install -y https://download.postgresql.org/pub/repos/yum/reporpms/EL-9-x86_64/pgdg-redhat-repo-latest.noarch.rpm
$ dnf -qy module disable postgresql
$ dnf install -y postgresql17-server postgresql17

### setup
$ /usr/bin/postgresql-setup --initdb
$ systemctl enable --now postgresql

### connect
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
```
