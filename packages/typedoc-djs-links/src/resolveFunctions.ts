const baseLink = 'https://discord.js.org/#/docs/discord.js/main/function';

const knownFunctions = new Set([
	'createComponent',
	'createComponentBuilder',
	'chatInputApplicationCommandMention',
	'codeBlock',
	'inlineCode',
	'italic',
	'bold',
	'underscore',
	'strikethrough',
	'quote',
	'blockQuote',
	'hideLinkEmbed',
	'hyperlink',
	'spoiler',
	'userMention',
	'channelMention',
	'roleMention',
	'formatEmoji',
	'channelLink',
	'messageLink',
	'time',
	'toSnakeCase',
	'flatten',
	'fetchRecommendedShardCount',
	'parseEmoji',
	'verifyString',
	'resolveColor',
	'discordSort',
	'cleanContent',
	'cleanCodeBlockContent',
	'parseWebhookURL'
]);

export function resolveFunctions(name: string): string | undefined {
	if (knownFunctions.has(name)) {
		return `${baseLink}/${name}`;
	}

	return undefined;
}
