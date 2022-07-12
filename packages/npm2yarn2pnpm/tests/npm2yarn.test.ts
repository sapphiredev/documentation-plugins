import { convertToYarn } from '@armano/npm-to-yarn';

describe('npm2yarn', () => {
	const commandPairs: [npm: string, yarn: string][] = [
		['npm install pkg', 'yarn add pkg'],
		['npm install pkg --save-dev', 'yarn add pkg --dev'],
		['npm install pkg --save', 'yarn add pkg'],
		// TODO - when https://github.com/armano2/npm-to-yarn/issues/7
		// is fixed we can remove the yarn patch and this should still pass
		['npm install pkg --save-exact', 'yarn add pkg --exact'],
		['npm install pkg --global', 'yarn global add pkg'],
		['npm install pkg --ignore-scripts', 'yarn add pkg --ignore-scripts']
	];

	test.each(commandPairs)('GIVEN %s THEN transforms to %s', (npmCommand, yarnCommand) => {
		expect(convertToYarn(npmCommand)).toEqual(yarnCommand);
	});
});
