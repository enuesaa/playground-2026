interface Env {
  MY_SECRET: SecretsStoreSecret;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const value = await env.MY_SECRET.get();

    // 動作確認用
    return Response.json({
      ok: true,
      length: value.length,
      preview: value.slice(0, 2) + "***",
    });
  },
} satisfies ExportedHandler<Env>;
