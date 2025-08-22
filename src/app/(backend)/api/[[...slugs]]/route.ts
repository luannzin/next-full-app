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
	})
	.post(
		"/waitlist",
		async ({ body }: { body: { email: string } }) => {
			try {
				// Here you would typically save to a database
				// For now, we'll just log the email and return success
				console.log(`New waitlist signup: ${body.email}`);

				// In a real app, you might:
				// - Save to database
				// - Send welcome email
				// - Add to mailing list
				// - Check for duplicates

				return {
					success: true,
					message: "Successfully joined the waitlist",
					email: body.email,
					timestamp: new Date().toISOString(),
				};
			} catch (error) {
				console.error("Waitlist signup error:", error);
				throw new Error("Failed to join waitlist");
			}
		},
		{
			body: t.Object({
				email: t.String({
					format: "email",
					minLength: 5,
					maxLength: 254,
				}),
			}),
			response: {
				200: t.Object({
					success: t.Boolean(),
					message: t.String(),
					email: t.String(),
					timestamp: t.String(),
				}),
				400: t.Object({
					error: t.String(),
				}),
			},
		},
	);

export const GET = app.handle;
export const POST = app.handle;

export type App = typeof app;
