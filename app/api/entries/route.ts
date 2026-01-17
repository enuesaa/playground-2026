import { NextResponse } from 'next/server'
import { z } from 'zod'
import { Redis } from '@upstash/redis'
import { ulid } from 'ulid'

const redis = Redis.fromEnv()

export type Entry = {
  title: string
  shortTitle?: string
  link: string
  subjects: string[]
  comments: string[]
  imageUrl?: string
  count?: number
}

export async function GET() {
  const keys = await redis.keys('entry-*')

  const list: Entry[] = []
  for (const key of keys) {
    const d = await redis.get(key)
    if (typeof d !== 'string') {
      continue
    }
    list.push(JSON.parse(d))
  }
  return NextResponse.json(list)
}

const schema = z.object({
  entries: z.array(
    z.object({
      title: z.string().min(1),
      link: z.string().min(1),
      comments: z.string().min(1),
      imageUrl: z.string(),
      popularity: z.number(),
    }),
  ),
})

export async function POST(request: Request) {
  const body = schema.safeParse(await request.json())
  if (!body.success) {
    return NextResponse.json({ error: 'invalid request' }, { status: 400 })
  }

  for (const entry of body.data.entries) {
    await redis.set(`entry-${ulid()}`, JSON.stringify(entry))
  }
  return NextResponse.json({}, { status: 200 })
}
