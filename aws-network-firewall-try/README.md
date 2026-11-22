# AWS Network Firewall

- 外向きの通信を監視する
- ファイアウォールサブネットを決めて Network Firewall を作成
  - するとファイアウォールエンドポイントがたつ (VPCE)
  - のでそこへ通信をながす。
  - で、問題なければ Internet Gateway へ流す
- なんかちょうど次世代なんとかってルールが出たはずで色々変わっている
- Network Firewall 単体では抜け穴があるという見解が多いため注意。これを導入すれば十分というわけではない。
  - https://note.coincheck.com/n/nc003fc46b858
- Network Firewall Proxy というものが発表されていた
  - プレビュー中
  - これであればSquidの代わりになるのでは？という見解も多そう
  - けど直近でなにか変わったらしくて試せてない
  - https://aws.amazon.com/jp/about-aws/whats-new/2026/08/aws-network-firewall-forward-proxy-preview/
- NAT Gateway と統合する？Network Firewall が登場？
  - https://aws.amazon.com/jp/about-aws/whats-new/2026/11/network-firewall-automated-internet/

## Links
- https://qiita.com/nasuvitz/items/36be4707562f42a919c1
- https://dev.classmethod.jp/articles/aws-network-firewall-design-operation-best-practices-nw-jaws/