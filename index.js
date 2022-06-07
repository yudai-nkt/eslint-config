// @ts-check
const { execSync } = require("child_process");

const { dependencies } = JSON.parse(
  execSync("npm ls --json", { encoding: "utf-8" })
);
/**
 * Check if all of the given packages are installed in the project.
 * @param {string[]} packages - Dependecies to check.
 * @return {boolean} `true` if all packages are installed, `false` otherwise.
 */
const isInstalled = (packages) =>
  // @ts-expect-error
  packages.every((pkg) => Object.hasOwn(dependencies, pkg));

const configs = ["./presets/base"];
if (isInstalled(["jest", "eslint-plugin-jest"])) {
  configs.push("./presets/jest");
}
if (isInstalled(["uvu", "eslint-plugin-uvu"])) {
  configs.push("./presets/uvu");
}
if (
  isInstalled([
    "react",
    "eslint-plugin-jsx-a11y",
    "eslint-plugin-react",
    "eslint-plugin-react-hooks",
  ])
) {
  configs.push("./presets/react");
}
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
