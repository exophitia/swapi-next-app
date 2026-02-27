import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vitest/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    include: ["lib/**/*.test.ts", "components/**/*.test.tsx"],
    environmentMatchObject: [
      { include: ["**/*.test.tsx"], environment: "happy-dom" },
    ],
    setupFiles: ["./vitest.setup.mjs"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
