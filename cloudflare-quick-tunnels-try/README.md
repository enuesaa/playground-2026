# Cloudflare Quick Tunnels

- コマンド一発でローカルホストを外部へ公開できる

```bash
cloudflared tunnel --url http://localhost:3000
```

- 新しい何かが発表されたもんかと思っていたが、普通に自分がイメージしていた cloudflare tunnel そのまんまだった
- ちなみにオリジンを vite dev にすると vite 側で設定が必要。Host の検証をしているらしい
```ts
import { defineConfig } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

export default defineConfig({
	plugins: [
		sveltekit(),
		tailwindcss(),
	],
	resolve: {
		alias: {
			$lib: path.join(__dirname, './src/lib'),
		},
	},
	server: {
		allowedHosts: [
			"xxx.trycloudflare.com"
		]
	}
})
```

## Links
- https://developers.cloudflare.com/tunnel/
