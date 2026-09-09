# AWS CodeArtifact

- パッケージのリポジトリ
- 前から知ってたけど初めてトライ
- pythonとかnode.jsとかあと意外にもrustも対応しているっぽい
- 概念として
  - ドメイン
  - リポジトリ
  - パッケージというのがある
- ドメインというのはいわゆるテナント。ただの箱。
- 試しに昔作った debugroll を publish してみたけど面倒だわ正直。
  - CIで自動化しないときつい
- あと間違えてpypiの方にパブリッシュしてしまいそうでそっちも怖い

```bash
# publish のしかた
CODEARTIFACT_AUTH_TOKEN=`aws codeartifact get-authorization-token --domain xxx --domain-owner xxx --region xxx --query authorizationToken --output text`
poetry config repositories.debugroll <コンソールにあるURL>
oetry config http-basic.debugroll aws ${CODEARTIFACT_AUTH_TOKEN}
poetry publish --repository debugroll
```

## Links
- https://buildersbox.corp-sansan.com/entry/2022/08/22/110000
