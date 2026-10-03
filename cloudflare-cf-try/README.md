# cf

- cloudflare の cli
- wrangler からの移行が今後望まれそう
  - wrangler の全てのコマンドをサポートしているわけではなくただ今後サポートする様子
  - https://developers.cloudflare.com/cf/wrangler/  
- むしろなかったのかと思った
  - ようやくAWS CLIみたく固いものができた印象
- デプロイのところの挙動は怪しいかも。内部でwarngler cliをインストールしているようなログが出てるけどそれがどういうことかわからん

### インストール
```bash
pnpm add -D cf
pnpm approve-builds workerd
```

### cf dns records list
DNSレコードの一覧
```bash
➜ pnpm cf dns records list --zone xxx.dev
🍊☁️  cf · v1.0.0-beta.11 · update available: v1.0.0-beta.12
────────────────────────────────────────────────────────────
│
◇  Loading [0s]
[
  {
    "id": "xxx",
    "name": "xxx.dev",
    "type": "CNAME",
    "content": "xxx.dev",
```

### デプロイ

```bash
pnpm cf auth login
pnpm cf deploy
```

なんか sveltekit は対応してないっぽい

```bash
➜ pnpm cf deploy

🍊☁️  cf · v1.0.0-beta.11 · update available: v1.0.0-beta.12
────────────────────────────────────────────────────────────

Detected Project Settings:
 - Worker Name: xxx
 - Framework: SvelteKit
 - Build Command: pnpm vite build
 - Output Directory: build

│
◇  Do you want to modify these settings?
│  No

┌ Error
│ cf does not support SvelteKit projects yet. You can still use Wrangler to develop and deploy this project.
└
```
