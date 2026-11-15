# Squid

## Commands
Al2023で試してみた。  
EC2にSquidを立てて、そのEC2からexample.comへのリクエストをブロックするシンプルな構成。

```bash
dnf install -y squid
systemctl enable --now squid

## ブロック
vim /etc/squid/squid.conf
> ## これを追記。`http_access allow localhost` より前に。
> acl blocked_domains dstdomain .example.com
> http_access deny blocked_domains
systemctl reload squid

## ログ
tail /var/log/squid/access.log
```

確認

```bash
$ curl -x http://localhost:3128 -I https://example.com
HTTP/1.1 403 Forbidden
Server: squid/6.13
curl: (56) CONNECT tunnel failed, response 403

$ tail /var/log/squid/access.log
TCP_DENIED/403 CONNECT example.com:443 - HIER_NONE/- text/html
```

