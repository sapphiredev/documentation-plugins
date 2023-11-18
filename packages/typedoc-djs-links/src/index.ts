// eslint-disable-next-line spaced-comment
/// <reference lib="dom" />

import { Application } from 'typedoc';
import { resolveClasses } from './resolveClasses';
import { resolveEnums } from './resolveEnum';
import { resolveFunctions } from './resolveFunctions';
import { resolveInterfaces } from './resolveInterface';
import { resolveTypes } from './resolveType';
import { resolveVariables } from './resolveVariable';

const version = Application.VERSION.split(/[\.-]/);
const supportsObjectReturn = Number(version[1]) > 23 || Number(version[2]) >= 26;

export function load(app: Application) {
	const failed = new Set<string>();

	app.converter.addUnknownSymbolResolver((declaration) => {
		if (declaration.moduleSource === 'discord.js' || (!declaration.moduleSource && declaration.resolutionStart === 'global')) {
			const name = declaration.symbolReference?.path?.map((path) => path.path).join('.');
			if (!name) return;
			const result =
				resolveFunctions(name) ??
				resolveClasses(name) ??
				resolveEnums(name) ??
				resolveInterfaces(name) ??
				resolveTypes(name) ??
				resolveVariables(name);

			if (!result && !failed.has(name)) {
				failed.add(name);
				app.logger.verbose(`[typedoc-plugin-djs-links]: Failed to resolve type: ${name}`);
			}

			if (supportsObjectReturn && result) {
				return {
					target: result,
					caption: name
				};
			}

			return result;
		}

		return void 0;
	});
}
