# CloudFlare Worker + D1 Database

## Commands
```
npm create cloudflare@latest -- --template=cloudflare/templates/d1-template
npm install
npx wrangler d1 create d1-template-database
npx wrangler d1 migrations apply --remote d1-template-database
npx wrangler deploy
```
