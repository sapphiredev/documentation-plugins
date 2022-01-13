import sapphirePrettierConfig from '@sapphire/prettier-config';
import { runTransform } from 'esm-to-cjs';
import prettier, { Options } from 'prettier';
import ts, { CompilerOptions } from 'typescript';

const documentationPrettierConfig: Options = {
	...sapphirePrettierConfig,
	tabWidth: 2,
	useTabs: false,
	printWidth: 120,
	parser: 'babel'
};

const makeTsCompilerOptions = (overrideOptions?: CompilerOptions): CompilerOptions => ({
	newLine: ts.NewLineKind.LineFeed,
	removeComments: false,
	esModuleInterop: true,
	pretty: true,
	...overrideOptions,
	module: ts.ModuleKind.ESNext,
	moduleResolution: ts.ModuleResolutionKind.NodeJs,
	target: ts.ScriptTarget.ESNext
});

/**
 * Transpiles input TypeScript code to ESM code.
 * @param code The code to transpile
 * @returns Input code transpiled to ESM
 */
const tsToEsm = (code: string, options: Pick<PluginOptions, 'typescriptCompilerOptions'>): ts.TranspileOutput =>
	ts.transpileModule(code, { reportDiagnostics: false, compilerOptions: makeTsCompilerOptions(options.typescriptCompilerOptions) });

/**
 * Transforms input ESM code to CJS code.
 * @param code The code to transform
 * @returns Input code transformed to CommonJS
 */
const esmToCjs = (code: string): string => runTransform(code, { quote: 'single', lenDestructure: 128, lenModuleName: 128, lenIdentifier: 128 });

/**
 * Escaped new lines in code with block comments so they can be restored by {@link restoreNewLines}
 * @param code The code to escape new lines in
 * @returns The same code but with new lines escaped using block comments
 */
const escapeNewLines = (code: string) => code.replace(/\n\n/g, '\n/* :newline: */');

/**
 * Reverses {@link escapeNewLines} and restores new lines
 * @param code The code with escaped new lines
 * @returns The same code with new lines restored
 */
const restoreNewLines = (code: string): string => code.replace(/\/\* :newline: \*\//g, '\n');

/**
 * Formats the code using Prettier
 * @param code The code to prettier format
 * @param prettierConfig Additional prettier options to use for formatting
 * @returns Prettier formatted code
 */
const prettierFormatCode = (code: string, prettierConfig?: Options) =>
	prettier.format(code, { ...documentationPrettierConfig, ...prettierConfig }).slice(0, -1);

/**
 * Transforms a Docusaurus node from TypeScript to ESM and CJS
 * @param node The Docusaurus node to transform
 * @param isSync Whether the transform should synchronize between all entries of this type
 * @returns The transformed node in the form of Tabs.
 */
const transformNode = (node: any, options: PluginOptions) => {
	const groupIdProp = options.sync ? 'groupId="ts2esm2cjs" ' : '';

	const tsCode = escapeNewLines(node.value);
	const esmCode = tsToEsm(tsCode, { typescriptCompilerOptions: options.typescriptCompilerOptions }).outputText;
	const cjsCode = esmToCjs(esmCode);

	const [, jsHighlight, tsHighlight] = node.meta.split('|');

	return [
		{
			type: 'jsx',
			value:
				`<Tabs defaultValue="typescript" ${groupIdProp}` +
				`values={[
    { label: 'JavaScript', value: 'javascript', },
    { label: 'ESM', value: 'esm', },
    { label: 'TypeScript', value: 'typescript', },
  ]}
>
<TabItem value="javascript">`
		},
		{
			type: node.type,
			lang: node.lang,
			meta: jsHighlight,
			value: prettierFormatCode(restoreNewLines(cjsCode), options.prettierOptions)
		},
		{
			type: 'jsx',
			value: '</TabItem>\n<TabItem value="esm">'
		},
		{
			type: node.type,
			lang: node.lang,
			meta: jsHighlight,
			value: prettierFormatCode(restoreNewLines(esmCode), options.prettierOptions)
		},
		{
			type: 'jsx',
			value: '</TabItem>\n<TabItem value="typescript">'
		},
		{
			type: node.type,
			lang: node.lang,
			meta: tsHighlight,
			value: node.value
		},
		{
			type: 'jsx',
			value: '</TabItem>\n</Tabs>'
		}
	];
};

const matchNode = (node: any) => node.type === 'code' && typeof node.meta === 'string' && node.meta.startsWith('ts2esm2cjs');
const nodeForImport = {
	type: 'import',
	value: "import Tabs from '@theme/Tabs';\nimport TabItem from '@theme/TabItem';"
};

export interface PluginOptions {
	sync?: boolean;
	prettierOptions?: Options;
	typescriptCompilerOptions?: CompilerOptions;
}

export function ts2esm2cjs(
	{ sync = true, prettierOptions = {}, typescriptCompilerOptions = {} }: PluginOptions = {
		sync: true,
		prettierOptions: {},
		typescriptCompilerOptions: {}
	}
) {
	let transformed = false;
	let alreadyImported = false;

	const transformer = (node: any) => {
		if (node.type === 'import' && node.value.includes('@theme/Tabs')) {
			alreadyImported = true;
		}

		if (matchNode(node)) {
			transformed = true;
			return transformNode(node, { sync, prettierOptions, typescriptCompilerOptions });
		}

		if (Array.isArray(node.children)) {
			let index = 0;
			while (index < node.children.length) {
				const result = transformer(node.children[index]);
				if (result) {
					node.children.splice(index, 1, ...result);
					index += result.length;
				} else {
					index += 1;
				}
			}
		}

		if (node.type === 'root' && transformed && !alreadyImported) {
			node.children.unshift(nodeForImport);
		}

		return null;
	};

	return transformer;
}
