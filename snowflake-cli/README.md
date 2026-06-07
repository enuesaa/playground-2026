# snowflake-cli

セットアップ方法

### Install
```bash
brew install snowflake-cli
snow --version
```

### Login
- https://dev.classmethod.jp/articles/snowflake-oauth-local-applications-snowflakecli-try/  
- 今年初めくらいに出たらしい。これが一番楽そう

設定ファイルの編集

```bash
vim /Users/<name>/Library/Application\ Support/snowflake/config.toml

[connections.default]
authenticator = "OAUTH_AUTHORIZATION_CODE"
account = ""
user = ""
warehouse = ""
role = ""
```

接続確認
```bash
snow connection test
snow sql --query "select current_timestamp()"
```
