import type {
	AutocompleteInteraction,
	Awaitable,
	ButtonInteraction,
	ChatInputCommandInteraction,
	MessageContextMenuCommandInteraction,
	ModalSubmitInteraction,
	SelectMenuInteraction,
	UserContextMenuCommandInteraction,
} from 'discord.js';
import { logger } from '../logger.js';

export abstract class Command {
	public names: string[];

	public constructor(names: string[]) {
		this.names = names;
	}

	public autoComplete(_: AutocompleteInteraction): Awaitable<void> {
		logger.warn(`Received autocomplete interaction for ${_.commandName}, but no autocomplete handler was provided.`);
	}

	public button(_: ButtonInteraction): Awaitable<void> {
		logger.warn(`Received button interaction for ${_.customId}, but no button handler was provided.`);
	}

	public selectMenu(_: SelectMenuInteraction): Awaitable<void> {
		logger.warn(`Received select menu interaction for ${_.customId}, but no select menu handler was provided.`);
	}

	public modalSubmit(_: ModalSubmitInteraction): Awaitable<void> {
		logger.warn(`Received modal submit interaction for ${_.customId}, but no modal submit handler was provided.`);
	}

	public userContext(_: UserContextMenuCommandInteraction): Awaitable<void> {
		logger.warn(`Received user context interaction for ${_.commandName}, but no user context handler was provided.`);
	}

	public messageContext(_: MessageContextMenuCommandInteraction): Awaitable<void> {
		logger.warn(
			`Received message context interaction for ${_.commandName}, but no message context handler was provided.`,
		);
	}

	public chatInputCommand(_: ChatInputCommandInteraction): Awaitable<void> {
		logger.warn(`Received chat input interaction for ${_.commandName}, but no chat input handler was provided.`);
	}
}
