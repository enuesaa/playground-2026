# AWS Bedrock Nova 2 Sonic

- 音声で会話できるモデル
- 日本語は対応してない。がある程度は会話できる
- 実行環境により音声の入力/出力をするインタフェースが異なる
  - https://strandsagents.com/latest/documentation/docs/user-guide/concepts/experimental/bidirectional-streaming/io/?h=websocket.#websocket-io

## Links
- https://strandsagents.com/latest/documentation/docs/user-guide/concepts/experimental/bidirectional-streaming/quickstart/

### AWS公式サンプルアプリ

ローカルでサクッと動いた。

- https://github.com/aws-samples/amazon-nova-samples/tree/main/speech-to-speech/amazon-nova-2-sonic/repeatable-patterns/nova-sonic-speaks-first
- https://blog.denet.co.jp/adcale2025_amazon-nova2-sonic-santa-voice-chat/

## On Ubuntu
```bash
apt install -y portaudio19-dev python3-pyaudio
```
