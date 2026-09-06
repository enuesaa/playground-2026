# agentcore gateway

- MCP Server の Gateway
- MCP Server を作れる
- 認証認可は IAM とか JWT とか比較的何でもいける
- WAF とかもつけれる
- AWS で MCP Server を作る時はこれ前提になるかも
- 正直これ単体で1サービスになるんじゃね？

```bash
claude mcp add mygateway --scope user -- uvx mcp-proxy-for-aws@1.6.0 'https://xxx.gateway.bedrock-agentcore.ap-northeast-1.amazonaws.com/mcp' --service bedrock-agentcore --region ap-northeast-1
claude mcp list
```

## Lambda ターゲット
スキーマ
```json
{
  "name": "hello",
  "description": "hello",
  "inputSchema": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string"
      },
      "message": {
        "type": "string"
      }
    },
    "required": ["name", "message"]
  }
}
```

Lambda
```py
import json

def lambda_handler(event, context):
    caller = context.client_context.custom.get("bedrockAgentCoreToolName", "")
    _, _, toolname = caller.partition("___")
  
    if toolname == "hello":
        name = event.get("name")
        message = event.get("message")

        return {
            "result": f"Hello, {name}! You said: {message}"
        }
    return {
        "error": f"Unknown tool: {toolname}"
    }
```

claude code への登録
```bash
claude mcp add --transport http mygate 'https://xxx.gateway.bedrock-agentcore.ap-northeast-1.amazonaws.com/mcp' --client-id xxx --callback-port 8080
claude mcp login mygate
```

- client id は cognito app client の client id
- cognito のリソースサーバとして `https://xxx.gateway.bedrock-agentcore.ap-northeast-1.amazonaws.com/mcp` を登録する
- mcp の認証認可について
  - https://qiita.com/icoxfog417/items/ef2c3382056968032dd5
  - https://zenn.dev/manaty226/articles/20250614_aws-mcp-managed-architecture
