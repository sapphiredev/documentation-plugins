// TypeScript:
import { Argument } from '@sapphire/framework';
import { URL } from 'node:url';

export class CoreArgument extends Argument<URL> {
	public constructor(context: Argument.LoaderContext) {
		super(context, { name: 'hyperlink', aliases: ['url'] });
	}

	public run(parameter: string, context: Argument.Context): Argument.Result<URL> {
		try {
			return this.ok(new URL(parameter));
		} catch {
			return this.error({
				parameter,
				identifier: 'ArgumentHyperlinkInvalidURL',
				context,
				message: 'The argument did not resolve to a valid URL.'
			});
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
