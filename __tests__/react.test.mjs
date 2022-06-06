import { ESLint } from "eslint";
import eslintPluginJSXA11y from "eslint-plugin-jsx-a11y";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import { suite } from "uvu";
import * as assert from "uvu/assert";
import {
  listErrors,
  filterEnabledRuleIds,
  filterDeprecatedRuleIds,
} from "./utils.mjs";

const eslint = new ESLint({
  overrideConfigFile: "./presets/react.js",
  useEslintrc: false,
});
const deprecatedRuleIds = [
  { plugin: eslintPluginJSXA11y, prefix: "jsx-a11y" },
  { plugin: eslintPluginReact, prefix: "react" },
  { plugin: eslintPluginReactHooks, prefix: "react-hooks" },
].flatMap(({ plugin, prefix }) =>
  filterDeprecatedRuleIds(Object.entries(plugin.rules), prefix)
);
const enabledRuleIds = await filterEnabledRuleIds(eslint);

const React = suite("Test suite for the react preset");

for (const ruleId of deprecatedRuleIds) {
  React(`Should not enable deprecated rule: ${ruleId}`, () => {
    assert.not.ok(enabledRuleIds.has(ruleId));
  });
}

React("Should not have closing tags for components w/o children.", async () => {
  const {
    errorCount,
    ruleIds: [ruleId],
  } = await listErrors(eslint, "<div></div>;");
  assert.is(errorCount, 1);
  assert.is(ruleId, "react/self-closing-comp");
});

React.run();
