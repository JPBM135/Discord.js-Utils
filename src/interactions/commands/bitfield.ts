import { ApplicationCommandOptionType, ApplicationCommandType, PermissionFlagsBits } from 'discord.js';
import type { CreateAPICommand } from '../../typings/command.js';

export const BitFieldCommand: CreateAPICommand = {
	name: 'bitfield',
	description: 'A command to parse bitfields',
	type: ApplicationCommandType.ChatInput,
	default_member_permissions: PermissionFlagsBits.ViewChannel.toString(),
	options: [
		{
			name: 'intents',
			description: 'A bitfield of intents',
			type: ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: 'bitfield',
					description: 'The intents to parse',
					type: ApplicationCommandOptionType.Integer,
					required: true,
				},
			],
		},
		{
			name: 'permissions',
			description: 'A bitfield of permissions',
			type: ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: 'bitfield',
					description: 'The permissions to parse',
					type: ApplicationCommandOptionType.String,
					required: true,
				},
			],
		},
	],
};
