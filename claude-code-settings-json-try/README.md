# Claude Code settings.json

- ワイルドカードに注意
  - 例えば `git` だけ deny しても `git commit` は通っちゃうっぽい
- auto mode への切り替えの背景
  - https://gihyo.jp/article/2026/08/auto-mode-default-in-claude-code

example
```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "permissions": {
    "allow": [
      "Read(./allow/**)",
      "Bash(curl *)"
    ],
    "ask": [
      "Read(./ask/**)"
    ],
    "deny": [
      "Bash(git commit *)",
      "Bash(git push *)",
      "Read(./deny/**)"
    ]
  },
  "env": {
    "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
    "OTEL_METRICS_EXPORTER": "otlp"
  }
}
```

## Links
- https://code.claude.com/docs/ja/settings
