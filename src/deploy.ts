import { REST, Routes } from 'discord.js';
import { EnvironmentKeys } from './constants.js';
import { BitFieldCommand, PingCommand } from './interactions/index.js';
import { logger } from './logger.js';
import { resolveEnv } from './utils/resolveEnv.js';

const Rest = new REST({ version: '10' }).setToken(resolveEnv(EnvironmentKeys.DiscordToken, true));

logger.info('Deploying commands to Discord');

try {
	const res = await Rest.put(
		Routes.applicationGuildCommands(
			resolveEnv(EnvironmentKeys.DiscordClientId, true),
			resolveEnv(EnvironmentKeys.DiscordGuildId, true),
		),
		{ body: [BitFieldCommand, PingCommand] },
	);
	logger.success('Successfully deployed commands to Discord', res);
} catch (error) {
	logger.error('Failed to deploy commands to Discord', error as Error);
}
