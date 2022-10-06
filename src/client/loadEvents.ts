import { pathToFileURL, URL, fileURLToPath } from 'node:url';
import type { ClientEvents } from 'discord.js';
import readdirp from 'readdirp';
import { container } from 'tsyringe';
import { logger } from '../logger.js';
import type { Event } from '../structures/Event.js';
import { importFactory } from '../utils/import.js';

export async function loadEvents() {
	logger.info('Loading events');

	const files = readdirp(fileURLToPath(new URL('../events', import.meta.url)), {
		fileFilter: '*.js',
	});

	for await (const file of files) {
		logger.debug(`Start loading event ${file.path}`);
		const event = importFactory<Event>(async () => import(pathToFileURL(file.fullPath).href));

		const resolvedEvent = container.resolve<Event<keyof ClientEvents>>((await event()).default);

		logger.debug(`Loaded event ${resolvedEvent.name}`);

		resolvedEvent.execute();
	}
}
