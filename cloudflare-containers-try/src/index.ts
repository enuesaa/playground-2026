import { Container, getContainer, getRandom } from "@cloudflare/containers";
import { Hono } from "hono";

export class MyContainer extends Container<Env> {
	defaultPort = 8080;
	sleepAfter = "2m";
	// lifecycle hooks
	override onStart() {
		console.log("Container successfully started");
	}
	override onStop() {
		console.log("Container successfully shut down");
	}
	override onError(error: unknown) {
		console.log("Container error:", error);
	}
}

const app = new Hono<{ Bindings: Env }>();

app.get("/", async (c) => {
	const container = getContainer(c.env.MY_CONTAINER, "this-is-container-name");
	console.log(c.req.raw)
	return await container.fetch(c.req.raw);
});

app.get("/wait30seconds", async (c) => {
	const container = getContainer(c.env.MY_CONTAINER, "this-is-container-name");
	console.log(c.req.raw)
	return await container.fetch(c.req.raw);
});

app.get("/container/:id", async (c) => {
	const id = c.req.param("id");
	// この辺りのコードがなぜ必要なのかちょっとよくわからん。durable object に一度保存する必要あるのかな？
	const containerId = c.env.MY_CONTAINER.idFromName(`/container/${id}`);
	const container = c.env.MY_CONTAINER.get(containerId);
	console.log(c.req.raw)
	return await container.fetch(c.req.raw);
});

export default app;
