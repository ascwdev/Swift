const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Swift will display the help menu.'),
	async execute(interaction) {
		const row = new MessageActionRow()
		.addComponents(
			new MessageButton()
				.setCustomId('primary')
				.setLabel('Primary')
				.setStyle('PRIMARY'),
            new MessageButton()
				.setCustomId('secondary')
				.setLabel('Secondary')
				.setStyle('SECONDARY'),
		);
		
        const embed = new MessageEmbed()
        .setColor('#2C2F33')
        .setTitle('Help')
        .setDescription('This is a help menu. Use the buttons below to find help in the relevant tabs.');

        await interaction.reply({ embeds: [embed], components: [row] });
    },
};