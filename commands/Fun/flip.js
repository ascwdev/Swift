const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    description: 'Flips a coin.',
    usage: '`/flip`',
    permissions: '`none`',
    data: new SlashCommandBuilder()
        .setName('flip')
        .setDescription('Flips a coin.'),
    async execute({ interaction }) {        
        const result = Math.random() >= 0.5 ? "heads" : "tails";
        const wait = require('node:timers/promises').setTimeout;
        const embed = new EmbedBuilder()
            .setColor('#5866EF')
            .setAuthor({name: `Coin Flip`, iconURL: `https://i.imgur.com/FtzaIuP.png`})
            .setDescription(`${interaction.member.displayName} flips a **coin**.`);

        await interaction.reply({ embeds: [embed] });
        await wait(2000);
        embed.setDescription(`The coin lands on **${result}**.`);
		await interaction.followUp({ embeds: [embed] });                     
    },
}
