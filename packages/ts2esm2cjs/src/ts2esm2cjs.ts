import sapphirePrettierConfig from '@sapphire/prettier-config';
import { runTransform } from 'esm-to-cjs';
import prettier, { Options } from 'prettier';
import ts, { CompilerOptions } from 'typescript';
import type { PluginOptions } from './types';

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

const documentationPrettierConfig: Options = {
	...sapphirePrettierConfig,
	tabWidth: 2,
	useTabs: false,
	printWidth: 120,
	parser: 'babel'
};

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
 * Transpiles input TypeScript code to ESM code.
 * @param code The code to transpile
 * @returns Input code transpiled to ESM
 */
const tsToEsm = (code: string, options: Pick<PluginOptions, 'typescriptCompilerOptions'>): ts.TranspileOutput =>
	ts.transpileModule(code, { reportDiagnostics: false, compilerOptions: makeTsCompilerOptions(options.typescriptCompilerOptions) });

/**
 * Transforms input TypeScript code to ESM code.
 * @param input The TypeScript code to transform
 * @param options The plugin options
 * @returns The transformed code (ESM)
 */
export function ts2esm(input: string, options: PluginOptions) {
	const tsCode = escapeNewLines(input);
	const esmCode = tsToEsm(tsCode, { typescriptCompilerOptions: options.typescriptCompilerOptions }).outputText;

	return prettierFormatCode(restoreNewLines(esmCode), options.prettierOptions);
}

export function esm2cjs(input: string, options: PluginOptions) {
	const cjsCode = esmToCjs(input);

	return prettierFormatCode(restoreNewLines(cjsCode), options.prettierOptions);
}
