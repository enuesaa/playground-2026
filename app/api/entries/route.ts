import { NextResponse } from 'next/server'
import { z } from 'zod'
import { Redis } from '@upstash/redis'
import { ulid } from 'ulid'
import { generateText, Output } from 'ai'

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

  const passdata = {
    title: body.data.title,
    comments: body.data.comments
  }
  const prompt = `
title と comments を口語調で、意味を変えずに簡潔にしてください。

ルール:
- 文意は絶対に変えない
- 一般名詞・固有名詞・技術用語は維持する
- 不要な語尾や口癖（例: 「まぁ」「とか」）は削除する
- 冗長な表現は自然な日本語になる範囲で短くする

データ: 
${JSON.stringify(passdata)}
`

  const { output } = await generateText({
    model: 'openai/gpt-4.1',
    output: Output.object({
      schema: z.object({
        title: z.string(),
        comments: z.array(z.string())
      }),
    }),
    prompt, 
  })

  await redis.set(`entry-${ulid()}`, {
    ...body.data,
    title: output.title,
    titleOriginal: body.data.title,
    comments: output.comments,
    commentsOriginal: body.data.comments,
  })
  return NextResponse.json({}, { status: 200 })
}
