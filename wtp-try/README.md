# wtp

- git worktree を使いやすくするツール（のはず）
  - そもそも git worktree の理解が不十分だから表現あっているか不明
- `wtp add -b <branchname>` でブランチを作成
  - このとき別のディレクトリにまるまるファイルがコピーされるイメージ
  - .wtp.yml に書いた処理が走る
- `wtp cd <branchname>`
  - 実体のある`別のディレクトリ`へのパスが標準出力されるのでそこへ cd する
  - https://github.com/satococoa/wtp?tab=readme-ov-file#navigation-with-wtp-cd

```bash
wtp add -b chore/a
wtp cd chore/a
cd ~/worktrees/chore/a
```

## Links
- https://github.com/satococoa/wtp
