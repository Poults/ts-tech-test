export default {
  "**/*.{ts,js,json}": ["prettier --write", "eslint"],
  "*.{md,yaml,yml}": ["prettier --write"],
};
