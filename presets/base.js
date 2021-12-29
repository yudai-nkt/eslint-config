// @ts-check
/** @type import('eslint').Linter.BaseConfig */
module.exports = {
  parserOptions: {
    ecmaVersion: 2021,
  },
  extends: ["eslint:recommended", "plugin:unicorn/recommended"],
  env: {
    node: true,
  },
  rules: {
    "no-floating-decimal": "error",
    "no-multiple-empty-lines": ["error", { max: 1 }],
    "no-throw-literal": "error",
    "no-var": "error",
    "prefer-const": "error",
    "prefer-exponentiation-operator": "error",
    "require-atomic-updates": "error",
    "default-param-last": "error",
    "unicorn/prefer-node-protocol": "error",
    // As many of the abbreviations targeted in this rule are popular enough,
    // disable it.
    "unicorn/prevent-abbreviations": "off",
  },
};
