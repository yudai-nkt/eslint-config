import { ESLint } from "eslint";
import eslintPluginUvu from "eslint-plugin-uvu";
import { suite } from "uvu";
import * as assert from "uvu/assert";
import { filterEnabledRuleIds, filterDeprecatedRuleIds } from "./utils.mjs";

const eslint = new ESLint({
  // to use arrow functions w/o the base preset.
  baseConfig: {
    parserOptions: {
      ecmaVersion: 2021,
    },
  },
  overrideConfigFile: "./presets/uvu.js",
  useEslintrc: false,
});
const deprecatedRuleIds = filterDeprecatedRuleIds(
  Object.entries(eslintPluginUvu.rules),
  "uvu"
);
const enabledRuleIds = await filterEnabledRuleIds(eslint);

const Uvu = suite("Test suite for the uvu preset");

for (const ruleId of deprecatedRuleIds) {
  Uvu(`Should not enable deprecated rule: ${ruleId}`, () => {
    assert.not.ok(enabledRuleIds.has(ruleId));
  });
}

Uvu.run();
