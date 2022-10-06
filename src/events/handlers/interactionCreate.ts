import { on } from 'node:events';
import type { Interaction } from 'discord.js';
import { Client, Collection, Events } from 'discord.js';
import { inject, injectable } from 'tsyringe';
import { logger } from '../../logger.js';
import type { Command } from '../../structures/Command.js';
import type { Event } from '../../structures/Event.js';
import { kCommands } from '../../tokens.js';

@injectable()
export default class implements Event<Events.InteractionCreate> {
	public name = 'Interaction handling';

	public readonly event = Events.InteractionCreate;

	public once = false;

	public constructor(
		@inject(Client) private readonly client: Client,
		@inject(kCommands) private readonly commands: Collection<string, Command>,
	) {}

	public async execute(): Promise<void> {
		for await (const [interaction] of on(this.client, this.event) as AsyncIterableIterator<[Interaction]>) {
			if (!interaction.isCommand()) continue;
			const command = this.commands.get(interaction.commandName);

			if (!command) continue;

			logger.debug(`Handling command interaction`, {
				command: interaction.commandName,
				user: interaction.user.id,
			});

			try {
				if (interaction.isChatInputCommand()) {
					await command.chatInputCommand(interaction);
				}
			} catch (error) {
				logger.error(`There was an error executing the command ${interaction.commandName}:`, error as Error);
			}
		}
	}
}
