import os
from strands import Agent
from strands_tools.code_interpreter import AgentCoreCodeInterpreter
from bedrock_agentcore.runtime import BedrockAgentCoreApp
import mcp
from model import load_model

app = BedrockAgentCoreApp()
REGION = os.getenv("AWS_REGION")

@app.entrypoint
async def invoke(payload, context):
    session_id = getattr(context, 'session_id', 'default')
    
    code_interpreter = AgentCoreCodeInterpreter(
        region=REGION,
        session_name=session_id,
        auto_create=True,
        persist_sessions=True
    )

    with mcp.http_mcp_client as client:
        tools = client.list_tools_sync()
        agent = Agent(
            model=load_model(),
            system_prompt='You are a helpful assistant with code execution capabilities. Use tools when appropriate',
            tools=[code_interpreter.code_interpreter, mcp.add_numbers] + tools
        )
        stream = agent.stream_async(payload.get("prompt"))

        async for event in stream:
            if "data" in event and isinstance(event["data"], str):
                yield event["data"]

            # if "toolUse" in event:
            #   # Process toolUse

            if "result" in event:
               yield(format_response(event["result"]))

def format_response(result) -> str:
    parts = []
    try:
        tool_metrics = result.metrics.tool_metrics.get('code_interpreter')
        if tool_metrics and hasattr(tool_metrics, 'tool'):
            action = tool_metrics.tool['input']['code_interpreter_input']['action']
            if 'code' in action:
                parts.append(f"## Executed Code:\n```{action.get('language', 'python')}\n{action['code']}\n```\n---\n")
    except (AttributeError, KeyError):
        pass

    parts.append(f"## 📊 Result:\n{str(result)}")
    return "\n".join(parts)

if __name__ == "__main__":
    app.run()
