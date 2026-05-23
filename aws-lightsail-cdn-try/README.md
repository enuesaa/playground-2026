# AWS Lightsail CDN

- lightsail の cdn
- ベースは cloudfront
  - cloudfront を使ったことある人であれば触れると思う
  - ただしキャッシングの設定が昔ながらで今みたいなポリシーじゃないのでそこだけ注意
- オリジンはバケット/instance/container/lbなど
  - 基本的にlightsailのリソースでないとオリジンとして選択できなさそう
  - バケットをオリジンとできた
    - なんかOACみたいな仕組みはない？みたいで、バケットを公開するしかなかった。これはよくわからん
    - ちなみにバケットには最低料金1ドル月かかる。
    - s3+cloudfrontみたいな構成であれば、キャッシングをフルにする前提であれば普通にs3の方が安いのではないか
- ちなみにリソースを作ってもs3やcloudfrontのコンソールには何も出てこない。全部隠されてる
- cloudfront のビヘイビアの仕組みはなくて、パス単位で切り替えたりはできない
  - 同じようにオリジンも一つだけ

## Links
- https://dev.classmethod.jp/articles/amazon-lightsail-object-storage-and-distribution/
- https://www.seeds-std.co.jp/blog/creators/2022-02-14-155501/
