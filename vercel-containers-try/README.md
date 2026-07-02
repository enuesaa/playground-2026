# Vercel Containers

- vercel でコンテナが動く
- `npx vercel` ってコマンドを打つだけでプロジェクトを作成し docker image を検出して、docker 環境を作ってくれた
- クラウドでビルドする系。ローカルじゃない
- ポートはデフォルトで 80 番
  - Dockerfile.vercel で 80 番ポートでサーバーを立ち上げておけばプレビューURLで動作を確認できる
- 心なしか重たい。
  - アクセスがあるたびにコンテナを起動しているのかな？
  - コールドスタートみたいな挙動。最初数秒かかる
  - その後はすぐ（とはいえちょっと重たいが）
  - 少し放置したらまたコールドスタート
- 関数てきな挙動をするらしい
  - 放置したらスケールダウンする
  - https://vercel.com/docs/functions/container-images#scale-in-behavior
- 一応ビルドログやコンテナのログは見れた
- 地理てきにどこで動いているかは管理画面を見る限りは分からなかった
- 課金はコンテナの起動時間される模様

## Links
- https://dev.classmethod.jp/articles/vercel-run-any-dockerfile/
