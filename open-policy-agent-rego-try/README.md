# Open Policy Agent (OPA)

- ポリシー言語
- Regoという言語らしい
- AWSのCedarみたいなもんかなあ。

install
```bash
brew install opa
```

eval (評価)
```bash
opa eval -d policy.rego -i input.json "data.httpapi.authz"
```

## Links
- https://www.openpolicyagent.org/docs
