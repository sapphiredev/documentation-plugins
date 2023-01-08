// eslint-disable-next-line spaced-comment
/// <reference lib="dom" />

import type { Application } from 'typedoc';
import { resolveClasses } from './resolveClasses';
import { resolveTypeDefs } from './resolveTypedefs';

export function load(app: Application) {
	const failed = new Set<string>();

	app.renderer.addUnknownSymbolResolver('discord.js', (name) => {
		const result = resolveClasses(name) ?? resolveTypeDefs(name);

		if (!result && !failed.has(name)) {
			failed.add(name);
			app.logger.verbose(`[typedoc-plugin-djs-links]: Failed to resolve type: ${name}`);
		}

		return result;
	});
}
