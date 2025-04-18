import { defineConfig } from "vitest/config";

import defaultConfig from "./vitest.config";

export default defineConfig(
  Object.assign({}, defaultConfig, {
    test: Object.assign({}, defaultConfig.test, {
      include: ["**/*.int.test.ts"],
    }),
  }),
);
