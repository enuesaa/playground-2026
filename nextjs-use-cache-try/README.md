# Next.js use cache

- 思ったより挙動の理解が難しい
- pnpm dev だとなんかキャッシュされないというか頭の中に挙動を落とし込むのが難しい
  - pnpm build & pnpm start して再現せざるを得ない
  - いちおう確かにキャッシュはされているっぽい
- 時間指定のキャッシュは面白いかも
  - `cacheLife("minutes")`
  - 実際試したけど確かにこの挙動になる
  - 初見では Laravel の file system cache みたいなものかと思った

## Links
- https://nextjs.org/docs/app/api-reference/directives/use-cache
- https://zenn.dev/b13o/articles/about-ppr-nextjs
