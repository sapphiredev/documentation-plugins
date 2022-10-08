/**
 * Copyright (c) 2019 Ben Gubler <nebrelbug@gmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const unchangedCLICommands = ['init', 'run', 'test', 'login', 'logout', 'link', 'publish', 'cache'];

function parseNpmInstall(command: string, isShortHand = false) {
	if (/^install *$/.test(command)) {
		return 'install';
	}

	return command
		.replace(isShortHand ? 'i ' : 'install ', 'add ')
		.replace(/(\s*)--save(?!-)/, '$1--save-prod')
		.replace('--no-package-lock', '');
}

const npmToPnpmTable = {
	install(command: string) {
		return parseNpmInstall(command);
	},

	i(command: string) {
		return parseNpmInstall(command, true);
	},

	uninstall(command: string) {
		return command
			.replace('uninstall', 'remove')
			.replace(/(\s*)--save(?!-)/, '$1--save-prod')
			.replace('--no-package-lock', '');
	},

	version(command: string) {
		return command.replace(/(major|minor|patch)/, '--$1');
	},

	rebuild(command: string) {
		return command.replace('rebuild', 'add --force');
	}
} as const;

function convert(_: string, command: string) {
	command = (command ?? '').trim();

	const firstCommand = (/\w+/.exec(command) || [''])[0] as keyof typeof npmToPnpmTable;

	if (unchangedCLICommands.includes(firstCommand)) {
		return `pnpm ${command}`;
	} else if (Object.prototype.hasOwnProperty.call(npmToPnpmTable, firstCommand) && npmToPnpmTable[firstCommand]) {
		if (typeof npmToPnpmTable[firstCommand] === 'function') {
			return `pnpm ${npmToPnpmTable[firstCommand](command)}`;
		}
		return `pnpm ${command.replace(firstCommand, npmToPnpmTable[firstCommand])}`;
	}

	return `pnpm ${command}\n# couldn't auto-convert command`;
}

export function npmToPnpm(str: string) {
	return str.replace(/npm(?: +([^&\n\r]*))?/gm, convert);
}
