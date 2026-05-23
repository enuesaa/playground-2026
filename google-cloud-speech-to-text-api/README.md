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
 