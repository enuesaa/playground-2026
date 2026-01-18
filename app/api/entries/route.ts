import { NextResponse } from 'next/server'
import { z } from 'zod'
import { Redis } from '@upstash/redis'
import { ulid } from 'ulid'

const redis = Redis.fromEnv()

export type Entry = {
  title: string
  url: string
  comments: string[]
  imageUrl: string | null
  popularity: number
}

export async function GET() {
  const keys = await redis.keys('entry-*')
  const list: Entry[] = []
  for (const key of keys) {
    const data = await redis.get(key)
    list.push(data as Entry)
  }
  return NextResponse.json(list)
}

const schema = z.object({
  title: z.string().min(1),
  url: z.string().min(1),
  comments: z.array(z.string().min(1)),
  imageUrl: z.string().nullable(),
  popularity: z.number(),
})

export async function POST(request: Request) {
  const body = schema.safeParse(await request.json())
  if (!body.success) {
    console.log(body.error)
    return NextResponse.json({ error: 'invalid request' }, { status: 400 })
  }
  await redis.set(`entry-${ulid()}`, body.data)
  return NextResponse.json({}, { status: 200 })
}
