import asyncio
from strands.experimental.bidi import BidiAgent
from strands.experimental.bidi.io import BidiAudioIO
from strands.experimental.bidi.models import BidiNovaSonicModel

with open('data.json') as j:
    data = j.read()

# see https://ap-northeast-1.console.aws.amazon.com/bedrock/home?region=ap-northeast-1#/model-catalog/serverless/amazon.nova-2-sonic-v1:0
model = BidiNovaSonicModel(
    model_id='amazon.nova-2-sonic-v1:0',
    provider_config={
        "audio": {"voice": "matthew"},
    },
)

agent = BidiAgent(
    model=model,
    tools=[],
    system_prompt=f"日本語で話して。これはあるニュースサイトの RSS フィードを JSON 形式にしたデータです。ユーザーはIT系ニュースに興味があります。ユーザーに合いそうなニュースをいくつかピックアップして早口でユーザーが飽きないよう読み上げてください。データ: ${data}",
)

# see https://github.com/strands-agents/sdk-python/issues/1376
asyncio.run(agent.run(
    inputs=[BidiAudioIO().input()],
    outputs=[BidiAudioIO().output()],
))
