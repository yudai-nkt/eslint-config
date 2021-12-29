// @ts-check
/** @type import('semantic-release').Options */
module.exports = {
  branches: ["main"],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "conventionalcommits",
        presetConfig: {},
      },
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        preset: "conventionalcommits",
        presetConfig: {},
      },
    ],
    [
      "@semantic-release/changelog",
      {
        changelogTitle: [
          "# Changelog\n",
          "All notable changes to this project will be documented in this file.",
          "See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.",
        ].join("\n"),
      },
    ],
    "@semantic-release/npm",
    "@semantic-release/git",
  ],
};
