import type { Code, Literal, RootContent } from 'mdast';
import type { MdxJsxAttribute, MdxJsxFlowElement } from 'mdast-util-mdx';
import type { Plugin, Transformer } from 'unified';
import type { Node, Parent } from 'unist';
import { esm2cjs, ts2esm } from './ts2esm2cjs';
import type { PluginOptions } from './types';

export { esm2cjs, ts2esm } from './ts2esm2cjs';
export type { PluginOptions } from './types';

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
	value: 'cjs' | 'esm' | 'typescript';
	label: string;
}

function createTabItem({ code, node, value, label }: CreateTabItemOptions): MdxJsxFlowElement {
	let [, jsHighlight, tsHighlight] = (node.meta ?? '').split('|');

	if (!tsHighlight && jsHighlight) {
		tsHighlight = jsHighlight;
	}

	return {
		type: 'mdxJsxFlowElement',
		name: 'TabItem',
		attributes: [createAttribute('value', value), createAttribute('label', label)],
		children: [
			{
				type: node.type,
				lang: node.lang,
				value: code,
				meta: value === 'typescript' ? `${tsHighlight} showLineNumbers` : `${jsHighlight} showLineNumbers`
			}
		]
	};
}

/**
 * Transforms a Docusaurus node from TypeScript to ESM and CJS
 * @param node The Docusaurus node to transform
 * @param options The plugin options to pass to the transformer
 * @returns The transformed node in the form of Tabs.
 */
const transformNode = (node: Code, options: PluginOptions) => {
	const groupIdProp = {
		type: 'mdxJsxAttribute',
		name: 'groupId',
		value: 'ts2esm2cjs'
	};

	const esmCode = ts2esm(node.value, options);
	const cjsCode = esm2cjs(esmCode, options);

	return [
		{
			type: 'mdxJsxFlowElement',
			name: 'Tabs',
			...(options.sync && {
				attributes: [groupIdProp]
			}),
			children: [
				createTabItem({
					code: cjsCode,
					node,
					value: 'cjs',
					label: 'CommonJS'
				}),
				createTabItem({
					code: esmCode,
					node,
					value: 'esm',
					label: 'ESM'
				}),
				createTabItem({
					code: node.value,
					node,
					value: 'typescript',
					label: 'TypeScript'
				})
			]
		}
	] as RootContent[];
};

const isMdxEsmLiteral = (node: Node): node is Literal => node.type === 'mdxjsEsm';
const isTabsImport = (node: Node): boolean => isMdxEsmLiteral(node) && node.value.includes('@theme/Tabs');
const isParent = (node: Node): node is Parent => Array.isArray((node as Parent).children);
const matchNode = (node: Node): node is Code =>
	node.type === 'code' && typeof (node as Code).meta === 'string' && ((node as Code).meta ?? '').startsWith('ts2esm2cjs');

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

export const ts2esm2cjs: Plugin<[PluginOptions?]> =
	(
		{ sync = true, prettierOptions = {}, typescriptCompilerOptions = {} } = { sync: true, prettierOptions: {}, typescriptCompilerOptions: {} }
	): Transformer =>
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
						const result = transformNode(child, { sync, prettierOptions, typescriptCompilerOptions });
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
