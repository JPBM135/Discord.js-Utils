import { on } from 'node:events';
import { Client, Events, type Message } from 'discord.js';
import { inject, injectable } from 'tsyringe';
import { request } from 'undici';
import { GitHubUrlLinesRegex, GitHubUrlRegex } from '../../constants.js';
import { logger } from '../../logger.js';
import type { Event } from '../../structures/Event.js';
import { convertGitHubUrlToRawUrl } from '../../utils/gitHub.js';
import { ellipsis } from '../../utils/string.js';

@injectable()
export default class implements Event<Events.MessageCreate> {
	public name = 'Github line detection';

	public readonly event = Events.MessageCreate;

	public once = false;

	public constructor(@inject(Client) private readonly client: Client) {}

	public async execute(): Promise<void> {
		for await (const [message] of on(this.client, this.event) as AsyncIterableIterator<[Message]>) {
			try {
				if (message.author.bot) continue;

				const matches = message.content.matchAll(GitHubUrlRegex);
				if (!matches) continue;

				for (const match of matches) {
					logger.debug(`Handling message containing GitHub URL`, {
						user: message.author.id,
						channel: message.channel.id,
						url: match[0],
					});

					const { org, repo, path, opts } = match.groups!;
					if (!opts) continue;

					const lines = GitHubUrlLinesRegex.exec(opts);
					if (!lines || lines.length === 0) continue;

					const [start, end] = lines.slice(1).map((line) => {
						const num = Number(line);
						return Number.isNaN(num) ? null : num;
					});
					if (!start) continue;

					const url = convertGitHubUrlToRawUrl(match[0]!);
					if (!url) continue;

					const content = await request(url).then(async (res) => res.body.text());

					const linesContent = content
						.split('\n')
						.slice(Math.max(0, start - 2), end ?? start + 1)
						.map((line, idx) => `${String(start + idx - 1).padEnd(String(end ?? start + 1).length + 1, ' ')}| ${line}`)
						.join('\n');
					if (!linesContent.length) continue;

					const lang = path?.split('.').at(-1) ?? 'text';

					const response = [
						`${
							end ? `Lines \`${start}\` to \`${Math.min(end, linesContent.length)}\`` : `Line \`${start}\``
						} of *${org!}/${repo!}${path!}*`,
						`\`\`\`${lang}`,
					];

					const boilerLength = response.join('\n').length + 4; // 4 for the closing ```\n
					const maxLength = 2_000 - boilerLength;

					response.push(ellipsis(linesContent, maxLength));
					response.push('```');

					await message.reply({ content: response.join('\n'), allowedMentions: { repliedUser: false } });
				}
			} catch (error) {
				logger.error('There was an error parsing lines from a GitHub url:', error as Error);
			}
		}
	}
}
