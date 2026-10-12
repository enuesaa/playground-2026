import { createConnection } from 'mysql2/promise'

interface Env {
  HYPERDRIVE: Hyperdrive
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url)
    
		if (url.pathname !== '/') {
      return new Response('not found', { status: 404 })
    }
    const conn = await createConnection({
      host: env.HYPERDRIVE.host,
      user: env.HYPERDRIVE.user,
      password: env.HYPERDRIVE.password,
      database: env.HYPERDRIVE.database,
      port: env.HYPERDRIVE.port,
      disableEval: true, // 注意
    })

    try {
      const [rows] = await conn.query('SELECT id, title, content, created_at, updated_at FROM notes ORDER BY id')
      return Response.json({ ok: true, notes: rows })
    } catch (e) {
      return Response.json({ ok: false, error: String(e) }, { status: 500 })
    } finally {
      ctx.waitUntil(conn.end())
    }
  },
}
