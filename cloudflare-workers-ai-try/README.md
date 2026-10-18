# Cloudflare Workers AI

- まあいわゆる AI Gateway 的な。
- Workers に AI をバインディングして呼び出せる
- jev とかもあった。考えてみればここで試せばよかった
- AI の利用料金は、ざっくり無料枠ありの従量課金っぽい
  - https://developers.cloudflare.com/workers-ai/platform/pricing/
  - 1日あたり 10,000 Neurons までは無料
  - それ以上使うには Workers Paid のサブスクライブが必要。かつ従量課金
  - Neuron とは
    - モデルごとに単価が違うという理解
    - https://developers.cloudflare.com/workers-ai/platform/pricing/#what-are-neurons
  - 本検証にあたり数回程度呼び出したら 60 Neurons だったので、ある程度の無料枠はありそう

## Links
- https://www.cloudflare.com/ja-jp/developer-platform/products/workers-ai/
