/**
 * Lint against the given code and summarize the errors found.
 * @param {import("eslint").ESLint} eslint ESLint instance.
 * @param {string} code Code snippet to lint.
 * @param {boolean} isTypeScript If `true`, lint as a TypeScript file.
 * @param {boolean} disableNoUnusedVars If `true`, append an eslint-disable comment to surpress no-unused-vars rule.
 * @returns {Promise<{errorCount: number, ruleIds: string[]}>} Promise of an object containing the number of errors and their IDs.
 */
export const listErrors = async (
  eslint,
  code,
  isTypeScript = false,
  disableNoUnusedVars = true
) => {
  if (disableNoUnusedVars) {
    code = `/* eslint-disable ${
      isTypeScript ? "@typescript-eslint/" : ""
    }no-unused-vars */\n${code}`;
  }
  const [{ errorCount, messages }] = await eslint.lintText(
    code,
    isTypeScript
      ? { filePath: "__tests__/dummy.ts" }
      : { filePath: "__tests__/dummy.js" }
  );

  return { errorCount, ruleIds: messages.map(({ ruleId }) => ruleId) };
};

/**
 * Extract ESLint rules enabled with a given instance.
 * @param {import("eslint").ESLint} eslint ESLint instance.
 * @param {boolean} isTypeScript If `true`, lint as a TypeScript file.
 * @returns {Set<string>} Set of rule IDs whose severity is set to either warn or error.
 */
export const filterEnabledRuleIds = async (eslint, isTypeScript = false) => {
  const { rules } = await eslint.calculateConfigForFile(
    isTypeScript ? "__tests__/dummy.ts" : "__tests__/dummy.js"
  );
  const enabledRuleIds = Object.entries(rules).flatMap(([ruleId, [severity]]) =>
    severity !== "off" ? [ruleId] : []
  );

  return new Set(enabledRuleIds);
};

/**
 * Given a set of ESLint rules, extract the ones that have been deprecated.
 * @param {[string, import("eslint").Rule.RuleModule][]} rules Array of tuples containg rule ID and the corresponding module.
 * @param {string} prefix Prefix to distinguish third party plugins.
 * @returns {string[]} Array of rule IDs that have been deprecated.
 */
export const filterDeprecatedRuleIds = (rules, prefix = "") =>
  rules.flatMap(
    ([
      ruleId,
      {
        meta: { deprecated },
      },
    ]) => (deprecated ? [`${prefix !== "" ? `${prefix}/` : ""}${ruleId}`] : [])
  );
