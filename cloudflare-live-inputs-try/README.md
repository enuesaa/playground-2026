# Cloudflare Live Inputs

- いわゆるライブ配信をできる
- OBS Studio にて。
- Cloudflare が配信サーバー。
- Live Inputs のリソースを作成すると配信サーバーのURL(RTMPS)とそのパスコード(キー)が発行されるので、それを OBS Studio にセットすると配信できる
- 配信の様子は Cloudflare のコンソールにて見れる
  - おそらくURLが発行されるのでそれを視聴者に送る感じかな
- なかなか新感覚
- 配信終えると Hosted Videos に動画がアップロードされる

## Links
- https://developers.cloudflare.com/stream/examples/obs-from-scratch/
