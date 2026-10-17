# Cloudflare Images

- いわゆる Object Lambda 的な。
  - 画像加工ができる
  - 事前定義するか
    - 例えば width500 height500 を square と定義すると  
    `https://imagedelivery.net/id/id/square` でそのサイズが見れる
    - デフォルトのサイズで見るなら  
    `https://imagedelivery.net/id/id/public`
    - これを Variants と呼ぶ
    - https://developers.cloudflare.com/images/optimization/hosted-images/create-variants/
  - あるいはURLでサイズを受け付けてそれに応じて加工することもできる
    - 例えば `https://imagedelivery.net/id/id/w=600,sharpen=3` というふうに。
    - これを Flexible Variants と呼ぶ
    - https://developers.cloudflare.com/images/optimization/hosted-images/enable-flexible-variants/
- 月額5ドルかかる
  - サブスクリプションの登録が必要
  - https://developers.cloudflare.com/images/pricing/
- Cloudflare のコンソール上は Hosted Images って書かれてるけど Images らしい

## Links
- https://developers.cloudflare.com/images/
