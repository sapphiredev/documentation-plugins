// TypeScript:
import { Argument, PieceContext } from '@sapphire/framework';
import { URL } from 'node:url';

export class CoreArgument extends Argument<URL> {
	public constructor(context: PieceContext) {
		super(context, { name: 'hyperlink', aliases: ['url'] });
	}

	public run(argument: string): Argument.Result<URL> {
		try {
			return this.ok(new URL(argument));
		} catch {
			return this.error(argument, 'ArgumentHyperlinkInvalidURL', 'The argument did not resolve to a valid URL.');
		}
	}
}

// Augment the ArgType structure so `args.pick('url')`, `args.repeat('url')`
// and others have a return type of `URL`.
declare module '@sapphire/framework' {
	export interface ArgType {
		url: URL;
	}
}
