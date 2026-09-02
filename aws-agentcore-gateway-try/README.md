# agentcore gateway

- MCP Server の Gateway
- MCP Server を作れる
- 認証認可は IAM とか JWT とか比較的何でもいける
- WAF とかもつけれる
- AWS で MCP Server を作る時はこれ前提になるかも
- 正直これ単体で1サービスになるんじゃね？

```bash
claude mcp add mygateway --scope user -- uvx mcp-proxy-for-aws@1.6.0 'https://xxx.gateway.bedrock-agentcore.ap-northeast-1.amazonaws.com/mcp' --service bedrock-agentcore --region ap-northeast-1
```
