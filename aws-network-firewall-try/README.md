# AWS Network Firewall

- 外向きの通信を監視する
- ファイアウォールサブネットを決めて Network Firewall を作成
  - するとファイアウォールエンドポイントがたつ (VPCE)
  - のでそこへ通信をながす。
  - で、問題なければ Internet Gateway へ流す
- なんかちょうど次世代なんとかってルールが出たはずで色々変わっている

## Links
- https://qiita.com/nasuvitz/items/36be4707562f42a919c1
- https://dev.classmethod.jp/articles/aws-network-firewall-design-operation-best-practices-nw-jaws/