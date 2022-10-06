import type {
	APIApplicationCommand,
	AutocompleteInteraction,
	ButtonInteraction,
	ChatInputCommandInteraction,
	MessageContextMenuCommandInteraction,
	ModalSubmitInteraction,
	SelectMenuInteraction,
	UserContextMenuCommandInteraction,
} from 'discord.js';

export enum CommandInteractionType {
	Autocomplete,
	Button,
	SelectMenu,
	ModalSubmit,
	UserContext,
	MessageContext,
	ChatInput,
}

export type Interaction<T extends CommandInteractionType = CommandInteractionType.ChatInput> =
	T extends CommandInteractionType.Autocomplete
		? AutocompleteInteraction
		: T extends CommandInteractionType.Button
		? ButtonInteraction
		: T extends CommandInteractionType.SelectMenu
		? SelectMenuInteraction
		: T extends CommandInteractionType.ModalSubmit
		? ModalSubmitInteraction
		: T extends CommandInteractionType.UserContext
		? UserContextMenuCommandInteraction
		: T extends CommandInteractionType.MessageContext
		? MessageContextMenuCommandInteraction
		: T extends CommandInteractionType.ChatInput
		? ChatInputCommandInteraction
		: never;

export type CreateAPICommand = Omit<APIApplicationCommand, 'application_id' | 'id' | 'version'> & {
	application_id?: string;
	id?: string;
	version?: number;
};
