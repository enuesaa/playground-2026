# cloudflare containers

- workers paid (5ドル/月) に加入する必要あり
- なんか思っていたのと違う。
- docker image を push できるしそれからコンテナを起動はできる
- が、workers 経由でコンテナへアクセスするっぽい
  - つまり workers でコンテナを起動する処理を書いて、アクセスしたらコンテナが起動して、自動ストップして、、みたいな。
  - ./src は workers のソースコード
  - ./container_src が docker イメージのソースコード
- コードの `c.env.MY_CONTAINER` は durable object にbindingされている
  - durable objectはsignletonなインスタンスてきなやつ。
  - すごく雑にいうとPHPのクラスをserializeしてそれをredisとかに入れて置いているやつみたいな感じ。グローバルで共通なコードという意味。状態も保持する
  - つまり `class MyContainer extends Container<Env>` というクラスのインスタンスが durable objects に保持されており、これ経由で cloudflare containers を起動したりできる

## Links
- https://developers.cloudflare.com/containers/
- https://qiita.com/toreis/items/f266c8cbd9b2cb4537c9
- https://zenn.dev/774u64/articles/1e351b11f21928
