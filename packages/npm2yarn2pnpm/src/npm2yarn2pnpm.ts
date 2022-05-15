import type { Code, Content, Literal } from 'mdast';
import npmToYarn from 'npm-to-yarn';
import type { Plugin } from 'unified';
import type { Node, Parent } from 'unist';
import visit from 'unist-util-visit';
import { npmToPnpm } from './npm2pnpm';

const transformNode = (node: any, options: PluginOptions) => {
	const groupIdProp = options.sync ? 'groupId="npm2yarn2pnpm" ' : '';
	const npmCode = node.value;

	const yarnCode = npmToYarn(node.value, 'yarn');
	const pnpmCode = npmToPnpm(node.value);

	const [, highlight] = node.meta.split('|');

	return [
		{
			type: 'jsx',
			value:
				`<Tabs defaultValue="npm" ${groupIdProp}` +
				`values={[
    { label: 'npm', value: 'npm', },
    { label: 'yarn', value: 'yarn', },
    { label: 'pnpm', value: 'pnpm', },
  ]}
>
<TabItem value="npm">`
		},
		{
			type: node.type,
			lang: node.lang,
			meta: `${highlight} showLineNumbers`,
			value: npmCode
		},
		{
			type: 'jsx',
			value: '</TabItem>\n<TabItem value="yarn">'
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
		}
	] as Content[];
};

const isImport = (node: Node): node is Literal => node.type === 'import';
const isParent = (node: Node): node is Parent => Array.isArray((node as Parent).children);
const matchNode = (node: Node): node is Node =>
	node.type === 'code' && typeof (node as Code).meta === 'string' && (node as Code).meta!.startsWith('ts2esm2cjs');
const nodeForImport: Literal = {
	type: 'import',
	value: "import Tabs from '@theme/Tabs';\nimport TabItem from '@theme/TabItem';"
};

export interface PluginOptions {
	sync?: boolean;
}

export const npm2yarn2pnpm: Plugin<[PluginOptions?]> =
	({ sync = true }: PluginOptions = { sync: true }) =>
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
						const result = transformNode(child, { sync });
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
