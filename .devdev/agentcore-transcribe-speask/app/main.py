from strands import Agent
from bedrock_agentcore.runtime import BedrockAgentCoreApp
from app.mcpclient import websearch, add_numbers
from app.model import load_model

app = BedrockAgentCoreApp()

@app.entrypoint
async def invoke(payload, context):
    prompt = payload.get('prompt')

    with websearch as websearch_client:
        tools = websearch_client.list_tools_sync()
        agent = Agent(
            model=load_model(),
            system_prompt='You are a helpful assistant with code execution capabilities. Use tools when appropriate',
            tools=[add_numbers] + tools
        )
        stream = agent.stream_async(prompt)

        async for event in stream:
            if 'data' in event and isinstance(event['data'], str):
                yield event['data']

            # if "toolUse" in event:
            #   pass

            if 'result' in event:
               yield(format_response(event['result']))

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
