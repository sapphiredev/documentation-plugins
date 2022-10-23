import { readFile } from 'node:fs/promises';
import { esm2cjs, ts2esm } from '../../src/ts2esm2cjs';
import { resolve } from 'node:path';

describe('argument', async () => {
	const inputCode = await readFile(resolve(__dirname, '../fixtures/argument.ts'), { encoding: 'utf-8' });

	test('GIVEN argument fixture THEN outputs valid ESM and CJS code', () => {
		const esmCode = ts2esm(inputCode, {});
		const cjsCode = esm2cjs(esmCode, {});

		expect(esmCode).toMatchSnapshot();
		expect(cjsCode).toMatchSnapshot();
	});
});
