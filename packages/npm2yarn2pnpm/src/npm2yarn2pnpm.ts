import type { Code, Content, Literal } from 'mdast';
import type { Plugin } from 'unified';
import type { Node, Parent } from 'unist';
import visit from 'unist-util-visit';
import { npmToPnpm } from './npm2pnpm';
import { npmToYarn } from './npm2yarn';
import { npmToBun } from './npm2bun';

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
 * @remarks
 * This plugin searches for code blocks within the provided Markdown content and
 * converts them into Tabs, allowing users to switch between NPM, Yarn, and Pnpm examples.
 * Additionally, it can include a Bun option when the `convertToBun` option is set to `true`.
 * If the Tabs component is not already imported, it adds the necessary import statement.
 *
 * @public
 */
const transformNode = (node: Code, options: PluginOptions) => {
	const groupIdProp = options.sync ? ' groupId="npm2yarn2pnpm"' : '';
	const npmCode = node.value;

	const yarnCode = npmToYarn(node.value);
	const pnpmCode = npmToPnpm(node.value);
	const bunCode = options.convertToBun ? npmToBun(node.value) : '';

	const [, highlight] = (node.meta ?? '').split('|');

	return [
		{
			type: 'jsx',
			value: `<Tabs${groupIdProp}
						defaultValue="npm"
						values={[
							{ label: "npm", value: "npm" },
							{ label: "yarn", value: "yarn" },
							{ label: "pnpm", value: "pnpm" },
							${options.convertToBun && '{ label: "bun", value: "bun" }'}
						]}
			>\n<TabItem value="npm">`
		},
		{
			type: node.type,
			lang: node.lang,
			meta: `${highlight} showLineNumbers`,
			value: npmCode
		},
		{
			type: 'jsx',
			value: '</TabItem>\n<TabItem value="yarn" label="Yarn">'
		},
		{
			type: node.type,
			lang: node.lang,
			meta: `${highlight} showLineNumbers`,
			value: yarnCode
		},
		{
			type: 'jsx',
			value: '</TabItem>\n<TabItem value="pnpm">'
		},
		{
			type: node.type,
			lang: node.lang,
			meta: `${highlight} showLineNumbers`,
			value: pnpmCode
		},
		{
			type: 'jsx',
			value: '</TabItem>\n</Tabs>'
		},
		options.convertToBun && {
			type: node.type,
			lang: node.lang,
			meta: `${highlight} showLineNumbers`,
			value: bunCode
		},
		options.convertToBun && {
			type: 'jsx',
			value: '</TabItem>\n</Tabs>'
		}
	] as Content[];
};

const isImport = (node: Node): node is Literal => node.type === 'import';
const isParent = (node: Node): node is Parent => Array.isArray((node as Parent).children);
const matchNode = (node: Node): node is Code =>
	node.type === 'code' && typeof (node as Code).meta === 'string' && ((node as Code).meta ?? '').startsWith('npm2yarn2pnpm');
const nodeForImport: Literal = {
	type: 'import',
	value: "import Tabs from '@theme/Tabs';\nimport TabItem from '@theme/TabItem';"
};

export interface PluginOptions {
	sync?: boolean;
	convertToBun?: boolean;
}

export const npm2yarn2pnpm: Plugin<[PluginOptions?]> =
	({ sync = true, convertToBun = false } = { sync: true, convertToBun: false }) =>
	(root) => {
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
			(root as Parent).children.unshift(nodeForImport);
		}
	};
