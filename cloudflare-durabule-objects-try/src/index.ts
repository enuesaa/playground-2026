import { DurableObject } from 'cloudflare:workers'

export class MyDurableObject extends DurableObject<Env> {
  async increment(): Promise<number> {
    return this.ctx.storage.transaction(async (txn) => {
      const count = (await txn.get<number>('count') ?? 0) + 1
      await txn.put('count', count)
      return count
    })
  }
}

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const stub = env.MY_DURABLE_OBJECT.getByName('foo')
    const count = await stub.increment()

    return new Response(`Count: ${count}`)
  },
} satisfies ExportedHandler<Env>
