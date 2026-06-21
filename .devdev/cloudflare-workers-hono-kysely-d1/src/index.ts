import { Hono } from 'hono'
import { createDb } from './db'

type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/notes', async (c) => {
  const db = createDb(c.env.DB)
  const rows = await db.selectFrom('Note').selectAll().execute()
  return c.json(rows)
})

app.post('/notes', async (c) => {
  const db = createDb(c.env.DB)
  const body = await c.req.json<{ title: string; desc?: string }>()
  const note = await db
    .insertInto('Note')
    .values({ id: crypto.randomUUID(), desc: null, ...body })
    .returningAll()
    .executeTakeFirstOrThrow()
  return c.json(note, 201)
})

export default app
