# Claude Plugin MarketPlace

- skillsとかを配布するのにこういうふうな形式にする
- .claude-pluginはトップレベルにないとダメらしい

## 使い方
```bash
claude plugin marketplace add https://github.com/enuesaa/try-claude-plugin
claude plugin install no-comments@try-claude-plugin
```

あとは Claude Code で `/no-comments` と打てば呼び出せる

## 消し方
```bash
claude plugins uninstall no-comments
claude plugins marketplace remove try-claude-plugin
```

## Links
- https://code.claude.com/docs/ja/plugin-marketplaces
