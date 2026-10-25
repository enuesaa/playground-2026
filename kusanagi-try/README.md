# kusanagi

- 高速なウェブサーバーという意識
- WordPress だけをホストできるもんだと思っていたが他もできるっぽい？
- AWS でもホストできる
  - Kusanagi for AWS
  - マーケットプレイスに AMI があるのでそれをサブスクライブして EC2 インスタンスを立てる
  - https://kusanagi.tokyo/cloud/kusanagi-for-aws/
- AlmaLinux と CentOS Stream 版の2つがある
  - 悩むが AlmaLinux かなー自分は。
  - Stream は安定しているのか不安がある

### コマンド
https://kusanagi.tokyo/document/kusanagi-quickstart/

```bash
dnf upgrade -y ### けっこう時間かかる。AMIにいっぱいパッケージが入っている模様
reboot

### ウェブサーバー & DBのセットアップ
kusanagi init \
  --passwd "password" --nophrase \
  --dbrootpass "password" \
  --basicauthuser user --basicauthpass password \
  --nginx131 --php83 --mariadb10.6

### WordPress のセットアップ
kusanagi provision --wp \
  --fqdn example.com --noemail \
  --dbname testdb --dbuser user --dbpass password \
  --adminemail example@example.com \
  --adminuser admin --adminpass password \
  --title test test

### Lets Encrypt で証明書発行
kusanagi ssl --email example@example.com test
```

### Links
- https://kusanagi.tokyo/
