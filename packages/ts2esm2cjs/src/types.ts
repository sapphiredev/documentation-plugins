import type { Options as PrettierOptions } from 'prettier';
import type { CompilerOptions as TypeScriptCompilerOptions } from 'typescript';

export interface PluginOptions {
	sync?: boolean;
	prettierOptions?: PrettierOptions;
	typescriptCompilerOptions?: TypeScriptCompilerOptions;
}
