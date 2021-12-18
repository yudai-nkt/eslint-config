# @yudai-nkt/eslint-config

My shareable config for ESLint.

## Installation

To be written.

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

### `@yudai-nkt/eslint-config/base`

This preset extends configurations recommended by the core ESLint team and [`eslint-plugin-unicorn`](https://www.npmjs.com/package/eslint-plugin-unicorn),
and configures some additional rules.

### `@yudai-nkt/eslint-config/prettier`

This preset extends [`eslint-config-prettier`](https://www.npmjs.com/package/eslint-config-prettier).

### `@yudai-nkt/eslint-config/typescript`

This presets specifies [`@typescript-eslint/parser`](https://www.npmjs.com/package/@typescript-eslint/parser) as a parser to lint TypeScript source codes,
extends configurations recommended by [`@typescript-eslint/eslint-plugin`](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin),
and configures some additional rules.

## License
This package is distributed under the MIT License.
See [LICENSE.md](./LICENSE.md) for details.
