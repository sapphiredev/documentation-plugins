import type { Code, Content, Literal } from 'mdast';
import type { Plugin } from 'unified';
import type { Node, Parent } from 'unist';
import visit from 'unist-util-visit';
import { esm2cjs, ts2esm } from './ts2esm2cjs';
import type { PluginOptions } from './types';

export { esm2cjs, ts2esm } from './ts2esm2cjs';
export { PluginOptions } from './types';

/**
 * Transforms a Docusaurus node from TypeScript to ESM and CJS
 * @param node The Docusaurus node to transform
 * @param options The plugin options to pass to the transformer
 * @returns The transformed node in the form of Tabs.
 */
const transformNode = (node: Code, options: PluginOptions) => {
	const groupIdProp = options.sync ? ' groupId="ts2esm2cjs"' : '';

	const esmCode = ts2esm(node.value, options);
	const cjsCode = esm2cjs(esmCode, options);

	let [, jsHighlight, tsHighlight] = (node.meta ?? '').split('|');

	if (!tsHighlight && jsHighlight) {
		tsHighlight = jsHighlight;
	}

	return [
		{
			type: 'jsx',
			value: `<Tabs${groupIdProp}
						defaultValue="typescript"
						values={[
							{ label: "JavaScript", value: "javascript" },
							{ label: "ESM", value: "esm" },
							{ label: "TypeScript", value: "typescript" },
						]}
			>\n<TabItem value="javascript">`
		},
		{
			type: node.type,
			lang: node.lang,
			meta: `${jsHighlight} showLineNumbers`,
			value: cjsCode
		},
		{
			type: 'jsx',
			value: '</TabItem>\n<TabItem value="esm">'
		},
		{
			type: node.type,
			lang: node.lang,
			meta: `${jsHighlight} showLineNumbers`,
			value: esmCode
		},
		{
			type: 'jsx',
			value: '</TabItem>\n<TabItem value="typescript">'
		},
		{
			type: node.type,
			lang: node.lang,
			meta: `${tsHighlight} showLineNumbers`,
			value: node.value
		},
		{
			type: 'jsx',
			value: '</TabItem>\n</Tabs>'
		}
	] as Content[];
};

const isImport = (node: Node): node is Literal => node.type === 'import';
const isParent = (node: Node): node is Parent => Array.isArray((node as Parent).children);
const matchNode = (node: Node): node is Code =>
	node.type === 'code' && typeof (node as Code).meta === 'string' && ((node as Code).meta ?? '').startsWith('ts2esm2cjs');
const nodeForImport: Literal = {
	type: 'import',
	value: "import Tabs from '@theme/Tabs';\nimport TabItem from '@theme/TabItem';"
};

export const ts2esm2cjs: Plugin<[PluginOptions?]> = (
	{ sync = true, prettierOptions = {}, typescriptCompilerOptions = {} } = { sync: true, prettierOptions: {}, typescriptCompilerOptions: {} }
) => {
	return (root) => {
		let transformed = false;
		let alreadyImported = false;
		visit(root, (node: Node) => {
			if (isImport(node) && node.value.includes('@theme/Tabs')) {
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
			(root as Parent).children.unshift(nodeForImport);
		}
	};
};
