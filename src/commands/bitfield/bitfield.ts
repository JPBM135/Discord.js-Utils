import { Command } from '../../structures/Command.js';
import type { Interaction } from '../../typings/command.js';

export default class extends Command {
	public constructor() {
		super(['']);
	}

	public override async chatInputCommand(interaction: Interaction) {
		await interaction.reply('Hello, world!');
	}
}
