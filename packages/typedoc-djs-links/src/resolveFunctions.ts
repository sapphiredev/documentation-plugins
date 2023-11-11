const baseLink = 'https://discord.js.org/docs/packages/discord.js/main/{{FUNCTION_NAME}}:Function';

const knownFunctions = new Set([
	'basename',
	'cleanCodeBlockContent',
	'cleanContent',
	'createChannel',
	'createComponent',
	'createComponentBuilder',
	'DiscordjsErrorMixin',
	'discordSort',
	'fetchRecommendedShardCount',
	'flatten',
	'makeError',
	'makePlainError',
	'mergeDefault',
	'moveElementInArray',
	'parseEmoji',
	'parseWebhookURL',
	'PartialTextBasedChannel',
	'PartialWebhookMixin',
	'resolveColor',
	'resolvePartialEmoji',
	'setPosition',
	'TextBasedChannelMixin',
	'verifyString',
	'WebhookMixin'
]);

export function resolveFunctions(name: string): string | undefined {
	if (knownFunctions.has(name)) {
		return baseLink.replace('{{FUNCTION_NAME}}', name);
	}

	return undefined;
}
