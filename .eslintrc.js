// @ts-check
/** @type import('eslint').Linter.BaseConfig */
module.exports = {
  extends: ["./presets/base"],
  rules: {
    // This package needs to be in CommonJS format because it exports ESLint configs.
    "unicorn/prefer-module": "off",
  },
  overrides: [
    // Tests are written in ESM.
    {
      files: "__tests__/*.mjs",
      parserOptions: {
        sourceType: "module",
      },
    },
  ],
};
