import { ApplicationCommandType, PermissionFlagsBits } from 'discord.js';
import type { CreateAPICommand } from '../../typings/command.js';

export const PingCommand: CreateAPICommand = {
	name: 'ping',
	description: 'Pong!',
	type: ApplicationCommandType.ChatInput,
	default_member_permissions: PermissionFlagsBits.ViewChannel.toString(),
};
