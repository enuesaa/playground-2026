<script lang="ts">
	import { env } from '$env/dynamic/public'

	let out = $state('')

	const verify = async () => {
		const grecaptcha = (window as any).grecaptcha.enterprise
		await new Promise<void>((resolve) => grecaptcha.ready(resolve))
		const token = await grecaptcha.execute(env.PUBLIC_RECAPTCHA_SITE_KEY, { action: 'try' })
		const r = await fetch('/verify', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ token }),
		})
		out = r.status + ' ' + (await r.text())
	}
</script>

<svelte:head>
	<script src="https://www.google.com/recaptcha/enterprise.js?render={env.PUBLIC_RECAPTCHA_SITE_KEY}"></script>
</svelte:head>

<button onclick={verify}>verify</button>
<pre>{out}</pre>