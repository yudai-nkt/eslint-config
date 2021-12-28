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
    isTypeScript ? { filePath: "__tests__/dummy.ts" } : {}
  );

  return { errorCount, ruleIds: messages.map(({ ruleId }) => ruleId) };
};
