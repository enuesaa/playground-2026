# moonshine

- whisper みたいなやつ
- https://www.techno-edge.net/article/2026/03/02/4891.html
- ライセンスに注意。日本語は非商用に限られる？らしい

```bash
➜ uv run python -m moonshine_voice.mic_transcriber --language ja
Using a model released under the non-commercial Moonshine Community License. See https://www.moonshine.ai/license for details.
encoder_model.ort: 100%|█████████████████████████████████████████████████████████████████████████████████████████| 29.9M/29.9M [00:01<00:00, 21.4MB/s]
decoder_model_merged.ort: 100%|████████████████████████████████████████████████████████████████████████████████████| 104M/104M [00:05<00:00, 18.7MB/s]
tokenizer.bin: 100%|███████████████████████████████████████████████████████████████████████████████████████████████| 244k/244k [00:00<00:00, 4.11MB/s]
Listening to the microphone, press Ctrl+C to stop...
Speaker #0: そ れ は 行
Speaker #0: おおおお
Speaker #0: ああ、こんな感じか。
Speaker #0: なるほどね。
Speaker #0: うーん。
Speaker #0: 「あかさたな」
Speaker #0: うん。
Speaker #0: 認識できてそうかな
Speaker #0: なるほど。
Speaker #0: 漢字に変換できるのす??
Speaker #0: 漢字に変換できるのはすごいな。
Speaker #0: ライブリンかみたいなね
Speaker #0: そ の マ ッ ク さ あ あ の 瞬 時 に 関 さ れ つ み た い に
Speaker #0: ライブ変換
Speaker #0: なるほどね。
Speaker #0: なんか微妙に違うんだよな。
```
