import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    unstubEnvs: true,
    reporters: ["default", "junit"],
    outputFile: {
      junit: "./reports/junit.xml",
    },
  },
});
