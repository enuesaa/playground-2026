export interface Env {
  AI: Ai;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const prompt = url.searchParams.get('q') ?? 'hello'

    const response = await env.AI.run('@cf/google/gemma-4-26b-a4b-it', {
      messages: [
        { role: 'system', content: 'あなたは簡潔に答えるアシスタントです。' },
        { role: 'user', content: prompt },
      ],
    })
    const text = response.choices?.[0]?.message?.content ?? ''
    return new Response(text, {
      headers: { 'content-type': 'text/plain; charset=utf-8' },
    })
  },
} satisfies ExportedHandler<Env>
