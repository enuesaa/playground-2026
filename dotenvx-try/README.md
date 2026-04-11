# dotenvx

- .env を暗号化するツール
  - https://zenn.dev/moozaru/articles/edb09434f0680b
- node.js 向けにはバンディングがあるみたい
- けど decrypt してアプリケーションのバイナリを実行すればいいだけだから、別にライブラリとかは不要な認識

## Commands
```bash
➜ brew install dotenvx/brew/dotenvx

➜ dotenvx encrypt
◈ encrypted (.env) + local key (.env.keys)

➜ dotenvx decrypt --stdout | grep A
A=b
```

## Links
- https://github.com/dotenvx/dotenvx
