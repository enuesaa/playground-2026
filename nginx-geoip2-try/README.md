# Nginx GeoIP2

- Nginx 1.31.7 で GeoIP2 というのがサポートされたらしい
- https://blog.nginx.org/blog/nginx-1-31-7-native-geoip2-support-http-2-priorities-and-quic-improvements
- GeoIP2-Country-Test.mmdb というのに IP アドレスのリストみたいなのが入っていて、それをもとに国を判定しているそう
  - これはあくまでテスト用
  - 本番用は別にあるっぽい？
- そもそも GeoIP というのは。
  - 有償の位置情報データベースっぽい
  - https://anchor-u.com/product/maxmind-geoip2/

Al2023 で試してみる
```bash
### Install nginx 1.31.7
cat > /etc/yum.repos.d/nginx.repo <<'EOF'
[nginx-mainline]
name=nginx mainline
baseurl=https://nginx.org/packages/mainline/amzn/2023/$basearch/
gpgcheck=1
gpgkey=https://nginx.org/keys/nginx_signing.key
enabled=1
module_hotfixes=true
EOF

dnf install -y nginx nginx-module-geoip
nginx -v

### setup testdb
curl -Lo /etc/nginx/GeoIP2-Country-Test.mmdb https://github.com/maxmind/MaxMind-DB/raw/main/test-data/GeoIP2-Country-Test.mmdb

cat > /etc/nginx/nginx.conf <<'EOF'
load_module modules/ngx_http_geoip_module.so;
events {}
http {
    geoip_country /etc/nginx/GeoIP2-Country-Test.mmdb;
    geoip_proxy 127.0.0.1;
    server {
        listen 8080;
        return 200 "$geoip_country_code $geoip_country_name\n";
    }
}
EOF

### start
nginx -t
systemctl start nginx

### test
curl -H "X-Forwarded-For: xx.xx.xx.xx" http://127.0.0.1:8080/
```

## Links
- https://blog.nginx.org/blog/nginx-1-31-7-native-geoip2-support-http-2-priorities-and-quic-improvements
