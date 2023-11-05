# Changelog

All notable changes to this project will be documented in this file.

# [@sapphire/docusaurus-plugin-ts2esm2cjs@2.0.1](https://github.com/sapphiredev/documentation-plugins/compare/@sapphire/docusaurus-plugin-ts2esm2cjs@2.0.1...@sapphire/docusaurus-plugin-ts2esm2cjs@2.0.1) - (2023-11-05)

## 🐛 Bug Fixes

- **deps:** Update unified to 11.0.4 ([376dbfc](https://github.com/sapphiredev/documentation-plugins/commit/376dbfc24a8fe790cbd02343fa9a4a2c25ec0466))

# [@sapphire/docusaurus-plugin-ts2esm2cjs@2.0.0](https://github.com/sapphiredev/documentation-plugins/compare/@sapphire/docusaurus-plugin-ts2esm2cjs@2.0.0...@sapphire/docusaurus-plugin-ts2esm2cjs@2.0.0) - (2023-11-05)

## 🐛 Bug Fixes

- **ts2esm2cjs:** Add support for Docusaurus V3 ([4d1d170](https://github.com/sapphiredev/documentation-plugins/commit/4d1d1709f9fc66eac8dba371d1895b2c7e8b51d1))
  - 💥 **BREAKING CHANGE:** Docusaurus v3 support was added which means support for MDX v1 has been dropped and support for MDX v3 has been added.

# [@sapphire/docusaurus-plugin-ts2esm2cjs@1.1.6](https://github.com/sapphiredev/documentation-plugins/compare/@sapphire/docusaurus-plugin-ts2esm2cjs@1.1.5...@sapphire/docusaurus-plugin-ts2esm2cjs@1.1.6) - (2023-08-29)

## 🐛 Bug Fixes

- **ts2esm2cjs:** Update export mapping ([69ab926](https://github.com/sapphiredev/documentation-plugins/commit/69ab926773b235aeaad5182c841e9cf92fcb5580))

# [@sapphire/docusaurus-plugin-ts2esm2cjs@1.1.5](https://github.com/sapphiredev/documentation-plugins/compare/@sapphire/docusaurus-plugin-ts2esm2cjs@1.1.4...@sapphire/docusaurus-plugin-ts2esm2cjs@1.1.5) - (2023-08-20)

## 🐛 Bug Fixes

- **ts2esm2cjs:** Remove dependency on @sapphire/prettier-config ([ef09164](https://github.com/sapphiredev/documentation-plugins/commit/ef09164877ee21fe8c7657b9027c74131092154e))

# [@sapphire/docusaurus-plugin-ts2esm2cjs@1.1.4](https://github.com/sapphiredev/documentation-plugins/compare/@sapphire/docusaurus-plugin-ts2esm2cjs@1.1.3...@sapphire/docusaurus-plugin-ts2esm2cjs@1.1.4) - (2023-08-07)

## 🏠 Refactor

- **ts2esm2cjs:** Split off and export transform `ts2esm` and `esm2cjs` functions ([dcd3630](https://github.com/sapphiredev/documentation-plugins/commit/dcd3630b8fe565f4df1edb4d417104cebd376eab))

## 🐛 Bug Fixes

- **ts2esm2cjs:** Switch to @prettier/sync ([72b8bf7](https://github.com/sapphiredev/documentation-plugins/commit/72b8bf7872841984b5901e04ce906352c215d769))
- **deps:** Update dependency @sapphire/prettier-config to ^1.4.5 ([ca06c4b](https://github.com/sapphiredev/documentation-plugins/commit/ca06c4b3111898fc19c154e0177b607368ce0151))

## 📝 Documentation

- Add @vladfrangu as a contributor ([cd26f50](https://github.com/sapphiredev/documentation-plugins/commit/cd26f50dffcd964a86bd0b0431615621a472dba7))

## 🧪 Testing

- **ts2esm:** Add unit tests ([a2ea21a](https://github.com/sapphiredev/documentation-plugins/commit/a2ea21ac2d94801a054aaa9f17e31b02e80bee02))

# [@sapphire/docusaurus-plugin-ts2esm2cjs@1.1.2](https://github.com/sapphiredev/documentation-plugins/compare/@sapphire/docusaurus-plugin-ts2esm2cjs@1.1.0...@sapphire/docusaurus-plugin-ts2esm2cjs@1.1.2) - (2022-07-11)

## 🐛 Bug Fixes

- Manually set versions ([05f4d16](https://github.com/sapphiredev/documentation-plugins/commit/05f4d16dcd5673a208e4ec191e659b3cbd2dc95a))

# [@sapphire/docusaurus-plugin-ts2esm2cjs@1.1.0](https://github.com/sapphiredev/documentation-plugins/compare/@sapphire/docusaurus-plugin-ts2esm2cjs@1.0.3...@sapphire/docusaurus-plugin-ts2esm2cjs@1.1.0) - (2022-05-15)

## 🐛 Bug Fixes

- Restore tsup (reverts 7411ff7) ([7df536b](https://github.com/sapphiredev/documentation-plugins/commit/7df536bd871b45d0cfa65816684bc691b4735bc0))
- Remove tsup ([7411ff7](https://github.com/sapphiredev/documentation-plugins/commit/7411ff79624eec777519a2a049c8d3f026871cac))
- **ts2esm2cjs:** Ensure compatibility with docusaurus v2 beta 20 ([c1c4716](https://github.com/sapphiredev/documentation-plugins/commit/c1c4716ac51f3ad28099dd9bf13dabe064b014bb))

## 🚀 Features

- Allow module: NodeNext ([8221bc2](https://github.com/sapphiredev/documentation-plugins/commit/8221bc2668fd1ad9c2e80c3c6a1503ae27bfc632))

## [1.0.3](https://github.com/sapphiredev/documentation-plugins/compare/@sapphire/docusaurus-plugin-ts2esm2cjs@1.0.2...@sapphire/docusaurus-plugin-ts2esm2cjs@1.0.3) (2022-01-13)

### Bug Fixes

-   **ts2esm2cjs:** switch back to published package of esm-to-cjs ([0ca3884](https://github.com/sapphiredev/documentation-plugins/commit/0ca388495cf91a7c4ab19c24bd48e0d992e0f821))

### Reverts

-   Revert "fix(ts2esm2cjs): fixed imports that have `as` in their name" ([684b297](https://github.com/sapphiredev/documentation-plugins/commit/684b2975f08df8a00ed2a6f5576770e6c7168383))

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
