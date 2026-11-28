# AWS Network Firewall (with NAT Gateway)

- Network Firewall に NAT Gateway と統合するモードができた
- Network Firewall を作成するときに EIP と NAT Subnet を選んでそのあと Firewall Policy の設定
- これにより構成がシンプルになる認識
- 「非プロキシトラフィックでNATを有効化」をチェックすると、プロキシを使わない通信も検査後にNAT Gateway経由で出るらしい
