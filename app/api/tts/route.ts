import { Polly } from '@aws-sdk/client-polly'
import { NextResponse } from 'next/server'
import { Readable } from 'stream'

const polly = new Polly({
  region: 'ap-northeast-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
  },
})

export async function POST(request: Request) {
  const { text, voice } = await request.json()
  if (!text || !voice) {
    return NextResponse.json({ error: 'invalid request' }, { status: 400 })
  }

  try {
    const res = await polly.synthesizeSpeech({
      Text: `<speak><prosody rate="x-fast">${text}</prosody></speak>`,
      OutputFormat: 'mp3',
      TextType: 'ssml',
      VoiceId: voice,
      Engine: 'neural',
      LanguageCode: 'ja-JP',
    })
    if (!res.AudioStream) {
      return NextResponse.json({ error: 'No audio stream' }, { status: 502 })
    }
    if (res.AudioStream instanceof Readable === false) {
      return NextResponse.json({ error: 'No audio stream' }, { status: 502 })
    }

    const audioChunks: Buffer[] = []
    for await (const chunk of res.AudioStream) {
      audioChunks.push(Buffer.from(chunk))
    }
    const audioBuffer = Buffer.concat(audioChunks)

    return new Response(audioBuffer, {
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
