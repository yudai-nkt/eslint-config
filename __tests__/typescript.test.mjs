import { ESLint } from "eslint";
import { suite } from "uvu";
import * as assert from "uvu/assert";
import { listErrors } from "./utils.mjs";

const eslint = new ESLint({
  overrideConfigFile: "./presets/typescript.js",
  useEslintrc: false,
});

const TypeScript = suite("Test suite for the TypeScript preset");

TypeScript("Should use T[] instead of Array<T>.", async () => {
  const {
    errorCount,
    ruleIds: [ruleId],
  } = await listErrors(eslint, "type Foo = Array<'foo'>", true);

  assert.is(errorCount, 1);
  assert.is(ruleId, "@typescript-eslint/array-type");
});

TypeScript("Should use type-only imports where applicable.", async () => {
  const {
    errorCount,
    ruleIds: [ruleId],
  } = await listErrors(
    eslint,
    "import { Foo } from 'Foo';\ntype T = Foo;",
    true
  );

  assert.is(errorCount, 1);
  assert.is(ruleId, "@typescript-eslint/consistent-type-imports");
});

TypeScript("Should use Record<T, K> instead of index-signature.", async () => {
  const {
    errorCount,
    ruleIds: [ruleId],
  } = await listErrors(eslint, "type Foo = { [key: string]: unknown };", true);

  assert.is(errorCount, 1);
  assert.is(ruleId, "@typescript-eslint/consistent-indexed-object-style");
});

TypeScript("Should use property signature with function types.", async () => {
  const {
    errorCount,
    ruleIds: [ruleId],
  } = await listErrors(eslint, "type Foo = { foo(bar: number): void };", true);

  assert.is(errorCount, 1);
  assert.is(ruleId, "@typescript-eslint/method-signature-style");
});

TypeScript("Should annotate types for module boundaries.", async () => {
  const {
    errorCount,
    ruleIds: [ruleId],
  } = await listErrors(
    eslint,
    "export const add = (a: number, b: number) => a + b;",
    true
  );

  assert.is(errorCount, 1);
  assert.is(ruleId, "@typescript-eslint/explicit-module-boundary-types");
});

TypeScript("Should use ES6-style imports.", async () => {
  const {
    errorCount,
    ruleIds: [ruleId],
  } = await listErrors(eslint, "import fs = require('fs');", true);

  assert.is(errorCount, 1);
  assert.is(ruleId, "@typescript-eslint/no-require-imports");
});

TypeScript(
  "Should not specify a type parameter if that is the default type.",
  async () => {
    const {
      errorCount,
      ruleIds: [ruleId],
    } = await listErrors(
      eslint,
      "type Foo<T = string> = T | T[];\ntype Bar = Foo<string>;",
      true
    );

    assert.is(errorCount, 1);
    assert.is(ruleId, "@typescript-eslint/no-unnecessary-type-arguments");
  }
);

TypeScript(
  "Should use for-of loop the index is only used to specify an element.",
  async () => {
    const {
      errorCount,
      ruleIds: [ruleId],
    } = await listErrors(
      eslint,
      "declare const arr: string[];\nfor (let i = 0; i < arr.length; i++) { console.log(arr[i]) }",
      true
    );

    assert.is(errorCount, 1);
    assert.is(ruleId, "@typescript-eslint/prefer-for-of");
  }
);

TypeScript(
  "Should use type parameters for Array#reduce instead of downcasting the initial value.",
  async () => {
    const {
      errorCount,
      ruleIds: [ruleId],
    } = await listErrors(
      eslint,
      "[1, 2].reduce((arr, num) => arr.concat(num * 2), [] as readonly number[]);",
      true
    );

    assert.is(errorCount, 1);
    assert.is(ruleId, "@typescript-eslint/prefer-reduce-type-parameter");
  }
);

TypeScript("Should mark Promise-returning functions as async.", async () => {
  const {
    errorCount,
    ruleIds: [ruleId],
  } = await listErrors(
    eslint,
    "const foo = () => Promise.resolve('foo');",
    true
  );

  assert.is(errorCount, 1);
  assert.is(ruleId, "@typescript-eslint/promise-function-async");
});

TypeScript("Should explicitly provide compareFn for Array#sort.", async () => {
  const {
    errorCount,
    ruleIds: [ruleId],
  } = await listErrors(eslint, "[2, 10].sort();", true);

  assert.is(errorCount, 1);
  assert.is(ruleId, "@typescript-eslint/require-array-sort-compare");
});

TypeScript.run();
