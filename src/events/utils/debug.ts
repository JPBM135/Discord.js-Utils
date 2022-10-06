import { on } from 'node:events';
import { Client, Events } from 'discord.js';
import { inject, injectable } from 'tsyringe';
import { logger } from '../../logger.js';
import type { Event } from '../../structures/Event.js';

@injectable()
export default class implements Event<Events.Debug> {
	public name = 'Debug event';

	public readonly event = Events.Debug;

	public once = false;

	public constructor(@inject(Client) private readonly client: Client) {}

	public async execute(): Promise<void> {
		for await (const [message] of on(this.client, this.event) as AsyncIterableIterator<[string]>) {
			logger.debug(message);
		}
	}
}
