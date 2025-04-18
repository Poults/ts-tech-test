// @ts-check

import eslint from "@eslint/js";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["**/dist/**"],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.commonjs,
        ...globals.es2021,
        ...globals.node,
      },
    },
    ignores: [".gitignore"],
    rules: {
      "prettier/prettier": "warn",
    },
  },
  {
    files: ["**/*.test.ts"],
    rules: {
      "@typescript-eslint/ban-ts-comment": 0,
    },
  },
  prettierRecommended,
);
