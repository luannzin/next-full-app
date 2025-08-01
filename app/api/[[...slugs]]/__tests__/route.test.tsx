import { describe, expect, it } from "vitest";
import { client } from "@/app/client/api";

describe("main elysia server route", () => {
	it("should return 200 on '/' route", async () => {
		const { data, status } = await client.get();

		expect(status).toBe(200);
		expect(data?.message).toBeDefined();
	});
});
