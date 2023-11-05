import type { Code, Literal, RootContent } from 'mdast';
import type { MdxJsxAttribute, MdxJsxFlowElement } from 'mdast-util-mdx';
import type { Plugin, Transformer } from 'unified';
import type { Node, Parent } from 'unist';

import { npmToBun } from './npm2bun';
import { npmToPnpm } from './npm2pnpm';
import { npmToYarn } from './npm2yarn';
import type { PluginOptions } from './types';

function createAttribute(attributeName: string, attributeValue: MdxJsxAttribute['value']): MdxJsxAttribute {
	return {
		type: 'mdxJsxAttribute',
		name: attributeName,
		value: attributeValue
	};
}

interface CreateTabItemOptions {
	code: string;
	node: Code;
	value: 'npm' | 'yarn' | 'pnpm' | 'bun';
}

function createTabItem({ code, node, value }: CreateTabItemOptions): MdxJsxFlowElement {
	const [, highlight] = (node.meta ?? '').split('|');

	return {
		type: 'mdxJsxFlowElement',
		name: 'TabItem',
		attributes: [createAttribute('value', value), createAttribute('label', value)],
		children: [
			{
				type: node.type,
				lang: node.lang,
				value: code,
				meta: `${highlight} showLineNumbers`
			}
		]
	};
}

/**
 * A Docusaurus plugin that transforms code blocks from NPM to Yarn, Pnpm, and optionally to Bun.
 *
 * @param options - The plugin options to customize the transformation behavior.
 *   - `sync` (optional): A boolean indicating whether to synchronize code examples (default: `true`).
 *   - `convertToBun` (optional): A boolean indicating whether to include a Bun option (default: `false`).
 *     Set this option to `true` to enable Bun code transformation.
 *
 * @returns A unified plugin function that can be used to transform Docusaurus content.
 *
 * @remarks This plugin searches for code blocks within the provided Markdown content and
 * converts them into Tabs, allowing users to switch between NPM, Yarn, and Pnpm examples.
 * Additionally, it can include a Bun option when the `convertToBun` option is set to `true`.
 * If the Tabs component is not already imported, it adds the necessary import statement.
 */
const transformNode = (node: Code, options: PluginOptions) => {
	const groupIdProp = {
		type: 'mdxJsxAttribute',
		name: 'groupId',
		value: 'npm2yarn2pnpm'
	};

	// const groupIdProp = options.sync ? ' groupId="npm2yarn2pnpm"' : '';
	const npmCode = node.value;

	const yarnCode = npmToYarn(node.value);
	const pnpmCode = npmToPnpm(node.value);
	const bunCode = npmToBun(node.value);

	return [
		{
			type: 'mdxJsxFlowElement',
			name: 'Tabs',
			...(options.sync && {
				attributes: [groupIdProp]
			}),
			children: [
				createTabItem({
					code: npmCode,
					node,
					value: 'npm'
				}),
				createTabItem({
					code: yarnCode,
					node,
					value: 'yarn'
				}),
				createTabItem({
					code: pnpmCode,
					node,
					value: 'pnpm'
				}),
				createTabItem({
					code: bunCode,
					node,
					value: 'bun'
				})
			]
		}
	] as RootContent[];
};

const isMdxEsmLiteral = (node: Node): node is Literal => node.type === 'mdxjsEsm';
const isTabsImport = (node: Node): boolean => isMdxEsmLiteral(node) && node.value.includes('@theme/Tabs');
const isParent = (node: Node): node is Parent => Array.isArray((node as Parent).children);
const matchNode = (node: Node): node is Code =>
	node.type === 'code' && typeof (node as Code).meta === 'string' && ((node as Code).meta ?? '').startsWith('npm2yarn2pnpm');

function createImportNode() {
	return {
		type: 'mdxjsEsm',
		value: "import Tabs from '@theme/Tabs'\nimport TabItem from '@theme/TabItem'",
		data: {
			estree: {
				type: 'Program',
				body: [
					{
						type: 'ImportDeclaration',
						specifiers: [
							{
								type: 'ImportDefaultSpecifier',
								local: { type: 'Identifier', name: 'Tabs' }
							}
						],
						source: {
							type: 'Literal',
							value: '@theme/Tabs',
							raw: "'@theme/Tabs'"
						}
					},
					{
						type: 'ImportDeclaration',
						specifiers: [
							{
								type: 'ImportDefaultSpecifier',
								local: { type: 'Identifier', name: 'TabItem' }
							}
						],
						source: {
							type: 'Literal',
							value: '@theme/TabItem',
							raw: "'@theme/TabItem'"
						}
					}
				],
				sourceType: 'module'
			}
		}
	};
}

export const convertNpmToPackageManagers: Plugin<[PluginOptions?]> =
	({ sync = true, convertToBun = false } = { sync: true, convertToBun: false }): Transformer =>
	async (root) => {
		const { visit } = await import('unist-util-visit');

		let transformed = false;
		let alreadyImported = false;

		visit(root, (node: Node) => {
			if (isTabsImport(node)) {
				alreadyImported = true;
			}

			if (isParent(node)) {
				let index = 0;
				while (index < node.children.length) {
					const child = node.children[index]!;
					if (matchNode(child)) {
						const result = transformNode(child, { sync, convertToBun });
						node.children.splice(index, 1, ...result);
						index += result.length;
						transformed = true;
					} else {
						index += 1;
					}
				}
			}
		});

		if (transformed && !alreadyImported) {
			(root as Parent).children.unshift(createImportNode());
		}
	};
