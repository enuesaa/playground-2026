# AWS Bedrock Nova 2 Sonic

- 音声で会話できるモデル
- 日本語は対応してない。がある程度は会話できる
- 実行環境により音声の入力/出力をするインタフェースが異なる

### Links
- https://strandsagents.com/latest/documentation/docs/user-guide/concepts/experimental/bidirectional-streaming/quickstart/
- https://strandsagents.com/latest/documentation/docs/user-guide/concepts/experimental/bidirectional-streaming/io/?h=websocket.#websocket-io

## AgentCore Setup

```bash
uv add --dev bedrock-agentcore-starter-toolkit
agentcore configure -e main.py
agentcore launch
```

### Links
- http://dev.classmethod.jp/articles/amazon-bedrock-agentcore-runtime-ai-hosting/
