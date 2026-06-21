# cloudflare workers + hono + kysely + d1

## Commands
```bash
### Project Setup
pnpm wrangler d1 create mytestdb
pnpm gen:wrangler

### Make migration
### ここでマイグレーションファイルを作る (手書き)
pnpm wrangler d1 migrations apply mytestdb --local
pnpm wrangler d1 migrations apply mytestdb --remote

### dev
pnpm dev
curl http://localhost:8787/notes -X POST --json '{"title":"a","desc":"c"}'
curl http://localhost:8787/notes

### deploy
pnpm apply
```
