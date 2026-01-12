import { streamText } from 'ai'

export async function POST(req: Request) {
  const { prompt } = await req.json()

  const result = streamText({
    model: 'openai/gpt-4.1',
    prompt,
  })

  return new Response(result.textStream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Transfer-Encoding': 'chunked',
    },
  })
}
