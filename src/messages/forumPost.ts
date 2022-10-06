import { channelMention } from 'discord.js';
import { EnvironmentKeys } from '../constants.js';
import { resolveEnv } from '../utils/resolveEnv.js';

export const TextForumPost = [
	"• What's your exact discord.js `npm list discord.js` and node `node -v` version?",
	'• Post the full error stack trace, not just the top part!',
	'• Show your code!',
	'• Explain what exactly your issue is.',
	`• Not a discord.js issue? Check out ${channelMention(resolveEnv(EnvironmentKeys.OtherServersChannelId)!)}`,
].join('\n');

export const VoiceForumPost = [
	"• What's your exact @discordjs/voice `npm list @discordjs/voice`?",
	'• Provide the dependency report: <https://discordjs.guide/voice/#debugging-dependencies>',
	TextForumPost,
].join('\n');
