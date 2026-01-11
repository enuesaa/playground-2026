from elevenlabs.client import ElevenLabs
from elevenlabs.play import play

client = ElevenLabs(
    api_key=""
)

audio = client.text_to_speech.convert(
    text="こんにちは。ただいまの天気は晴れですが、午後から土砂降りの雨が降るでしょう。レインコートを持参ください",
    voice_id="8EkOjt4xTPGMclNlh1pk",
    model_id="eleven_flash_v2_5",
    output_format="mp3_44100_128",
)

play(audio)
