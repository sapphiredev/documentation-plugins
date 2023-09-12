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

const npmToBunTable = {
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

	const firstCommand = (/\w+/.exec(command) || [''])[0] as keyof typeof npmToBunTable;

	if (unchangedCLICommands.includes(firstCommand)) {
		return `Bun ${command}`;
	} else if (Object.prototype.hasOwnProperty.call(npmToBunTable, firstCommand) && npmToBunTable[firstCommand]) {
		if (typeof npmToBunTable[firstCommand] === 'function') {
			return `Bun ${npmToBunTable[firstCommand](command)}`;
		}
		return `Bun ${command.replace(firstCommand, npmToBunTable[firstCommand])}`;
	}

	return `Bun ${command}\n# couldn't auto-convert command`;
}

export function npmToBun(str: string) {
	return str.replace(/npm(?: +([^&\n\r]*))?/gm, convert);
}
