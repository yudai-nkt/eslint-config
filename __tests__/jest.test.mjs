import { ESLint } from "eslint";
import { suite } from "uvu";
import * as assert from "uvu/assert";
import { listErrors } from "./utils.mjs";

const eslint = new ESLint({
  // to use arrow functions w/o the base preset.
  baseConfig:   {parserOptions: {
    ecmaVersion: 2021,
  }},
  overrideConfigFile: "./presets/jest.js",
  useEslintrc: false,
});

const Jest = suite("Test suite for the jest preset");

Jest("Should not have leading/trailing commas in decimals.", async () => {
  const {
    errorCount,
    ruleIds: [ruleId],
  } = await listErrors(eslint, "it('foo');\ntest('bar');");

  assert.is(errorCount, 1);
  assert.is(ruleId, "jest/consistent-test-it");
});

Jest("Should use .", async () => {
  const {
    errorCount,
    ruleIds: [ruleId],
  } = await listErrors(eslint, "test('bar', () => {expect({a: 'a', b: 'b'}).toEqual({a: 'a'})});");

  assert.is(errorCount, 1);
  assert.is(ruleId, "jest/prefer-strict-equal");
});

Jest.run();
