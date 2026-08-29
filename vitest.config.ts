import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    passWithNoTests: true,
    setupFiles: ["./src/test/setup.ts"],
    coverage: {
      provider: "v8",
      enabled: true,
      include: ["src/**"],
      exclude: [
        "src/test/**",
        "src/**/*.test.*",
        "src/**/__tests__/**",
        "src/**/*.d.ts",
        "src/proxy.ts",
        "src/middleware.ts",
      ],
      reporter: ["text", "text-summary"],
      // Small headroom: bun's v8 instrumentation measures ~0.5-1pp below node's,
      // so keep these 1-2pp under the real targets to avoid flaky CI gates.
      thresholds: {
        lines: 71,
        functions: 64,
        branches: 62,
        statements: 69,
      },
    },
  },
});
