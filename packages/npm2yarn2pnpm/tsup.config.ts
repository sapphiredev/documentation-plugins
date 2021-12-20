import { defineConfig } from 'tsup';

export default defineConfig({
	clean: true,
	dts: false,
	entryPoints: ['src/index.ts'],
	format: ['esm', 'cjs'],
	minify: false,
	skipNodeModulesBundle: true,
	sourcemap: true,
	target: 'es2021'
});
