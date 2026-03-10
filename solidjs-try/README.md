# SolidStart

- 同じJSXだけあって react とまじで変わらないと思った。
- このレベルで同じであれば、react から移行とかもできるのでは？
  - hooks がなんとかなればいけそう。
- テンプレのデフォルトは SSR っぽい
  - なので entry-server.tsx がある
- SSG もできた。
  - なんか nitro というバンドラー？があって、それの役割が大きそう
  - nitro に prerender という設定項目があるので、そこでどのページをSSGするか指定できる
  - https://docs.solidjs.com/solid-start/getting-started
    - 見た感じ solid の config ファイルを作ってそこで指定する方法だと思う。今は vite に solid のプラグインを入れているので、そこでも指定できる？という認識
