import { Polly } from '@aws-sdk/client-polly'
import { NextResponse } from 'next/server'
import { Readable } from 'node:stream'
import { z } from 'zod'

const polly = new Polly({
  region: 'ap-northeast-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
  },
})

const schema = z.object({
  text: z.string().min(1),
  voice: z.enum(['Takumi', 'Kazuha']),
})

export async function POST(request: Request) {
  const body = schema.safeParse(await request.json())
  if (!body.success) {
    return NextResponse.json({ error: 'invalid request' }, { status: 400 })
  }

  try {
    const res = await polly.synthesizeSpeech({
      Text: `<speak><prosody rate="x-fast">${body.data.text}</prosody></speak>`,
      OutputFormat: 'mp3',
      TextType: 'ssml',
      VoiceId: body.data.voice,
      Engine: 'neural',
      LanguageCode: 'ja-JP',
    })
    if (res.AudioStream === undefined || res.AudioStream instanceof Readable === false) {
      return NextResponse.json({ error: 'No audio stream' }, { status: 502 })
    }

    const chunks: Buffer[] = []
    for await (const chunk of res.AudioStream) {
      chunks.push(Buffer.from(chunk))
    }
    const audio = Buffer.concat(chunks)

    return new Response(audio, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'no-store',
      },
    })
  } catch (error) {
    return NextResponse.json({ error: `${error}` }, { status: 500 })
  }
}
