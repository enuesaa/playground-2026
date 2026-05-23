# Google Cloud Speech To Text API

- 文字起こし
- AWS でいう Transcribe に相当
- 使うには Google Cloud で API の有効化が必要
- あと GUI がないっぽくて API を叩くしかないからそれだけ注意
- サポートされているリージョン/モデルは下記
  - https://docs.cloud.google.com/speech-to-text/docs/speech-to-text-supported-languages?hl=ja
  - APIが変な応答返したらまずここを確認した方がいい
- 文字起こしの精度は判断つかない
  - https://www.netone.co.jp/media/detail/20220314-1/
  - やっぱ Google の方が精度がいいのかな
- 料金も Google Cloud の方が AWS Transcribe より安いかな
  - Google Cloud Speech to Text `$0.016 / 1 minute (0 minute to 500,000 minute)`
  - AWS Transcribe `$0.02400 / 1 minute (0 minute to 250,000 minute)`
- ストリーミングもできそう
  - https://docs.cloud.google.com/speech-to-text/docs/streaming-recognize?hl=ja
- Rust SDKもありそう
  - https://github.com/search?q=repo%3Agoogleapis%2Fgoogle-cloud-rust%20StreamingRecognizeRequest&type=code

```bash
➜ uv run main.py
Waiting resposne...
results {
  key: "gs://example/aa.wav"
  value {
    metadata {
      total_billed_duration {
        seconds: 11
      }
    }
    transcript {
      results {
        alternatives {
          transcript: "お、これは聞き取れるかな?今日のニュース分かる?あるいは python っていう言語分かる?あるいは php って言語どう思う"
          confidence: 0.972893715
        }
        result_end_offset {
          seconds: 30
        }
        language_code: "ja-JP"
      }
    }
    inline_result {
      transcript {
        results {
          alternatives {
            transcript: "お、これは聞き取れるかな?今日のニュース分かる?あるいは python っていう言語分かる?あるいは php って言語どう思う"
            confidence: 0.972893715
          }
          result_end_offset {
            seconds: 30
          }
          language_code: "ja-JP"
        }
      }
    }
  }
}
total_billed_duration {
  seconds: 11
}

Transcript: お、これは聞き取れるかな?今日のニュース分かる?あるいは python っていう言語分かる?あるいは php って言語どう思う
```

## Links
- https://docs.cloud.google.com/speech-to-text/docs/batch-recognize?hl=ja#perform_batch_recognition_with_inline_results
 