# render

- よくあるやつ
- railway や heroku や fly.io と同じ。
- ウェブアプリのホスティングサービス
- モダン寄り
  - docker イメージを指定してデプロイする
  - その意味では gitops に近いんだと思った。
- 想像よりもお手軽ではなかった。
  - 概念的にはECS Serviceに近い
  - イメージを指定したり環境変数をセットしたり、まあインスタンスタイプを決めたり。
  - ネットワーク部分が簡素化されてる印象。
    - 簡素化、、というよりそもそもその設定がない？っぽい。
- 無料プランで15分アクセスがないとダウンされる
  - `Render spins down a Free web service that goes 15 minutes without receiving any inbound traffic`
  - https://render.com/docs/free#spinning-down-on-idle
  - https://note.com/pansansui/n/n3fb5ce3bee4c
- 裏側でVPCみたいなプライベートネットワークを作るっぽく、同じリージョンにデプロイしたアプリは相互に通信できる？っぽい
  - https://render.com/docs/private-network
  - PrivateLink で自前のAWS VPCと接続できると書かれている。これができるのであれば render が AWS に乗っかってそうな気がしている
  - AWSに乗っかっているっぽい
    - https://community.render.com/t/which-render-regions-map-to-which-cloud-providers/5987/4

## Links
- https://render.com/
