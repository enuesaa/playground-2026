# Azure App Service

- まあいわゆるウェブアプリのホスティングサービス
- カバー範囲が広い
  - いわゆるElasticBeanstalk/AppEngineからコンテナまで
    - 前者の場合は .NET / PHP / Node.js / Python など幅広いランタイムをサポート
    - 後者の場合、デフォルトでは nginx のコンテナがデプロイされる様子
    - イメージのリポジトリは App Services のなかにもおけるし Azure Container Registry にもおけるぽい
  - DB もホストできるらしい？
  - 謎に WordPress 専用の構成？みたいなものもある
- 他のサービスとの比較
  - https://learn.microsoft.com/ja-jp/azure/container-apps/compare-options
  - https://techblog.ap-com.co.jp/entry/2022/10/24/194514
- Azure Container Registry へのイメージのpush方法
  ```bash
  brew install azure-cli
  az login
  az acr login --name <name>
  docker pull --platform linux/amd64 nginx:latest
  docker tag nginx:latest <name>.azurecr.io/testapp
  docker images
  docker tag nginx:latest <name>.azurecr.io/testapp:latest
  docker push <name>.azurecr.io/testapp:latest
  ```
