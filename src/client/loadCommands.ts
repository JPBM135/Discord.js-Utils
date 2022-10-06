import { pathToFileURL, URL, fileURLToPath } from 'node:url';
import { Collection } from 'discord.js';
import readdirp from 'readdirp';
import { container } from 'tsyringe';
import { logger } from '../logger.js';
import type { Command } from '../structures/Command.js';
import { kCommands } from '../tokens.js';
import { importFactory } from '../utils/import.js';

export async function loadCommands() {
	const commands = new Collection<string, Command>();

	logger.info('Loading commands');

	const files = readdirp(fileURLToPath(new URL('../commands', import.meta.url)), {
		fileFilter: '*.js',
	});

	for await (const file of files) {
		logger.debug(`Start loading command ${file.path}`);
		const event = importFactory<Command>(async () => import(pathToFileURL(file.fullPath).href));

		const resolvedCommand = container.resolve<Command>((await event()).default);

		logger.debug(`Loaded command ${file.path}`);

		for (const name of resolvedCommand.names) commands.set(name, resolvedCommand);
	}

	container.register(kCommands, { useValue: commands });
}
