import { join } from 'node:path';
import { Application, DeclarationReflection, ProjectReflection, ReferenceType, TSConfigReader, type InlineTagDisplayPart } from 'typedoc';
import { beforeAll, expect, test } from 'vitest';
import { load } from '../src';

let project: ProjectReflection | undefined;

beforeAll(() => {
	const app = new Application();
	app.options.addReader(new TSConfigReader());
	app.bootstrap({
		entryPoints: [join(__dirname, 'fixtures', 'links.ts')],
		tsconfig: join(__dirname, 'tsconfig.json')
	});
	load(app);

	project ??= app.convert();
	expect(project).toBeDefined();
});

test('Handles Class links', () => {
	const refl = project?.getChildByName('DJSClient');
	expect(refl).toBeInstanceOf(DeclarationReflection);
	const { type } = refl as DeclarationReflection;
	expect(type).toBeInstanceOf(ReferenceType);

	const ref = type as ReferenceType;
	expect(ref.externalUrl).toBe('https://discord.js.org/#/docs/discord.js/main/class/Client');
});

test('Handles Typedef links', () => {
	const refl = project?.getChildByName('DJSClientOptions');
	expect(refl).toBeInstanceOf(DeclarationReflection);
	const { type } = refl as DeclarationReflection;
	expect(type).toBeInstanceOf(ReferenceType);

	const ref = type as ReferenceType;
	expect(ref.externalUrl).toBe('https://discord.js.org/#/docs/discord.js/main/typedef/ClientOptions');
});

test('Handles comment links', () => {
	const refl = project?.getChildByName('comment');
	expect(refl).toBeInstanceOf(DeclarationReflection);
	const tags = refl?.comment?.summary.filter((f) => f.kind === 'inline-tag') as InlineTagDisplayPart[];

	expect(tags).toEqual([
		{
			kind: 'inline-tag',
			tag: '@link',
			target: 'https://discord.js.org/#/docs/discord.js/main/class/Guild',
			text: 'Guild'
		},
		{
			kind: 'inline-tag',
			tag: '@link',
			target: 'https://discord.js.org/#/docs/discord.js/main/class/Message',
			text: 'Message'
		},
		{
			kind: 'inline-tag',
			tag: '@link',
			target: 'https://discord.js.org/#/docs/discord.js/main/function/hideLinkEmbed',
			text: 'hideLinkEmbed'
		},
		{
			kind: 'inline-tag',
			tag: '@link',
			target: 'https://discord.js.org/#/docs/discord.js/main/class/User',
			text: 'custom'
		}
	]);
});
