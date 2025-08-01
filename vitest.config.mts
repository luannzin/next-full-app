import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [tsconfigPaths(), react()],
	test: {
		environment: "jsdom",
		reporters: [["default", { summary: false }]],
		coverage: {
			provider: "v8",
			exclude: [
				"**/node_modules/**",
				"**/dist/**",
				"**/coverage/**",
				"**/*.d.ts",
				"**/*.config.*",
				"**/vite.config.*",
				"**/next.config.*",
				"**/postcss.config.*",
				"**/.next/**",
				"app/layout.tsx",
			],
		},
	},
});
