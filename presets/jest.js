// @ts-check
/** @type import('eslint').Linter.BaseConfig */
module.exports = {
  overrides: [
    {
      // Locations of test files depend on each project, so
      // most popular ones are specified here.
      files: ["**/__tests__/*.js", "**.test.js"],
      env: {
        "jest/globals": true,
      },
      plugins: ["jest"],
      extends: ["plugin:jest/recommended", "plugin:jest/style"],
      rules: {
        "jest/consistent-test-it": "error",
        "jest/prefer-strict-equal": "error",
      },
    },
  ],
};
