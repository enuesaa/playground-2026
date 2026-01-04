# aws bedrock agentcore

- LLMアプリのホスティング環境
- AgentCore CLI がありサクッと作れる
  - `uv add --dev bedrock-agentcore-starter-toolkit`
  - ECS Copilot CLI を彷彿とさせる

```bash
agentcore create # テンプレ作成
agentcore deploy
agentcore status # ステータスを確認
agentcore invoke '{"prompt": "Hello"}' # テスト
agentcore destroy
```
