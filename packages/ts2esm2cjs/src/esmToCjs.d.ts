declare module 'esm-to-cjs' {
	interface RunTransformOptions {
		quote: 'single' | 'double';
	}

	function runTransform(code: string, options: RunTransformOptions): string;

	export { runTransform };
}
