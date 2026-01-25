import { NextResponse } from 'next/server'
import { z } from 'zod'
import { listEntries, saveEntry } from '@/libserver/gredis/entries'
import { summarizeTitleComments } from '@/libserver/gai'

export type Entry = {
  key: string
  title: string
  url: string
  comments: string[]
  imageUrl: string | null
  popularity: number
}

export async function GET() {
  const list = await listEntries()
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

  const output = await summarizeTitleComments({
    title: body.data.title,
    comments: body.data.comments,
  })
  await saveEntry({
    ...body.data,
    title: output.title,
    titleOriginal: body.data.title,
    comments: output.comments,
    commentsOriginal: body.data.comments,
  })
  return NextResponse.json({}, { status: 200 })
}
