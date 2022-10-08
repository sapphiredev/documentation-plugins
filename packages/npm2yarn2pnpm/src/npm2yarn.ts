/**
 * Copyright (c) 2019 Ben Gubler <nebrelbug@gmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const unchangedCLICommands = ['test', 'login', 'logout', 'link', 'publish', 'cache'];
export const yarnCLICommands = [
	'init',
	'run',
	'add',
	'audit',
	'autoclean',
	'bin',
	'check',
	'config',
	'create',
	'dedupe',
	'generate-lock-entry',
	'global',
	'help',
	'import',
	'info',
	'install',
	'licenses',
	'list',
	'lockfile',
	'outdated',
	'owner',
	'pack',
	'policies',
	'prune',
	'remove',
	'self-update',
	'tag',
	'team',
	'link',
	'unlink',
	'upgrade',
	'upgrade-interactive',
	'version',
	'versions',
	'why',
	'workspace',
	'workspaces'
];

function parseNpmInstall(command: string, isShortHand = false) {
	if (/^install *$/.test(command)) {
		return 'install';
	}

	let yarnAddCommand = command
		.replace(isShortHand ? 'i ' : 'install ', 'add ')
		.replace('--save-dev', '--dev')
		.replace(/\s*--save(?!-)/, '')
		.replace('--no-package-lock', '--no-lockfile')
		.replace('--save-optional', '--optional')
		.replace('--save-exact', '--exact');

	if (/ -(?:-global|g)(?![^\b])/.test(yarnAddCommand)) {
		yarnAddCommand = yarnAddCommand.replace(/ -(?:-global|g)(?![^\b])/, '');
		yarnAddCommand = `global ${yarnAddCommand}`;
	}

	return yarnAddCommand;
}

const npmToYarnTable = {
	install(command: string) {
		return parseNpmInstall(command);
	},

	i(command: string) {
		return parseNpmInstall(command, true);
	},

	uninstall(command: string) {
		let yarnRemoveCommand = command
			.replace('uninstall', 'remove')
			.replace('--save-dev', '--dev')
			.replace(/\s*--save(?!-)/, '')
			.replace('--no-package-lock', '--no-lockfile');

		if (/ -(?:-global|g)(?![^\b])/.test(yarnRemoveCommand)) {
			yarnRemoveCommand = yarnRemoveCommand.replace(/ -(?:-global|g)(?![^\b])/, '');
			yarnRemoveCommand = `global ${yarnRemoveCommand}`;
		}

		return yarnRemoveCommand;
	},

	rebuild(command: string) {
		return command.replace('rebuild', 'add --force');
	},

	exec(command: string) {
		return command.replace(/^exec\s?([^\s]+)?(\s--\s--)?(.*)$/, (_, data?: string, dash?: string, rest?: string): string => {
			let result = '';

			if (data && !unchangedCLICommands.includes(data) && !yarnCLICommands.includes(data)) {
				result += data;
			} else {
				result += `run ${data || ''}`;
			}

			if (dash) {
				result += dash.replace(/^\s--/, '');
			}

			if (rest) {
				result += rest;
			}

			return result;
		});
	},

	run(command: string) {
		return command.replace(/^run\s?([^\s]+)?(\s--\s--)?(.*)$/, (_, data?: string, dash?: string, rest?: string): string => {
			let result = '';

			if (data && !unchangedCLICommands.includes(data) && !yarnCLICommands.includes(data)) {
				result += data;
			} else {
				result += `run ${data || ''}`;
			}

			if (dash) {
				result += dash.replace(/^\s--/, '');
			}

			if (rest) {
				result += rest;
			}

			return result;
		});
	},

	ls(command: string) {
		return command.replace(/^(ls|list)(.*)$/, (_1, _2: string, args: string): string => {
			let result = 'list';

			if (args) {
				let ended = false;
				let packages = [];
				const items = args.split(' ').filter(Boolean);

				for (const item of items) {
					if (ended) {
						result += ` ${item}`;
					} else if (item.startsWith('-')) {
						result += ` --pattern "${packages.join('|')}"`;
						packages = [];
						ended = true;
						result += ` ${item}`;
					} else {
						packages.push(item);
					}
				}

				if (packages.length > 0) {
					result += ` --pattern "${packages.join('|')}"`;
				}

				return result;
			}

			return 'list';
		});
	},

	list(command: string) {
		return npmToYarnTable.ls(command);
	},

	init(command: string) {
		if (/^init (?!-).*$/.test(command)) {
			return command.replace('init', 'create');
		}

		return command.replace(' --scope', '');
	}
} as const;

function convert(_: string, command: string) {
	command = (command || '').trim();
	const firstCommand = (/\w+/.exec(command) || [''])[0];

	if (unchangedCLICommands.includes(firstCommand)) {
		return `yarn ${command}`;
	}

	if (firstCommand in npmToYarnTable) {
		const converter = npmToYarnTable[firstCommand as keyof typeof npmToYarnTable];

		if (typeof converter === 'function') {
			return `yarn ${converter(command)}`;
		}

		return `yarn ${command.replace(firstCommand, converter)}`;
	}

	return `yarn ${command}\n# couldn't auto-convert command`;
}

export function npmToYarn(str: string) {
	return str.replace(/npm(?: +([^&\n\r]*))?/gm, convert);
}
