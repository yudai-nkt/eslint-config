# @yudai-nkt/eslint-config

[![test](https://github.com/yudai-nkt/eslint-config/actions/workflows/test.yml/badge.svg)](https://github.com/yudai-nkt/eslint-config/actions/workflows/test.yml)
[![version](https://img.shields.io/npm/v/@yudai-nkt/eslint-config)](https://www.npmjs.com/package/@yudai-nkt/eslint-config)
[![node-version](https://img.shields.io/node/v/@yudai-nkt/eslint-config)](https://www.npmjs.com/package/@yudai-nkt/eslint-config)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![semantic-release: conventionalcommits](https://img.shields.io/badge/semantic--release-conventionalcommits-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
[![license](https://img.shields.io/github/license/yudai-nkt/eslint-config)](https://github.com/yudai-nkt/eslint-config/blob/main/LICENSE.md)

My shareable config for ESLint.

## Installation

This package is available on the NPM registry.
Install `@yudai-nkt/eslint-config` using your favortite package manager.

Note that `npm` v7 or later automatically installs peer dependencies that you might **_not_** want to install.
Make sure to specify the `--legacy-peer-deps` option if that's the case.

## Usage

Just add `@yudai-nkt` to extends in your ESLint configuration:

```json
{
  "extends": ["@yudai-nkt"]
}
```

This will check your dependencies and automatically load the neccessary configurations.

## Presets

While the usage mentioned above should work out of the box, you can manually load the presets listed below.
To load these presets, `@yudai-nkt/eslint-config/` needs to be prefixed with the name (e.g., `@yudai-nkt/eslint-config/base`).

<!-- prettier-ignore-start -->
| Preset name | Description |
| ------- | ----------- |
| `base` | Extends configurations recommended by the core ESLint team and [`eslint-plugin-unicorn`](https://www.npmjs.com/package/eslint-plugin-unicorn), and configures some additional rules. |
| `jest` | Extends configurations recommended by [`eslint-plugin-jest`](https://www.npmjs.com/package/eslint-plugin-jest), and configures some additional rules for common test file patterns. |
| `prettier` | Extends [`eslint-config-prettier`](https://www.npmjs.com/package/eslint-config-prettier). |
| `react` | Extends configurations recommended by [`eslint-plugin-jsx-a11y`](https://www.npmjs.com/package/eslint-plugin-jsx-a11y), [`eslint-plugin-react`](https://www.npmjs.com/package/eslint-plugin-react), and [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks), and configures some additional rules. |
| `typescript` | Specifies [`@typescript-eslint/parser`](https://www.npmjs.com/package/@typescript-eslint/parser) as a parser to lint TypeScript source codes, extends configurations recommended by [`@typescript-eslint/eslint-plugin`](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin), and configures some additional rules. |
| `uvu` | Enables all the rules defined by [`eslint-plugin-uvu`](https://www.npmjs.com/package/eslint-plugin-uvu) for common test file patterns. |
<!-- prettier-ignore-end -->

## License

This package is distributed under the MIT License.
See [LICENSE.md](./LICENSE.md) for details.
