# tavily

- Web Search API
- 主にAI用のWeb検索サービス。検索結果がJSONフォーマットで返ってくるだけなので、AI以外でも使える
- 無料プランあり
  - 1000クレジットが毎月無料
  - https://www.tavily.com/#pricing
  - 1検索でだいたい2クレジットかかりそう。なので、500回分無料。でも意外と少ない
  - 無料枠を超えたら従量課金

- Search
- 検索するときモードがあり、advanced (2クレジット) を選択すると answer フィールドに要約が入る。デフォルトだと1クレジット
```bash
$ curl -X POST https://api.tavily.com/search \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer tvly-dev-********************************' \
-d '{
    "query": "yahoo co jp"
}'
{
  "query": "yahoo.co.jp",
  "follow_up_questions": null,
  "answer": null,
  "images": [],
  "results": [
    {
      "url": "https://www.instagram.com/yahoojapanpr/",
      "title": "Yahoo! JAPAN（ヤフー） (@yahoojapanpr)",
      "content": "Yahoo! JAPAN公式アカウントです。 LINEヤフー株式会社の公式アカウント（ @lycorp_jp）でサービスや中の人、社内のことを発信中です",
      "score": 0.997285,
      "raw_content": null,
      "favicon": "https://static.cdninstagram.com/rsrc.php/v4/yI/r/VsNE-OHk_8a.png"
    },
    {
      "url": "https://support.yahoo-net.jp/PccMail/s/article/H000011493",
      ...
  ],
  "response_time": 0.61,
  "request_id": "4d93a426-8948-429c-b993-aa38400679b8"
}
```

- Extract
  - url を渡したら見に行ってくれるっぽい
- 他に Crawl や Research がある

## Links
- https://www.tavily.com/
- https://note.com/npaka/n/n9fe8a607c56e
