# cloudflare workers + hono + drizzle + d1

## Commands
```bash
### Project Setup
pnpm wrangler d1 create mytestdb
pnpm gen:wrangler

### Create a migration file
pnpm drizzle-kit generate --name init

### Make migration
pnpm wrangler d1 migrations apply mytestdb --local
pnpm wrangler d1 migrations apply mytestdb --remote

### dev
pnpm dev
curl http://localhost:8787/notes -X POST --json '{"title":"a","desc":"c"}'
curl http://localhost:8787/notes

### deploy
pnpm apply
```
