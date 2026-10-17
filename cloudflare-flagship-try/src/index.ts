interface Env { FLAGS: Flagship }

export default {
  async fetch(request: Request, env: Env) {
    const value = await env.FLAGS.getBooleanValue("use-aaa", false);
    return Response.json({ value });
  },
};
