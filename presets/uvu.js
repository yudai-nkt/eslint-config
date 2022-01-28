// @ts-check
/** @type import('eslint').Linter.BaseConfig */
module.exports = {
  overrides: [
    {
      // Locations of test files depend on each project, so
      // most popular ones are specified here.
      files: ["**/__tests__/*.{js,mjs,ts}", "**.test.{js,mjs,ts}"],
      plugins: ["uvu"],
      extends: ["plugin:uvu/all"],
    },
  ],
};
