import { DurableObject } from 'cloudflare:workers'

export class BoardRoom extends DurableObject<Env> {
  async list(): Promise<string[]> {
    return await this.ctx.storage.get<string[]>('posts') ?? []
  }

  async post(message: string): Promise<void> {
    const posts = await this.list()
    posts.push(message)
    await this.ctx.storage.put('posts', posts)
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    const room = url.searchParams.get('room') ?? 'general'
    const stub = env.BOARD_ROOM.getByName(room)

    if (request.method === 'POST') {
      await stub.post(await request.text())
      return new Response('Posted')
    }

    const posts = await stub.list()
    return Response.json(posts)
  },
} satisfies ExportedHandler<Env>

