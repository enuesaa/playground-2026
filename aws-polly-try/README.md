# Polly

- 音声読み上げのやつ
- ずっと前からある。AIが普及する前から
  - AI が出てきてやっぱこっちも機能強化されてそう。
  - `生成 AI を使用して、最も表現力豊かで適応性の高い音声を生成します。`というオプションがある
- OpenAI の TTS と比べて値段は安そう
  - https://comparevoiceai.com/tts
- SSML というXMLライクなフォーマットで送れば、発声をカスタマイズできる
  - コマンドみたいなのがある
  - 全ての音声が対応しているわけではない。日本語だとダメなものが多そう
  - https://docs.aws.amazon.com/ja_jp/polly/latest/dg/supportedtags.html

```xml
// 読み上げを速くするには
<speak><prosody rate="x-fast">こんにちは</prosody></speak>
```
