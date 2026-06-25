# AWS Lambda MicroVMs

- ファーストインプレッションは cloud functions みたいにクラウドでビルドが必要な lambda 関数
- いろいろ機能がある。
  - cloud shell をもっとカスタマイズできるようにしたものに思えてきた。
  - ある意味で cloud run に近いのでは？
- コストは初見では安そうに思える
  - microvm のイメージを作るときにメモリやvCPUを指定できる
- イメージから microvm を起動すると
  - sh できる
    - websocketで通信するらしい
  - インターネットへでれた。
  - ウェブサーバーも立てられ外からアクセスできた
    - なのでデフォルトではパブリックサブネットにいるっぽい
    - ネットワークコネクタ？なる設定でvpcを指定できそう？
  - urlもついてくる
    - トークンが必須
    - トークンを発行して `X-aws-proxy-auth` というヘッダに入れる。
    - ポートは `X-aws-proxy-port` というヘッダで指定できる
      ```bash
      curl -H 'X-aws-proxy-auth:xxx' -H 'X-aws-proxy-port:8000' https://xxx.lambda-microvm.ap-northeast-1.on.aws/
      ```
    - docker コンテナで expose しているけどあんまり意味なさそう
