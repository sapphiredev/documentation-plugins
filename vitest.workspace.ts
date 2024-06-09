import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
	'./packages/npm2yarn2pnpm/vitest.config.ts',
	'./packages/typedoc-djs-links/vitest.config.ts',
	'./packages/ts2esm2cjs/vitest.config.ts'
]);
