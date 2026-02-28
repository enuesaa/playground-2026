# portless

- `portless <subdomain> next dev` っていうふうにコマンドを打つと next dev を実行してそれを `<subdomain>.localhost:<port>` に proxy してくれる
- 便利？かも。
- あくまで proxy なので `localhost:<port>` と `<subdomain>.localhost:<port>` の2つが立つ
- ので、ちょっと混乱するかも。
- が、ドメイン指定したいユースケースはあるので、そういうとき便利だと思う

## Links
- https://github.com/vercel-labs/portless
- https://zenn.dev/mickamy/articles/9a251e7cf51b9c
