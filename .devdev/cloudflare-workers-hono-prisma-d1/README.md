# cloudflare workers + hono + prisma + d1

- prisma v7 で設定ファイルの書き方とか変わったっぽいので注意

## Commands
```bash
### Project Setup
pnpm wrangler d1 create mytestdb
pnpm prisma init

### Create a migration file
pnpm wrangler d1 migrations create mytestdb create_note_table
pnpm prisma migrate diff --from-empty --to-schema ./prisma/schema.prisma --script --output ./prisma/migrations/0001_create_note_table.sql

### Make migration
pnpm wrangler d1 migrations apply mytestdb --local
pnpm wrangler d1 migrations apply mytestdb --remote

### gen
pnpm gen:prisma
pnpm gen:wrangler

### dev
pnpm dev
curl http://localhost:8787/notes -X POST --json '{"title":"a","desc":"c"}'
curl http://localhost:8787/notes

### deploy
pnpm deploy:remote
```

## Links
- https://www.prisma.io/docs/orm/v6/overview/databases/cloudflare-d1
- https://hono-ja.pages.dev/examples/prisma#using-prisma-driver-adapters
