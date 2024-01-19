# Changelog

All notable changes to this project will be documented in this file.

# [@sapphire/docusaurus-plugin-npm2yarn2pnpm@2.0.2](https://github.com/sapphiredev/documentation-plugins/compare/@sapphire/docusaurus-plugin-npm2yarn2pnpm@2.0.2...@sapphire/docusaurus-plugin-npm2yarn2pnpm@2.0.2) - (2024-01-19)

## 🐛 Bug Fixes

- Properly split CJS and ESM (#228) ([ea4951c](https://github.com/sapphiredev/documentation-plugins/commit/ea4951cb04eea5f6c5d1882b68e1ae42ed73e3ea))

## 📝 Documentation

- Incorrect syntax in readme of ts2esm2cjs & npm2yarn2pnpm (#203) ([621df18](https://github.com/sapphiredev/documentation-plugins/commit/621df18aaa89d8f82887c5124ebc681cfec8986c))

## 🧪 Testing

- Fix test config ([7b4a6ab](https://github.com/sapphiredev/documentation-plugins/commit/7b4a6ab7732e5e886a40f31d5adb27874a04e43b))

# [@sapphire/docusaurus-plugin-npm2yarn2pnpm@2.0.1](https://github.com/sapphiredev/documentation-plugins/compare/@sapphire/docusaurus-plugin-npm2yarn2pnpm@2.0.1...@sapphire/docusaurus-plugin-npm2yarn2pnpm@2.0.1) - (2023-11-05)

## 🐛 Bug Fixes

-   Actually read convertToBun option when assigning tab children ([8577f6e](https://github.com/sapphiredev/documentation-plugins/commit/8577f6ecd0e2c052af8b6992bd90388c8a03e255))

# [@sapphire/docusaurus-plugin-npm2yarn2pnpm@2.0.0](https://github.com/sapphiredev/documentation-plugins/compare/@sapphire/docusaurus-plugin-npm2yarn2pnpm@2.0.0...@sapphire/docusaurus-plugin-npm2yarn2pnpm@2.0.0) - (2023-11-05)

## 🏠 Refactor

-   **npm2yarn2pnpm:** Remove `npm2yarn2pnpm` export ([5844fda](https://github.com/sapphiredev/documentation-plugins/commit/5844fdaa2fab61f3b0663fe2ba9f6d4c25b41dac))
    -   💥 **BREAKING CHANGE:** Previously deprecated `npm2yarn2pnpm` has been removed. Use the new `convertNpmToPackageManagers` instead.

## 🐛 Bug Fixes

-   **deps:** Update unified to 11.0.4 ([376dbfc](https://github.com/sapphiredev/documentation-plugins/commit/376dbfc24a8fe790cbd02343fa9a4a2c25ec0466))
-   **npm2yarn2pnpm:** Add support for Docusaurus V3 ([61f0a04](https://github.com/sapphiredev/documentation-plugins/commit/61f0a041762b1551f6269727d2d7ca733ad332a6))
    -   💥 **BREAKING CHANGE:** Docusaurus v3 support was added which means support for MDX v1 has been dropped and support for MDX v3 has been added.

# [@sapphire/docusaurus-plugin-npm2yarn2pnpm@1.2.0](https://github.com/sapphiredev/documentation-plugins/compare/@sapphire/docusaurus-plugin-npm2yarn2pnpm@1.2.0...@sapphire/docusaurus-plugin-npm2yarn2pnpm@1.2.0) - (2023-09-16)

## 🚀 Features

-   Support for the bun package manger (#187) ([7db8af9](https://github.com/sapphiredev/documentation-plugins/commit/7db8af9ab27fb79fbf1d70fdc9f7f8dcae2f529a))

# [@sapphire/docusaurus-plugin-npm2yarn2pnpm@1.1.5](https://github.com/sapphiredev/documentation-plugins/compare/@sapphire/docusaurus-plugin-npm2yarn2pnpm@1.1.4...@sapphire/docusaurus-plugin-npm2yarn2pnpm@1.1.5) - (2023-08-29)

## 🐛 Bug Fixes

-   **npm2yarn2pnpm:** Update export mapping ([6571853](https://github.com/sapphiredev/documentation-plugins/commit/6571853fec32d28d15cc96f6ebe81fc0633d7c42))

# [@sapphire/docusaurus-plugin-npm2yarn2pnpm@1.1.4](https://github.com/sapphiredev/documentation-plugins/compare/@sapphire/docusaurus-plugin-npm2yarn2pnpm@1.1.3...@sapphire/docusaurus-plugin-npm2yarn2pnpm@1.1.4) - (2022-10-08)

## 🏠 Refactor

-   Switch from `@armano/npm-to-yarn` to own implementation ([c4a2543](https://github.com/sapphiredev/documentation-plugins/commit/c4a254318b6ad0609c1be9c556f2dcdd7c853b3b))

## 📝 Documentation

-   Add @vladfrangu as a contributor ([cd26f50](https://github.com/sapphiredev/documentation-plugins/commit/cd26f50dffcd964a86bd0b0431615621a472dba7))

# [@sapphire/docusaurus-plugin-npm2yarn2pnpm@1.1.3](https://github.com/sapphiredev/documentation-plugins/compare/@sapphire/docusaurus-plugin-npm2yarn2pnpm@1.1.2...@sapphire/docusaurus-plugin-npm2yarn2pnpm@1.1.3) - (2022-07-12)

## 🐛 Bug Fixes

-   Use better api ([c4c171b](https://github.com/sapphiredev/documentation-plugins/commit/c4c171b566a9522db57e0c57d80d76ca75243fdf))

## 🧪 Testing

-   Add yarn patch to temporarily fix package ([6345912](https://github.com/sapphiredev/documentation-plugins/commit/63459128ce6b8a846525160da4084c302e4225dc))

# [@sapphire/docusaurus-plugin-npm2yarn2pnpm@1.1.2](https://github.com/sapphiredev/documentation-plugins/compare/@sapphire/docusaurus-plugin-npm2yarn2pnpm@1.1.0...@sapphire/docusaurus-plugin-npm2yarn2pnpm@1.1.2) - (2022-07-11)

## 🐛 Bug Fixes

-   Fixed converting pnpm with flags ([35aa88c](https://github.com/sapphiredev/documentation-plugins/commit/35aa88c7d811eaa74be673dde8f09b9fd8444972))
-   Switch to @armano's fork of npm-to-yarn ([96fd557](https://github.com/sapphiredev/documentation-plugins/commit/96fd55735b155f784bb877c47cfb3ff1f8aff87c))
-   Manually set versions ([05f4d16](https://github.com/sapphiredev/documentation-plugins/commit/05f4d16dcd5673a208e4ec191e659b3cbd2dc95a))

## 🧪 Testing

-   Add unit tests ([dfab541](https://github.com/sapphiredev/documentation-plugins/commit/dfab541b725a5296eb6768c85365f1f1ea3e0b87))

# [@sapphire/docusaurus-plugin-npm2yarn2pnpm@1.1.0](https://github.com/sapphiredev/documentation-plugins/compare/@sapphire/docusaurus-plugin-npm2yarn2pnpm@1.0.3...@sapphire/docusaurus-plugin-npm2yarn2pnpm@1.1.0) - (2022-05-15)

## 🐛 Bug Fixes

-   Restore tsup (reverts 7411ff7) ([7df536b](https://github.com/sapphiredev/documentation-plugins/commit/7df536bd871b45d0cfa65816684bc691b4735bc0))
-   Remove tsup ([7411ff7](https://github.com/sapphiredev/documentation-plugins/commit/7411ff79624eec777519a2a049c8d3f026871cac))
-   **npm2yarn2pnpm:** Ensure compatibility with docusaurus v2 beta 20 ([8aff911](https://github.com/sapphiredev/documentation-plugins/commit/8aff911be521423b465a547bb9bed9b24531533e))

## 🚀 Features

-   Allow module: NodeNext ([8221bc2](https://github.com/sapphiredev/documentation-plugins/commit/8221bc2668fd1ad9c2e80c3c6a1503ae27bfc632))

## [1.0.3](https://github.com/sapphiredev/documentation-plugins/compare/@sapphire/docusaurus-plugin-npm2yarn2pnpm@1.0.2...@sapphire/docusaurus-plugin-npm2yarn2pnpm@1.0.3) (2022-01-13)

### Bug Fixes

-   **npm2yarn2pnpm:** cleanup dependencies ([fe52cac](https://github.com/sapphiredev/documentation-plugins/commit/fe52cacfc0fd28a0de49464aa63029eea35d7ddf))

## [1.0.2](https://github.com/sapphiredev/documentation-plugins/compare/@sapphire/docusaurus-plugin-npm2yarn2pnpm@1.0.1...@sapphire/docusaurus-plugin-npm2yarn2pnpm@1.0.2) (2022-01-12)

### Reverts

-   Revert "ci: try adding extra dev deps for ci" ([de49260](https://github.com/sapphiredev/documentation-plugins/commit/de49260d4d8c4be4bb27d53f13472946e4cd3700))

## [1.0.1](https://github.com/sapphiredev/documentation-plugins/compare/@sapphire/docusaurus-plugin-npm2yarn2pnpm@1.0.0...@sapphire/docusaurus-plugin-npm2yarn2pnpm@1.0.1) (2021-11-30)

**Note:** Version bump only for package @sapphire/docusaurus-plugin-npm2yarn2pnpm

# 1.0.0 (2021-11-26)

### Bug Fixes

-   **npm2yarn2pnpm:** also export npm2pnpm ([92711c8](https://github.com/sapphiredev/documentation-plugins/commit/92711c864f467b1834f63c3d9e1434c69f0305bb))
-   **npm2yarn2pnpm:** removed esm exports to ensure cjs works fine with require syntax ([2e75537](https://github.com/sapphiredev/documentation-plugins/commit/2e75537a99d0614f55c4e3c8c963d0a37cf02768))
-   **npm2yarn2pnpm:** removed exports field from package.json ([e2b11bc](https://github.com/sapphiredev/documentation-plugins/commit/e2b11bca172c85c415237de0a88dc095a61fbe39))

### Features

-   add npm2yarn2pnpm package ([a12527e](https://github.com/sapphiredev/documentation-plugins/commit/a12527eab37e7c0064174c3066939973ddce3740))

### Reverts

-   Revert "fix(typedoc-djs-links): removed esm exports to ensure cjs works fine with require syntax" ([7b4c6ab](https://github.com/sapphiredev/documentation-plugins/commit/7b4c6ab434265903213d7d965b0e927912b1aba1))
