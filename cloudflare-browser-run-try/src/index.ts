interface Env {
  BROWSER: BrowserRun;
}

export default {
  async fetch(request, env): Promise<Response> {
    return await env.BROWSER.quickAction("screenshot", {
      url: "https://example.com",
    });
  },
} satisfies ExportedHandler<Env>;