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
