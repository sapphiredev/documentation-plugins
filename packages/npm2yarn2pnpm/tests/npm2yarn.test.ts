import { npmToYarn } from '../src/npm2yarn';

describe('npm2yarn', () => {
	const commandPairs: [npm: string, yarn: string][] = [
		['npm i pkg', 'yarn add pkg'],
		['npm install pkg', 'yarn add pkg'],
		['npm install pkg --save-dev', 'yarn add pkg --dev'],
		['npm install pkg --save', 'yarn add pkg'],
		['npm install pkg --save-exact', 'yarn add pkg --exact'],
		['npm install pkg --global', 'yarn global add pkg'],
		['npm install pkg --ignore-scripts', 'yarn add pkg --ignore-scripts']
	];

	test.each(commandPairs)('GIVEN %s THEN transforms to %s', (npmCommand, yarnCommand) => {
		expect(npmToYarn(npmCommand)).toEqual(yarnCommand);
	});
});
