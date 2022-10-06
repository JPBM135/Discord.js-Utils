/* eslint-disable unicorn/no-unsafe-regex */
export enum EnvironmentKeys {
	Debug = 'BOT_DEBUG',
	DiscordClientId = 'DISCORD_CLIENT_ID',
	DiscordGuildId = 'DISCORD_GUILD_ID',
	DiscordToken = 'DISCORD_TOKEN',
	DjsForumChannelId = 'DJS_FORUM_CHANNEL_ID',
	DjsVoiceForumChannelId = 'DJS_VOICE_FORUM_CHANNEL_ID',
	OtherServersChannelId = 'OTHER_SERVERS_CHANNEL_ID',
}

export const TimeConstants = {
	Second: (num?: number, seconds = false) => (num ?? 1) * (seconds ? 1 : 1_000),
	Minute: (num?: number, seconds = false) => (num ?? 1) * 60 * (seconds ? 1 : 1_000),
	Hour: (num?: number, seconds = false) => (num ?? 1) * 60 * 60 * (seconds ? 1 : 1_000),
	Day: (num?: number, seconds = false) => (num ?? 1) * 24 * 60 * 60 * (seconds ? 1 : 1_000),
	Week: (num?: number, seconds = false) => (num ?? 1) * 7 * 24 * 60 * 60 * (seconds ? 1 : 1_000),
	Month: (num?: number, seconds = false) => (num ?? 1) * 30 * 24 * 60 * 60 * (seconds ? 1 : 1_000),
	Year: (num?: number, seconds = false) => (num ?? 1) * 365 * 24 * 60 * 60 * (seconds ? 1 : 1_000),
};

export const GitHubUrlRegex = /https:\/\/github.com\/(?<org>.+?)\/(?<repo>.+?)\/blob(?<path>\/[^\n#]+)(?<opts>.+)?/g;
export const GitHubUrlLinesRegex = /#L(?<start>\d+)(?:-L(?<end>\d+))?/;
