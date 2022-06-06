// @ts-check
/** @type import('eslint').Linter.BaseConfig */
module.exports = {
  settings: { react: { version: "detect" } },
  extends: [
    "plugin:jsx-a11y/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  rules: { "react/self-closing-comp": "error" },
};
