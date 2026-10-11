# ACM ACME Enpoint

- ACME に対応
- これまでの ACM の証明書とは別のリソースになっているっぽい
- Certbot 等を用いて自動更新できるはず
- CertBot が ACME Endpoint へアクセスするために EAB資格情報 というのが必要
  - これはIAM権限みたいなものと理解している
  - https://dev.classmethod.jp/articles/acm-acme-endpoint-certbot-ec2-nginx-apache/#eab-%25E8%25B3%2587%25E6%25A0%25BC%25E6%2583%2585%25E5%25A0%25B1%25E3%2581%25AE%25E4%25BD%259C%25E6%2588%2590
  - この辺りは理解不足。なんだかよくわからん
  - 発行したら KeyID と HMACKey が得られる。これを certbot へ渡す
- 


## Commands
Setup certbot
```bash
dnf install certbot
certbot certonly --standalone --non-interactive \
  --agree-tos \
  --register-unsafely-without-email \
  --server <EndpointUrl> \
  --eab-kid <KeyId> \
  --eab-hmac-key <HMACKey> \
  --key-type ecdsa --elliptic-curve secp256r1 --issuance-timeout 120 \
  -d <YourDomain>
```

Setup apache
```bash
dnf install -y httpd mod_ssl
vim /etc/httpd/conf.d/ssl.conf
>SSLCertificateFile /etc/letsencrypt/live/<YourDomain>/fullchain.pem
>SSLCertificateKeyFile /etc/letsencrypt/live/<YourDomain>/privkey.pem

systemctl enable --now httpd
```

更新設定
```bash
systemctl enable --now certbot-renew.timer
systemctl list-timers
```

更新した時に Apache のリロードが必要
```bash
vim /etc/letsencrypt/renewal-hooks/deploy/reload-httpd.sh
>#!/bin/bash
>/usr/bin/systemctl reload httpd

chmod 755 /etc/letsencrypt/renewal-hooks/deploy/reload-httpd.sh
```

動作確認
```bash
certbot renew --force-renewal
systemctl status httpd
```

## Links
- https://aws.amazon.com/jp/blogs/aws/automate-public-tls-certificate-issuance-with-acme-support-in-aws-certificate-manager/
- https://dev.classmethod.jp/articles/acm-acme-endpoint-certbot-ec2-nginx-apache/
