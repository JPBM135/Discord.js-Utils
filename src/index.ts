import 'reflect-metadata';
import { Client, GatewayIntentBits, Options, Partials } from 'discord.js';
import { container } from 'tsyringe';
import { loadCommands } from './client/loadCommands.js';
import { loadEvents } from './client/loadEvents.js';
import { EnvironmentKeys, TimeConstants } from './constants.js';
import { logger } from './logger.js';
import { resolveEnv } from './utils/resolveEnv.js';

logger.info('Creating client');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildVoiceStates,
	],
	partials: [Partials.Channel, Partials.GuildMember, Partials.User, Partials.ThreadMember],
	shards: 'auto',
	makeCache: Options.cacheWithLimits({
		MessageManager: {
			maxSize: 1_000,
		},
		UserManager: {
			maxSize: 1_000,
			keepOverLimit: (user) => user.id === user.client.user.id,
		},
		VoiceStateManager: {
			maxSize: 100,
			keepOverLimit: (state) => state.member?.id === state.client.user.id,
		},
	}),
	sweepers: {
		...Options.DefaultSweeperSettings,
		messages: {
			interval: TimeConstants.Hour(1, true),
			// eslint-disable-next-line unicorn/consistent-function-scoping
			filter: () => (message) => {
				if (!message) return true;
				if (message.author.id === message.client.user.id) return false;
				if (message.author.bot) return true;
				return Date.now() - (message.editedTimestamp ?? message.createdTimestamp) > TimeConstants.Week();
			},
		},
	},
});

logger.info('Registering client');

container.register(Client, { useValue: client });

await loadCommands();
await loadEvents();

await client.login(resolveEnv(EnvironmentKeys.DiscordToken, true));
