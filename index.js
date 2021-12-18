// @ts-check
const { execSync } = require("child_process");

const packageJson = JSON.parse(
  execSync("npm ls --json", { encoding: "utf-8" })
);
const dependencies = Object.keys(packageJson.dependencies);
/**
 * Check if all of the given packages are installed in the project.
 * @param {string[]} packages - Dependecies to check.
 * @return {boolean} `true` if all packages are installed, `false` otherwise.
 */
const isInstalled = (packages) =>
  packages.every((pkg) => dependencies.includes(pkg));

const configs = ["./presets/base"];
if (
  isInstalled([
    "typescript",
    "@typescript-eslint/parser",
    "@typescript-eslint/eslint-plugin",
  ])
) {
  configs.push("./presets/typescript");
}
if (isInstalled(["prettier", "eslint-config-prettier"])) {
  configs.push("./presets/prettier");
}

/** @type import('eslint').Linter.BaseConfig */
module.exports = {
  extends: configs,
};
