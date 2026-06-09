# agent-browser

- vercel が作っているやつ
- ステートフルな playwright の cli って捉えるとわかりやすい
- snapshot をとるとそれが一時保存されて、後続のコマンドで @e2 というふうに要素を指定できるようになるっぽい
- おもしろい。

```bash
# setup
➜ brew install agent-browser
➜ agent-browser install

# open
➜ agent-browser open example.com
✓ Example Domain
  https://example.com/

➜ agent-browser open yahoo.co.jp
✓ Yahoo! JAPAN
  https://www.yahoo.co.jp/

# snapshot
➜ agent-browser snapshot
- heading "Example Domain" [level=1, ref=e1]
- paragraph
  - StaticText "This domain is for use in documentation examples without needing permission. Avoid use in operations."
- paragraph
  - link "Learn more" [ref=e2]

➜ agent-browser get text @e1
Example Domain

➜ agent-browser get text @e2
Learn more

# snapshot (interactive el only)
➜ agent-browser snapshot -i
- heading "Example Domain" [level=1, ref=e1]
- link "Learn more" [ref=e2]

➜ agent-browser click @e2
✓ Done

➜ agent-browser get url
https://www.iana.org/help/example-domains

➜ agent-browser pdf test.pdf
✓ PDF saved to test.pdf

# close
➜ agent-browser close
✓ Browser closed
```

## Links
- https://github.com/vercel-labs/agent-browser
