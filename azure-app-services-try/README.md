# Azure App Services

- まあいわゆるウェブアプリのホスティングサービス
- カバー範囲が広い
  - いわゆるElasticBeanstalk/AppEngineからコンテナまで
    - 前者の場合は .NET / PHP / Node.js / Python など幅広いランタイムをサポート
    - 後者の場合、デフォルトでは nginx のコンテナがデプロイされる様子
    - イメージのリポジトリは App Services のなかにもおけるし Azure Container Registry にもおけるぽい
  - DB もホストできるらしい？
  - 謎に WordPress 専用の構成？みたいなものもある
- 他のサービスとの比較
https://learn.microsoft.com/ja-jp/azure/container-apps/compare-options
