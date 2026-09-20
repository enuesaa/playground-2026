# Nginx Routing on Request Body

- これ
  https://blog.nginx.org/blog/nginx-routing-on-http-request-body
- Nignx 1.31.5 より。
- リクエストボディの値を見てルーティングできるようになった

Command
```bash
## add repo
rpm --import https://nginx.org/keys/nginx_signing.key
tee /etc/yum.repos.d/nginx.repo <<'EOF'
[nginx-mainline]
name=nginx mainline repo
baseurl=http://nginx.org/packages/mainline/amzn/2023/$basearch/
gpgcheck=1
enabled=1
gpgkey=https://nginx.org/keys/nginx_signing.key
module_hotfixes=true
EOF

## install nginx 1.31.5
dnf info nginx-1.31.5
dnf install nginx-1.31.5

## Enable
systemctl enable --now nginx

## Conf書き換え
vim /etc/nginx/conf.d/default.conf
nginx -t
systemctl reload nginx
```

conf
```conf
server {
    listen       80;
    server_name  localhost;
    client_body_early_read 1;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }

    location /aaa {
        if ($request_body = "bbb") {
            return 202 "helloaccepted!\n";
        }
        return 200 "OK\n";
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```

確認
```bash
$ curl localhost:80/aaa
OK
$ curl localhost:80/aaa -d 'bbb'
helloaccepted!
$ curl localhost:80/aaa -d 'bbx'
OK
```

## Links
- https://blog.nginx.org/blog/nginx-routing-on-http-request-body
