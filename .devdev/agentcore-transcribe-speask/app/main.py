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
            system_prompt='あなたはスマートスピーカーです。ユーザーが話をします。それに回答してください。回答文はそのまま読み上げられます。そのため構造化せず文章で回答してください。必要があればツールを用いてください',
            tools=[add_numbers] + tools
        )
        stream = agent.stream_async(prompt)

        async for event in stream:
            # if 'data' in event and isinstance(event['data'], str):
            #     yield event['data']
            # if 'toolUse' in event:
            #   pass
            if 'result' in event:
               yield event['result']

if __name__ == '__main__':
    app.run()
