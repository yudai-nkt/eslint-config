module.exports = {
  "*.{js,mjs}": ["prettier --write", "eslint --fix"],
  "*.md": ["prettier --write"],
  "*.yml": ["prettier --write"],
  "*.json5": ["prettier --write"],
};
