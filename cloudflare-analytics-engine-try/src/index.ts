export default {
  async fetch(request, env, ctx): Promise<Response> {
    env.ANALYTICS_ENGINE.writeDataPoint({
      blobs: [
        crypto.randomUUID(),
        new Date().toISOString(),
        request.method,
        new URL(request.url).pathname,
        request.cf?.colo ?? "unknown",
        request.cf?.country ?? "unknown",
      ],
      doubles: [
        Date.now(),
        Math.random() * 1000,
      ],
      indexes: [
        crypto.randomUUID(),
      ],
    });

    return new Response("hello");
  },
} satisfies ExportedHandler<Env>;
