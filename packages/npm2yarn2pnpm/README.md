<div align="center">

![Sapphire Logo](https://cdn.skyra.pw/gh-assets/sapphire-banner.png)

# @sapphire/docusaurus-plugin-npm2yarn2pnpm

**Docusaurus Remark plugin for converting NPM Commands to Yarn and Pnpm.**

[![GitHub](https://img.shields.io/github/license/sapphiredev/documentation-plugins)](https://github.com/sapphiredev/documentation-plugins/blob/main/LICENSE.md)
[![npm](https://img.shields.io/npm/v/@sapphire/docusaurus-plugin-npm2yarn2pnpm?color=crimson&logo=npm&style=flat-square)](https://www.npmjs.com/package/@sapphire/docusaurus-plugin-npm2yarn2pnpm)

</div>

## Description

This is a plugin for [Docusaurus](https://docusaurus.io) that adds support for a `npm2yarn2pnpm` meta tag for code
blocks. It will transform your NPM Command into the equivalents for Yarn and Pnpm. It will then give you a component
using `Tabs` where users can select their preferred package manager. By default this will sync across all code blocks
that use this meta tag, you can disable that through the plugin options.

It should be noted that this plugin is essentially a super set of [Docusaurus npm2yarn remark
plugin][docusaurus-npm2yarn-remark-plugin]. If you're using @sapphire/docusaurus-plugin-npm2yarn2pnpm plugin, you won't
need to use [Docusaurus npm2yarn remark plugin][docusaurus-npm2yarn-remark-plugin].

## Usage

In your `docusaurus.config.js`, for the plugins where you need this feature (doc, blog, pages, etc.), register it in the
`remarkPlugins` option. (See [Docs configuration][docconf] for more details on configuration format)

```js
// docusaurus.config.js
module.exports = {
  // ...
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          remarkPlugins: [[require('@sapphire/docusaurus-plugin-npm2yarn2pnpm')]]
        },
        pages: {
          remarkPlugins: [require('@sapphire/docusaurus-plugin-npm2yarn2pnpm')]
        },
        blog: {
          // ...
        }
      }
    ]
  ]
};
```

And then use it by adding the `npm2yarn2pnpm` key to the code block:

**meta**: `_bash npm2yarn2pnpm_`

```bash
npm i @sapphire/docusaurus-plugin-npm2yarn2pnpm
```

### Line Highlighting

As you may be aware, Docusaurus supports [Line Highlighting][line-highlighting] for code blocks. As line highlighting
relies on meta just like this plugin would, we would normally run into a bit of a conflict as to what to set in the meta
tag. To solve this issue this plugin supports a unique syntax of setting the meta tag. You can configure the line
highlighting by adding a `|` character after the plugin meta tag.

For example consider the following code block:

**meta:** `_bash npm2yarn2pnpm|{1}_ `

```bash
npm i @sapphire/docusaurus-plugin-npm2yarn2pnpm
npm i @sapphire/docusaurus-plugin-ts2esm2cjs
```

This will give you a three code blocks in a `Tabs` layout with the first line being highlighted.

## Buy us some doughnuts

Sapphire Community is and always will be open source, even if we don't get donations. That being said, we know there are
amazing people who may still want to donate just to show their appreciation. Thank you very much in advance!

We accept donations through Open Collective, Ko-fi, Paypal, Patreon and GitHub Sponsorships. You can use the buttons
below to donate through your method of choice.

|   Donate With   |                       Address                       |
| :-------------: | :-------------------------------------------------: |
| Open Collective | [Click Here](https://sapphirejs.dev/opencollective) |
|      Ko-fi      |      [Click Here](https://sapphirejs.dev/kofi)      |
|     Patreon     |    [Click Here](https://sapphirejs.dev/patreon)     |
|     PayPal      |     [Click Here](https://sapphirejs.dev/paypal)     |

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://favware.tech/"><img src="https://avatars3.githubusercontent.com/u/4019718?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jeroen Claassens</b></sub></a><br /><a href="https://github.com/sapphiredev/documentation-plugins/commits?author=favna" title="Code">💻</a> <a href="#infra-favna" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#projectManagement-favna" title="Project Management">📆</a></td>
    <td align="center"><a href="https://github.com/apps/renovate"><img src="https://avatars.githubusercontent.com/in/2740?v=4?s=100" width="100px;" alt=""/><br /><sub><b>renovate[bot]</b></sub></a><br /><a href="#maintenance-renovate[bot]" title="Maintenance">🚧</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification.
Contributions of any kind welcome!

[docconf]: https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs#ex-config
[docusaurus-npm2yarn-remark-plugin]: https://docusaurus.io/docs/markdown-features/code-blocks#npm2yarn-remark-plugin
[line-highlighting]: https://docusaurus.io/docs/markdown-features/code-blocks#line-highlighting
