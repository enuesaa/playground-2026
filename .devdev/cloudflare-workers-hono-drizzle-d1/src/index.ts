import { Hono } from 'hono'
import { createDb } from './db'
import { notes } from './schema'

type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/notes', async (c) => {
  const db = createDb(c.env.DB)
  const rows = await db.select().from(notes)
  return c.json(rows)
})

app.post('/notes', async (c) => {
  const db = createDb(c.env.DB)
  const body = await c.req.json<{ title: string; desc?: string }>()
  const [note] = await db
    .insert(notes)
    .values({ id: crypto.randomUUID(), ...body })
    .returning()
  return c.json(note, 201)
})

export default app
