import type { GatewayIntentBits, PermissionFlags } from 'discord.js';
import { codeBlock, IntentsBitField, PermissionsBitField } from 'discord.js';
import kleur from 'kleur';
import { Command } from '../../structures/Command.js';
import type { Interaction } from '../../typings/command.js';

export default class extends Command {
	public constructor() {
		super(['bitfield']);
	}

	public override async chatInputCommand(interaction: Interaction) {
		await interaction.deferReply({ ephemeral: true });
		const type = interaction.options.getSubcommand() as 'intents' | 'permissions';
		const value = interaction.options.get('bitfield', true).value as number | string;

		let allFlags: PermissionFlags | typeof GatewayIntentBits | null = null;
		let bitField: IntentsBitField | PermissionsBitField | null = null;
		try {
			switch (type) {
				case 'intents':
					allFlags = IntentsBitField.Flags;
					bitField = new IntentsBitField(value as number);
					break;
				case 'permissions':
					allFlags = PermissionsBitField.Flags;
					bitField = new PermissionsBitField(BigInt(value));
					break;
			}

			const flagsString = Object.entries(allFlags)
				.filter(([flag]) => Number.isNaN(Number(flag)))
				.map(([flag, val], idx) => {
					const hasFlag = bitField!.has(val as keyof typeof allFlags);
					return `${hasFlag ? kleur.green('[✔]') : kleur.red('[✖]')} ${flag} (${val}) 1 << ${idx + 1}`;
				});

			const content = [`Resolved ${type} bitfield of \`${value}\` to:`, codeBlock('ansi', flagsString.join('\n'))];

			await interaction.editReply(content.join('\n'));
		} catch {
			await interaction.editReply(`Invalid ${type} bitfield provided: \`${value}\``);
		}
	}
}
