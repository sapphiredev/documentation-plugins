# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.0.2](https://github.com/sapphiredev/documentation-plugins/compare/@sapphire/docusaurus-plugin-ts2esm2cjs@1.0.1...@sapphire/docusaurus-plugin-ts2esm2cjs@1.0.2) (2022-01-12)

### Bug Fixes

-   **ts2esm2cjs:** fixed imports that have `as` in their name ([147c85d](https://github.com/sapphiredev/documentation-plugins/commit/147c85db866ac0544b4bcc62aa5e54a9f3009903))

### Reverts

-   Revert "ci: try adding extra dev deps for ci" ([de49260](https://github.com/sapphiredev/documentation-plugins/commit/de49260d4d8c4be4bb27d53f13472946e4cd3700))

## [1.0.1](https://github.com/sapphiredev/documentation-plugins/compare/@sapphire/docusaurus-plugin-ts2esm2cjs@1.0.0...@sapphire/docusaurus-plugin-ts2esm2cjs@1.0.1) (2021-11-30)

### Bug Fixes

-   **ts2esm2cjs:** allow longer lengths for esm to cjs ([280746c](https://github.com/sapphiredev/documentation-plugins/commit/280746cbf7120c9baddf8deac436ea0a9ba1835e))

# 1.0.0 (2021-11-26)

### Bug Fixes

-   **ts2esm2cjs:** removed esm exports to ensure cjs works fine with require syntax ([73b6898](https://github.com/sapphiredev/documentation-plugins/commit/73b6898881374259f9a38b74fe741cf46a468e06))
-   **ts2esm2cjs:** removed exports field from package.json ([7dfac94](https://github.com/sapphiredev/documentation-plugins/commit/7dfac9464b28caa8e2d0dc03040a1b38f6b02d68))

### Features

-   add ts2esm2cjs package ([35ec87d](https://github.com/sapphiredev/documentation-plugins/commit/35ec87dd8743aecc57c344b1d2d4ae88038fcd7b))
-   **ts2esm2cjs:** add option to customize tsc options ([af19a1d](https://github.com/sapphiredev/documentation-plugins/commit/af19a1d8473b8a3723933f87f8a0c6f79e98ebc7))

### Reverts

-   Revert "fix(typedoc-djs-links): removed esm exports to ensure cjs works fine with require syntax" ([7b4c6ab](https://github.com/sapphiredev/documentation-plugins/commit/7b4c6ab434265903213d7d965b0e927912b1aba1))
