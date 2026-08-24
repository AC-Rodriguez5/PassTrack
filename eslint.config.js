const { defineConfig } = require("eslint/config");
const expo = require("eslint-config-expo/flat");

module.exports = defineConfig([
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "web-build/**",
      "eslint.config.js",
    ],
  },
  expo,
]);
