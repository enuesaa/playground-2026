# cloudflare clef

- cloudflare の ai モデル
- https://developers.cloudflare.com/workers-ai/models/clef/
- jev と似たようなやつ。 decision model というらしい

```bash
$ curl https://api.cloudflare.com/client/v4/accounts/<accountid>/ai/run/@cf/cloudflare/clef \
  -H "Authorization: Bearer <token>" \
  --json '{
    "model": "clef",
    "state": "MacでUSBメモリが認識しない",
    "questions": {
      "urgent": {
        "type": "noul",
        "instructions": "これはWindowsの問題である"
      }
    }
  }'
{"result":{"model":"clef","answers":{"urgent":{"type":"noul","noul":0.0128}},"usage":{"input_tokens":147,"output_tokens":0}},"success":true,"errors":[],"messages":[]}
```
