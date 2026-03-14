# viteplus

- void0 がだした開発ツール
- cli ツールでありライブラリ
  - vp というCLIツール
    - `vp create` でアプリケーションを作成
    - `vp dev` が `pnpm dev` 相当
  - vite-plus というライブラリ
    - この中に oxfmt とか oxlint が全部入っている
    - https://www.npmjs.com/package/vite-plus
- CLI を出したかという気持ち
  - 予想外
  - CLIである必要は何があるのだろう
  - Rust で書かれてそう
  - https://github.com/voidzero-dev/vite-plus

## Install vp
```bash
curl -fsSL https://vite.plus | bash
source ~/.zshrc
```

```bash
➜ vp --help
VITE+ - The Unified Toolchain for the Web

Usage: vp [COMMAND]

Start:
  create      Create a new project from a template
  migrate     Migrate an existing project to Vite+
  config      Configure hooks and agent integration
  staged      Run linters on staged files
  install, i  Install all dependencies, or add packages if package names are provided
  env         Manage Node.js versions

Develop:
  dev    Run the development server
  check  Run format, lint, and type checks
  lint   Lint code
  fmt    Format code
  test   Run tests

Execute:
  run    Run tasks
  exec   Execute a command from local node_modules/.bin
  dlx    Execute a package binary without installing it as a dependency
  cache  Manage the task cache
```

## Links
- https://viteplus.dev/
- https://github.com/voidzero-dev/vite-plus
