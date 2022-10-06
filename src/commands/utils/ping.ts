import { Command } from '../../structures/Command.js';
import type { Interaction } from '../../typings/command.js';

export default class extends Command {
	public constructor() {
		super(['ping']);
	}

	public override async chatInputCommand(interaction: Interaction) {
		await interaction.deferReply({ ephemeral: true });

		await interaction.editReply(`Pong! (${Date.now() - interaction.createdTimestamp}ms)`);
	}
}
