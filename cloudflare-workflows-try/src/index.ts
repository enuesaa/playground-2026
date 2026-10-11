import { WorkflowEntrypoint, WorkflowEvent, WorkflowStep } from "cloudflare:workers";

export class MyWorkflow extends WorkflowEntrypoint<Env> {
	async run(event: WorkflowEvent<{}>, step: WorkflowStep) {
		await step.do("step1", async () => {
			console.log("start");
		});

		await step.waitForEvent("wait approval", {
			type: "approval",
			timeout: "5 minutes",
		});

		await step.do("step2", async () => {
			console.log("approved!");
		});
	}
}

export default {
	async fetch(req: Request, env: Env): Promise<Response> {
		const url = new URL(req.url);
		const id = url.searchParams.get("instanceId");

		if (id) {
			const instance = await env.MY_WORKFLOW.get(id);

			if (url.searchParams.get("approve")) {
				await instance.sendEvent({ type: "approval", payload: {} });
			}
			return Response.json({ status: await instance.status() });
		}

		const instance = await env.MY_WORKFLOW.create();
		return Response.json({ id: instance.id });
	},
};