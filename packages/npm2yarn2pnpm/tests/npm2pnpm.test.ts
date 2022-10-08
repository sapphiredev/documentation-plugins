import { npmToPnpm } from '../src/npm2pnpm';

describe('npm2pnpm', () => {
	const commandPairs: [npm: string, pnpm: string][] = [
		['npm i pkg', 'pnpm add pkg'],
		['npm install pkg', 'pnpm add pkg'],
		['npm install pkg --save-dev', 'pnpm add pkg --save-dev'],
		['npm install pkg --save', 'pnpm add pkg --save-prod'],
		['npm install pkg --save-exact', 'pnpm add pkg --save-exact'],
		['npm install pkg --global', 'pnpm add pkg --global'],
		['npm install pkg --ignore-scripts', 'pnpm add pkg --ignore-scripts']
	];

	test.each(commandPairs)('GIVEN %s THEN transforms to %s', (npmCommand, pnpmCommand) => {
		expect(npmToPnpm(npmCommand)).toEqual(pnpmCommand);
	});
});
