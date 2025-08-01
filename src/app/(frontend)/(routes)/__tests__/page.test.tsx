import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import Page from "../page";

test("home page renders correctly", async () => {
	render(await Page());
	expect(screen.getByRole("heading", { level: 1 })).toBeDefined();
});
