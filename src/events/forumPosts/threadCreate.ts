import { on } from 'node:events';
import { type AnyThreadChannel, Client, Events, ChannelType } from 'discord.js';
import { inject, injectable } from 'tsyringe';
import { EnvironmentKeys } from '../../constants.js';
import { logger } from '../../logger.js';
import { TextForumPost, VoiceForumPost } from '../../messages/forumPost.js';
import type { Event } from '../../structures/Event.js';
import { resolveEnv } from '../../utils/resolveEnv.js';

@injectable()
export default class implements Event<Events.ThreadCreate> {
	public name = 'Auto post on thread creation';

	public readonly event = Events.ThreadCreate;

	public once = false;

	public constructor(@inject(Client) private readonly client: Client) {}

	public async execute(): Promise<void> {
		for await (const [thread, isNew] of on(this.client, this.event) as AsyncIterableIterator<
			[AnyThreadChannel, boolean]
		>) {
			try {
				if (!isNew || thread.parent?.type !== ChannelType.GuildForum) continue;

				const [DjsForumChannelId, DjsVoiceForumChannelId] = [
					resolveEnv(EnvironmentKeys.DjsForumChannelId),
					resolveEnv(EnvironmentKeys.DjsVoiceForumChannelId),
				];

				logger.debug(`Handling new thread creation`, {
					thread: thread.id,
					channel: thread.parentId,
				});

				switch (thread.parentId) {
					case DjsForumChannelId:
						await thread.send(TextForumPost);
						break;
					case DjsVoiceForumChannelId:
						await thread.send(VoiceForumPost);
						break;
					default:
						continue;
				}
			} catch (error) {
				logger.error('There was an error sending an post message:', error as Error);
			}
		}
	}
}
