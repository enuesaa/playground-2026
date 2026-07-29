# AWS Idneitty Center

- さすがに慣れてきた
- さいきんログイン後のデザインが変わったっぽい
- aws cli での使い方
  - aws configure sso でスタートURLとリージョンを指定する
  - aws sso login でブラウザが開くのでログインする
  - あとは普通にaws cliを使える
- saml とかもできるので便利
- なんか sso を有効化したら aws コンソールのドメインに account id が入るようになった気がしていたが、関係なかった。
  - マルチセッションログインを有効化したら入るらしい。あれってそういう仕組みか
    https://dev.classmethod.jp/articles/aws-consol-multisession/
