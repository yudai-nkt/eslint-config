import { ESLint, Linter } from "eslint";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import { suite } from "uvu";
import * as assert from "uvu/assert";
import {
  listErrors,
  filterEnabledRuleIds,
  filterDeprecatedRuleIds,
} from "./utils.mjs";

const eslint = new ESLint({
  overrideConfigFile: "./presets/base.js",
  useEslintrc: false,
});
const deprecatedRuleIds = [
  ...filterDeprecatedRuleIds([...new Linter().getRules()]),
  ...filterDeprecatedRuleIds(
    Object.entries(eslintPluginUnicorn.rules),
    "unicorn"
  ),
];
const enabledRuleIds = await filterEnabledRuleIds(eslint);

const Base = suite("Test suite for the base preset");

for (const ruleId of deprecatedRuleIds) {
  Base(`Should not enable deprecated rule: ${ruleId}`, () => {
    assert.not.ok(enabledRuleIds.has(ruleId));
  });
}

Base("Should not have leading/trailing commas in decimals.", async () => {
  const {
    errorCount,
    ruleIds: [ruleId],
  } = await listErrors(eslint, "const foo = .1;");

  assert.is(errorCount, 1);
  assert.is(ruleId, "no-floating-decimal");
});

Base("Should not contain 2 consecutive blank lines.", async () => {
  const {
    errorCount,
    ruleIds: [ruleId],
  } = await listErrors(eslint, "const foo = 0;\n\n\nconst bar = 1;");

  assert.is(errorCount, 1);
  assert.is(ruleId, "no-multiple-empty-lines");
});

Base("Should not throw literals.", async () => {
  const {
    errorCount,
    ruleIds: [ruleId],
  } = await listErrors(eslint, "throw 0;");

  assert.is(errorCount, 1);
  assert.is(ruleId, "no-throw-literal");
});

Base("Should not declare variable with `var`.", async () => {
  const {
    errorCount,
    ruleIds: [ruleId],
  } = await listErrors(eslint, "var foo = 0;");

  assert.is(errorCount, 1);
  assert.is(ruleId, "no-var");
});

Base("Should prefer `const` to `let`.", async () => {
  const {
    errorCount,
    ruleIds: [ruleId],
  } = await listErrors(eslint, "let foo = 0;");

  assert.is(errorCount, 1);
  assert.is(ruleId, "prefer-const");
});

Base("Should prefer `**` to `Math.pow`.", async () => {
  const {
    errorCount,
    ruleIds: [ruleId],
  } = await listErrors(eslint, "const foo = Math.pow(2, 2);");

  assert.is(errorCount, 1);
  assert.is(ruleId, "prefer-exponentiation-operator");
});

Base("Should not .", async () => {
  const {
    errorCount,
    ruleIds: [ruleId],
  } = await listErrors(
    eslint,
    "let foo, bar; const baz = async () => { foo += await bar };"
  );

  assert.is(errorCount, 1);
  assert.is(ruleId, "require-atomic-updates");
});

Base("Should place dafault param last.", async () => {
  const {
    errorCount,
    ruleIds: [ruleId],
  } = await listErrors(eslint, "(foo, bar=true, baz) => {};");

  assert.is(errorCount, 1);
  assert.is(ruleId, "default-param-last");
});

Base("Should use `node:` protocol.", async () => {
  const {
    errorCount,
    ruleIds: [ruleId],
  } = await listErrors(eslint, "import path from 'path';");

  assert.is(errorCount, 1);
  assert.is(ruleId, "unicorn/prefer-node-protocol");
});

Base.run();
