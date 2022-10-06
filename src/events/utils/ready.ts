import { on } from 'node:events';
import { Client, Events } from 'discord.js';
import { inject, injectable } from 'tsyringe';
import { logger } from '../../logger.js';
import type { Event } from '../../structures/Event.js';

@injectable()
export default class implements Event<Events.ClientReady> {
	public name = 'Ready event';

	public readonly event = Events.ClientReady;

	public once = false;

	public constructor(@inject(Client) private readonly client: Client) {}

	public async execute(): Promise<void> {
		for await (const _ of on(this.client, this.event)) {
			logger.success(`Client is ready, logged in as ${this.client.user?.tag}!`);
		}
	}
}
