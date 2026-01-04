# aws bedrock agentcore

- LLMアプリのホスティング環境
- AgentCore CLI がありサクッと作れる
  - `uv add --dev bedrock-agentcore-starter-toolkit`
  - ECS Copilot CLI を彷彿とさせる

```bash
# プロジェクト作成
agentcore create
agentcore configure -e main.py # ファイルがあるなら

# デプロイ
agentcore deploy
agentcore status # ステータスを確認

# Invoke
agentcore invoke '{"prompt": "Hello"}'

# Destroy
agentcore destroy
```
