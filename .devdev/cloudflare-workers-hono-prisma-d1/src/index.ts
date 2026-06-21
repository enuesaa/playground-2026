import { Hono } from 'hono'
import prismaClients from './prisma'

type Bindings = {
  DB: D1Database
}
const app = new Hono<{ Bindings: Bindings }>()

app.get('/notes', async (c) => {
  const prisma = await prismaClients.fetch(c.env.DB)
  const notes = await prisma.note.findMany()
  console.log('notes', notes)
  return c.json(notes)
})

app.post('/notes', async (c) => {
  const prisma = await prismaClients.fetch(c.env.DB)
  const reqbody = await c.req.json<{title: string; body: string}>()
  const note = await prisma.note.create({
    data: reqbody,
  })
  return c.json(note, 201)
})

export default app
