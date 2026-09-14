# AgentCore Identity Consent Portals

- AgentCore Gateway でいろんなウェブAPIとかに接続できると思うが、その接続先から個々人の情報を得る/操作するために許可が必要。技術的には oauth2 で接続する必要がある
- その同意ポータル
- 実際に GitHub で oauth2 のアプリを作って consent portal から同意画面にいき、そして mcp tool を claude code から呼び出してみた
- 若干構成が複雑。最初何が何だかわからなかった
  - 要は、同意ポータルへまずログインできるようにする必要がある
  - 構築の流れとしては2ステップある
    - 同意ポータルへログインできるようにする
    - 例えば GitHub にて oauth2 アプリを作って接続する
- 自分の理解としては AgentCore Gateway を真面目に使って例えばユーザー自身の情報を参照/更新できるようにするにはこういう仕組みがどこかで必要

## Links
- https://dev.classmethod.jp/articles/agentcore-consent-portal-github/
