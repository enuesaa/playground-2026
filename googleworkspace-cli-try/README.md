# Google Workspace CLI

- Google Workspace (DriveやGmail) の CLI
- 内部で Google Cloud の API を呼んでいる模様

```bash
# Google Cloud の Project を選択し API を有効化。ログイン画面を作成
gws auth setup

# ユーザーでログイン。権限を選択
gws auth login

# Google Drive のファイルをリストアップ
gws drive files list
```

- 意外と難しい。
- `gws auth login` で権限を選ぶが、権限いっぱいあってどれを選べばいいかわからない。
  - 結局何を選んでもダメだった。
  - 下記のエラー。
  - GOOGLE_WORKSPACE_CLI_CREDENTIALS_FILE でクレデンシャルファイルのパスを渡しても結局エラー。
  - 埒が開かないのでやめた。

```bash
➜ gws drive files list
{
  "error": {
    "code": 401,
    "message": "Access denied. No credentials provided. Run `gws auth login` or set GOOGLE_WORKSPACE_CLI_CREDENTIALS_FILE to an OAuth credentials JSON file.",
    "reason": "authError"
  }
}
```

- rust で書かれてるっぽい
- おそらく google cloud sdk を cli でラップしてる感じ。
  - なんかエラーメッセージがJSON形式になったりするので、たぶんそうだと思う
- けれども npm で配布してるっぽい
- バイナリにして配布かな。

## Links
- https://github.com/googleworkspace/cli
- https://dev.classmethod.jp/articles/google-workspace-cli-release/

