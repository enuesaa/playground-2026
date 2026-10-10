interface Bindings {
	SITEKEY: string
	TURNSTILE_SECRET: string
	TURNSTILE_HOSTNAME: string
	EXPECTED_ACTION: string
}

const page = (sitekey: string, action: string) => `<!doctype html>
<meta charset="utf-8">
<title>turnstile sample</title>
<div id="ts"></div>
<button id="go" disabled>verify</button>
<pre id="out"></pre>
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" async defer></script>
<script>
	let token = '', widgetId
	const go = document.getElementById('go')
	const out = document.getElementById('out')
	window.onload = () => {
		widgetId = turnstile.render('#ts', {
			sitekey: ${JSON.stringify(sitekey)},
			action: ${JSON.stringify(action)},
			callback: (t) => { token = t; go.disabled = false },
			'expired-callback': () => { go.disabled = true },
		})
	}
	go.onclick = async () => {
		const r = await fetch('/verify', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ token }),
		})
		out.textContent = r.status + ' ' + (await r.text())
		go.disabled = true
		turnstile.reset(widgetId)
	}
</script>`

type SiteverifyResult = {
	success: boolean
	action?: string
	hostname?: string
}

export default {
	async fetch(request, env): Promise<Response> {
		const url = new URL(request.url)
		
		// GET /
		if (request.method === 'GET' && url.pathname === '/') {
			return new Response(page(env.SITEKEY, env.EXPECTED_ACTION), {
				headers: { 'Content-Type': 'text/html; charset=utf-8' },
			})
		}
		
		// POST /verify
		if (request.method === 'POST' && url.pathname === '/verify') {
			const reqbody = await request.json().catch(() => ({}))
			const { token } = reqbody as { token?: unknown }
			if (typeof token !== 'string' || token.length === 0 || token.length > 2048) {
				return new Response('invalid token', { status: 403 })
			}
			const reqip = request.headers.get('CF-Connecting-IP') ?? ''

			const body = new URLSearchParams({
				secret: env.TURNSTILE_SECRET ?? '',
				response: token,
				remoteip: reqip,
			})
			let r: Response
			try {
				r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
					method: 'POST',
					body,
				})
			} catch {
				return new Response('siteverify request failed', { status: 403 })
			}
			let result: SiteverifyResult
			try {
				result = (await r.json()) as SiteverifyResult
			} catch {
				return new Response('siteverify invalid response', { status: 403 })
			}
			if (!result.success || result.action !== env.EXPECTED_ACTION || result.hostname !== env.TURNSTILE_HOSTNAME) {
				return new Response('verification failed', { status: 403 })
			}
	
			// ここに保護したい処理を置く
			return new Response('ok')
		}
		return new Response('not found', { status: 404 })
	},
} satisfies ExportedHandler<Bindings>
