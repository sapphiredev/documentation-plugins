interface RunTransformOptions {
	quote?: 'single' | 'double';
	lenDestructure?: number;
	lenModuleName?: number;
	lenIdentifier?: number;
	indent?: number;
}

export function runTransform(code: string, options: RunTransformOptions): string;
