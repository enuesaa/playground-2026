# cpanel

- トライアル (15 Day Test License) で確認
  - ライセンスはここで確認可能。
    https://www.cpanel.net/
  - 1ライセンス1サーバーらしい。IPアドレスと紐づけられる。VMのIPアドレスが変わったら cpanel.net で紐付けIPアドレスを変更可能
  - 月に30~60ドルくらいするっぽい
- 手っ取り早く構築するには AWS Lightsail が良さそう
  - 月に15ドルくらいかかるミニマムで。
  - ドキュメント
    - https://docs.aws.amazon.com/lightsail/latest/userguide/amazon-lightsail-quick-start-guide-cpanel.html
    - https://api.docs.cpanel.net/specifications/whm.openapi/account-creation/accounts-createacct
- 自前で構築するのめんどくさそうな印象にある
  - whm というソフトウェアも必要っぽくて、cpanel と whm との関係性がよくわかってないが、いずれにしてもちょい面倒そう
  - あとポートをいくつか開ける必要があって、何に使うのか、どういう設定が望ましいか判断に悩む

## Links
- https://www.cpanel.net/
