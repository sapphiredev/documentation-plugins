const baseLink = 'https://discord.js.org/docs/packages/discord.js/main/{{VARIABLE_NAME}}:Variable';

const knownVariables = new Set([
	'Colors', //
	'Constants',
	'version'
]);

export function resolveVariables(name: string): string | undefined {
	if (knownVariables.has(name)) {
		return baseLink.replace('{{VARIABLE_NAME}}', name);
	}

	return undefined;
}
