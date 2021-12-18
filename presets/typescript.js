// @ts-check
// Auto-completion using @type annotation somehow doesn't work well with
// BaseConfig.overrides, so assign overrides config to a variable first.
/** @type import('eslint').Linter.ConfigOverride */
const configForTypeScript = {
  files: ["*.ts", "*.tsx"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  rules: {
    "@typescript-eslint/array-type": "error",
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/consistent-indexed-object-style": "error",
    "@typescript-eslint/explicit-module-boundary-types": "error",
    "@typescript-eslint/method-signature-style": "error",
    "@typescript-eslint/no-require-imports": "error",
    "@typescript-eslint/no-unnecessary-type-arguments": "error",
    "@typescript-eslint/prefer-for-of": "error",
    "@typescript-eslint/prefer-readonly-parameter-types": "error",
    "@typescript-eslint/prefer-reduce-type-parameter": "error",
    "@typescript-eslint/promise-function-async": "error",
    "@typescript-eslint/require-array-sort-compare": "error",
  },
};

/** @type import('eslint').Linter.BaseConfig */
module.exports = {
  overrides: [configForTypeScript],
};
