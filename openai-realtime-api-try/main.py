import asyncio

from strands.experimental.bidi import BidiAgent
from strands.experimental.bidi.io import BidiAudioIO, BidiTextIO
from strands.experimental.bidi.models.openai_realtime import BidiOpenAIRealtimeModel
from strands.experimental.bidi.tools import stop_conversation

from strands_tools import calculator


async def main() -> None:
    model = BidiOpenAIRealtimeModel(
        model_id="gpt-realtime",
        provider_config={
            "audio": {
                "voice": "coral",
            },
        },
        client_config={"api_key": ""},
    )
    agent = BidiAgent(model=model, tools=[calculator, stop_conversation]) #type: ignore

    audio_io = BidiAudioIO()
    text_io = BidiTextIO()
    await agent.run(inputs=[audio_io.input()], outputs=[audio_io.output(), text_io.output()])


if __name__ == "__main__":
    asyncio.run(main())