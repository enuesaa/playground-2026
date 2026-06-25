# AWS Lambda MicroVMs

- ファーストインプレッションは cloud functions みたいにクラウドでビルドが必要な lambda 関数
  - cloud shell をもっとカスタマイズできるようにしたものに思えてきた。
  - ある意味で cloud run に近いのでは？
- いろいろ機能がある
- コストは初見では安そうに思える
  - MicroVM Image を作るときにメモリやvCPUを指定できる
  - メモリ2GB vCPU1 を30日間起動しっぱなしだと105ドルくらいかかるかな
  - 実のところ起動しっぱなしはしないだろうし、実質そんなにかからないと思う
  - https://dev.classmethod.jp/articles/aws-lambda-introduces-microvms/#%25E6%2596%2599%25E9%2587%2591
- イメージから microvm を起動すると
  - sh できる
    - websocketで通信するらしい
  - インターネットへでれた。
  - ウェブサーバーも立てたら外からアクセスできた
    - なのでデフォルトではパブリックサブネットにいるっぽい
    - ネットワークコネクタなる設定でvpcを指定できそう
      - LambdaのAWSコンソールにしれっと出てるけどこれまでなかったと思う。VPC Lambdaだと関数単体でVPC Subnetを指定する感じだから。
      - ENIを作るためのIAMロールの指定が必要
  - ネットワークの設定は MicroVM を起動時に変更できるっぽい
  - urlもついてくる
    - トークンが必須
    - トークンを発行して `X-aws-proxy-auth` というヘッダに入れる。
    - ポートは `X-aws-proxy-port` というヘッダで指定できる
      ```bash
      curl -H 'X-aws-proxy-auth:xxx' -H 'X-aws-proxy-port:8000' https://xxx.lambda-microvm.ap-northeast-1.on.aws/
      ```
    - docker コンテナで expose しているけどあんまり意味なさそう
  - MicroVM を実行 -> 一時停止 -> 終了 というふうにステータスが変わる
    - 例えば60秒間何も触らなかったら一時停止
    - 一時停止ステータスが60秒つづいたら終了、、というふうにもできた
    - これは MicroVM の起動時に設定できる
- AWSコンソールの挙動が若干怪しい気がする。出たばかりなので。

## Links
- https://aws.amazon.com/jp/blogs/news/run-isolated-sandboxes-with-full-lifecycle-control-aws-lambda-introduces-microvms/
