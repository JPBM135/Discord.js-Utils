import type { ClientEvents } from 'discord.js';

export type Event<T extends keyof ClientEvents = keyof ClientEvents> = {
	event: T;
	execute(...args: ClientEvents[T]): void;
	name: string;
	once: boolean;
};
