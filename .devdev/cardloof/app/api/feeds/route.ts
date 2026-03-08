import { NextResponse } from 'next/server'
import { z } from 'zod'
import { listFeeds, saveFeed } from '@/libserver/gredis/feeds'
import Parser from 'rss-parser'

export async function GET() {
  const list = await listFeeds()
  return NextResponse.json(list)
}

const schema = z.object({
  url: z.string().min(1),
})

export async function POST(request: Request) {
  const body = schema.safeParse(await request.json())
  if (!body.success) {
    return NextResponse.json({ error: 'invalid request' }, { status: 400 })
  }

  const parser = new Parser();
  const rssfeed = await parser.parseURL(body.data.url)

  for (const feed of rssfeed.items) {
    await saveFeed({
      ...body.data,
      title: feed.title ?? '',
      url: feed.url,
      description: feed.content ?? '',
    })
  }
  return NextResponse.json({}, { status: 200 })
}
