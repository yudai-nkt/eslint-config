import { ESLint } from "eslint";
import eslintPluginJest from "eslint-plugin-jest";
import { suite } from "uvu";
import * as assert from "uvu/assert";
import {
  listErrors,
  filterEnabledRuleIds,
  filterDeprecatedRuleIds,
} from "./utils.mjs";

const eslint = new ESLint({
  // to use arrow functions w/o the base preset.
  baseConfig: {
    parserOptions: {
      ecmaVersion: 2021,
    },
  },
  overrideConfigFile: "./presets/jest.js",
  useEslintrc: false,
});
const deprecatedRuleIds = filterDeprecatedRuleIds(
  Object.entries(eslintPluginJest.rules),
  "jest"
);
const enabledRuleIds = await filterEnabledRuleIds(eslint);

const Jest = suite("Test suite for the jest preset");

for (const ruleId of deprecatedRuleIds) {
  Jest(`Should not enable deprecated rule: ${ruleId}`, () => {
    assert.not.ok(enabledRuleIds.has(ruleId));
  });
}

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
  } = await listErrors(
    eslint,
    "test('bar', () => {expect({a: 'a', b: 'b'}).toEqual({a: 'a'})});"
  );

  assert.is(errorCount, 1);
  assert.is(ruleId, "jest/prefer-strict-equal");
});

Jest.run();
