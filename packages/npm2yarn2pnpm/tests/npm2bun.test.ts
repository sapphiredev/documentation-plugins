import { npmToBun } from '../src/npm2bun';

describe('npm2bun', () => {
	const commandPairs: [npm: string, bun: string][] = [
		['npm i pkg', 'bun add pkg'],
		['npm install pkg', 'bun add pkg'],
		['npm install pkg --save-dev', 'bun add pkg --save-dev'],
		['npm install pkg --save', 'bun add pkg --save-prod'],
		['npm install pkg --save-exact', 'bun add pkg --save-exact'],
		['npm install pkg --global', 'bun add pkg --global'],
		['npm install pkg --ignore-scripts', 'bun add pkg --ignore-scripts']
	];

	test.each(commandPairs)('GIVEN %s THEN transforms to %s', (npmCommand, pnpmCommand) => {
		expect(npmToBun(npmCommand)).toEqual(pnpmCommand);
	});
});
