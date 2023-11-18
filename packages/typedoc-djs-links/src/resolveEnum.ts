const baseLink = 'https://discord.js.org/docs/packages/discord.js/main/{{ENUM_NAME}}:Enum';

const knownEnums = new Set([
	'DiscordjsErrorCodes', //
	'Events',
	'Partials',
	'ShardEvents',
	'Status',
	'WebSocketShardEvents'
]);

export function resolveEnums(name: string): string | undefined {
	if (knownEnums.has(name)) {
		return baseLink.replace('{{ENUM_NAME}}', name);
	}

	return undefined;
}
