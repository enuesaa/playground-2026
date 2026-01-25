# qwen-tts

- AIモデル（TTS）
- ローカルで動かせた
- 自分の声をあてられるらしい
- 中国語ベースなのかな。
  - 日本語音声の生成もできたが、なんか中国語も混じる感じ。
  - UI も中国語
- 音声の質は高い
  - AI音声とはわからないかも

## Commands
```bash
uv run qwen-tts-demo Qwen/Qwen3-TTS-12Hz-1.7B-CustomVoice --port 8800 --no-flash-attn --device mps
```

8800 ポートを指定している。のでlocalhost:8800を見に行くとUIを見れる。

## Links
- https://github.com/QwenLM/Qwen3-TTS
- https://nowokay.hatenablog.com/entry/2026/01/23/145128
