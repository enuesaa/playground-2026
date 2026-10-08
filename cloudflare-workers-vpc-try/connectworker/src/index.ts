export default {
  async fetch(request, env): Promise<Response> {
    const response = await env.VPC_SERVICE.fetch("http://<ec2-private-ip>/");
    const html = await response.text();

    return new Response(html, {
      status: response.status,
      headers: {
				"content-type": "text/html; charset=utf-8",
				"hello": "fromworkers"
			},
    });
  },
} satisfies ExportedHandler<Env>;
