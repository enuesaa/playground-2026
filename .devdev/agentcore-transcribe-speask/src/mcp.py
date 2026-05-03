from mcp.client.streamable_http import streamable_http_client
from strands.tools.mcp.mcp_client import MCPClient
from strands import tool

def get_streamable_http_mcp_client() -> MCPClient:
    return MCPClient(lambda: streamable_http_client("https://mcp.exa.ai/mcp"))

@tool
def add_numbers(a: int, b: int) -> int:
    return a+b

http_mcp_client = get_streamable_http_mcp_client()
