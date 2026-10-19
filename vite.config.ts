import preact from "@preact/preset-vite";
import { defineConfig } from "vite";

export default defineConfig(() => ({
	base: "", // relative paths
	server: {
		port: 3000,
	},
	plugins: [preact()],
}));
