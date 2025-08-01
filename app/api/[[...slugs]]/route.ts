// app/api/[[...slugs]]/route.ts

import swagger from "@elysiajs/swagger";
import { Elysia, t } from "elysia";

export const app = new Elysia({ prefix: "/api" })
	.use(swagger())
	.get("/", () => {
		return {
			message: "Hello Next.js!",
		};
	})
	.post("/", ({ body }: { body: { name: string } }) => body, {
		body: t.Object({
			name: t.String(),
		}),
	})
	.post("/id", ({ body }: { body: { id: number } }) => body, {
		body: t.Object({
			id: t.Number(),
		}),
	});

export const GET = app.handle;
export const POST = app.handle;

export type App = typeof app;
