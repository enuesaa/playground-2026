export default {
  async fetch(request: Request, env: { MY_KV: KVNamespace }): Promise<Response> {
    if (request.method === "PUT") {
      await env.MY_KV.put("aaa", await request.text());
      return new Response("put ok");
    }

    if (request.method === "GET") {
      const value = await env.MY_KV.get("aaa");
      return new Response(value ?? "not found");
    }

    return new Response("method not allowed", { status: 405 });
  },
};

