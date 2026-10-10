import { env } from '$env/dynamic/private'
import { env as publicEnv } from '$env/dynamic/public'
import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ request }) => {
	const { token } = (await request.json().catch(() => ({}))) as { token?: unknown }
	if (typeof token !== 'string' || token.length === 0) {
		return new Response('invalid token', { status: 403 })
	}
	const r = await fetch(
		`https://recaptchaenterprise.googleapis.com/v1/projects/${env.RECAPTCHA_PROJECT_ID}/assessments?key=${env.RECAPTCHA_API_KEY}`,
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				event: {
					token,
					siteKey: publicEnv.PUBLIC_RECAPTCHA_SITE_KEY,
					expectedAction: env.RECAPTCHA_EXPECTED_ACTION,
				},
			}),
			signal: AbortSignal.timeout(10_000),
		}
	).catch(() => null)
	if (!r) return new Response('assessment request failed', { status: 502 })
	if (!r.ok) return new Response(await r.text(), { status: 502 })

	const result = (await r.json()) as {
		tokenProperties: { valid: boolean; invalidReason?: string; action?: string; hostname?: string }
		riskAnalysis: { score: number; reasons?: string[] }
	}
	if (!result.tokenProperties.valid) {
		return new Response('invalid: ' + result.tokenProperties.invalidReason, { status: 403 })
	}
	if (result.tokenProperties.action !== env.RECAPTCHA_EXPECTED_ACTION) {
		return new Response('action mismatch', { status: 403 })
	}
	if (result.riskAnalysis.score < 0.5) {
		return new Response('low score: ' + result.riskAnalysis.score, { status: 403 })
	}
	// ここに保護したい処理を置く
	return new Response('ok score=' + result.riskAnalysis.score)
}
