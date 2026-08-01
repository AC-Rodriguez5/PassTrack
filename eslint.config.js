const { defineConfig } = require("eslint/config");
const expo = require("eslint-config-expo/flat");

module.exports = defineConfig([
  {
    ignores: [
      "node_modules/**",
      "eslint.config.js",
    ],
  },
  expo,
]);