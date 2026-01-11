import { PollyClient, SynthesizeSpeechCommand } from '@aws-sdk/client-polly'
import { NextResponse } from 'next/server'
import { Readable } from 'stream'

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY

let pollyClient: PollyClient | null = null

const getPollyClient = () => {
  if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
    return null
  }

  if (!pollyClient) {
    pollyClient = new PollyClient({
      region: 'ap-northeast-1',
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      },
    })
  }

  return pollyClient
}

const ALLOWED_VOICES = ['Takumi', 'Kazuha'] as const
type VoiceId = (typeof ALLOWED_VOICES)[number]
const DEFAULT_VOICE: VoiceId = 'Takumi'

export async function POST(request: Request) {
  const client = getPollyClient()

  if (!client) {
    return NextResponse.json({ error: 'Missing AWS Polly credentials' }, { status: 500 })
  }

  const { text, voice } = await request.json().catch(() => ({}))

  if (!text || typeof text !== 'string') {
    return NextResponse.json({ error: 'Text is required' }, { status: 400 })
  }

  const voiceId: VoiceId = ALLOWED_VOICES.includes(voice) ? voice : DEFAULT_VOICE

  try {
    const command = new SynthesizeSpeechCommand({
      Text: `<speak><prosody rate="x-fast">${text}</prosody></speak>`,
      OutputFormat: 'mp3',
      TextType: 'ssml',
      VoiceId: voiceId,
      Engine: 'neural',
      LanguageCode: 'ja-JP',
    })

    const response = await client.send(command)

    if (!response.AudioStream) {
      return NextResponse.json({ error: 'No audio stream returned from Polly' }, { status: 502 })
    }

    const audioChunks: Buffer[] = []

    if (response.AudioStream instanceof Readable) {
      for await (const chunk of response.AudioStream) {
        audioChunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
      }
    } else if (response.AudioStream instanceof Uint8Array) {
      audioChunks.push(Buffer.from(response.AudioStream))
    }

    if (!audioChunks.length) {
      return NextResponse.json({ error: 'Empty audio response from Polly' }, { status: 502 })
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
    return NextResponse.json({ error: 'Unexpected error', detail: `${error}` }, { status: 500 })
  }
}
