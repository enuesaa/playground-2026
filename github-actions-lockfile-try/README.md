# GitHub Actions Lockfile

- GitHub Actions の各アクションのバージョンをロックできる？っぽい
- 2026年10月にGA
- 各ワークフローの隣にファイルができるっぽい
  - 若干邪魔かも
- dependabot で各アクションのバージョンを自動更新できるけどそれとは相性が悪いかも
  - そもそも時代的に自動更新は難しくなっていくのかもなあ

使い方
```bash
gh extension install github/gh-actions-lock
gh actions-lock
```

## Links
- https://github.com/github/gh-actions-lock
