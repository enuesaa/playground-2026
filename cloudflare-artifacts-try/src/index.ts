// see https://developers.cloudflare.com/artifacts/get-started/workers/
export default {
	async fetch(request, env) {
		const url = new URL(request.url);

		// create repo
		if (request.method === "POST" && url.pathname === "/repos") {
			const body = await request.json().catch(() => ({}))
			const repoName = body.name

			// これは普通に binding
			const created = await env.ARTIFACTS.create(repoName)
	
			return Response.json({
				name: created.name,
				remote: created.remote,
				token: created.token,
			})
		}
		return new Response("Use POST /repos", {
			status: 405,
		})
	},
}
