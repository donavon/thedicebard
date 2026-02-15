import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    exclude: [
      "**/.git/**",
      "**/.netlify/**",
      "**/.react-router/**",
      "build/**",
    ],
    include: ["app/**/*.test.ts"],
  },
});
