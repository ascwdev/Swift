const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'stats',
    description: 'Retrieves statistics about Swift.',
    usage: '`/stats`',
    permissions: 'none',
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription("Shows a breakdown of Swift's statistics."),
    async execute({ client, interaction }) {;
        

        let totalSeconds = (client.uptime / 1000);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;

        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
        let uptime = `${hours}H, ${minutes}m, ${seconds}s`;

        const embed = new EmbedBuilder()
        .setColor('#5866EF')
        .setAuthor({name: `Swift Stats`, iconURL: client.user.avatarURL()})
        .addFields(
            { name: ':desktop: Servers', value: '```' + `${client.guilds.cache.size}` +'```' },
            { name: ':battery: Usage', value: '```20.6MB```', inline: true},
            { name: ':hourglass: Uptime', value: '```' + uptime + '```', inline: true},
            { name: ':rocket: Version', value: '```1.0.0```', inline: true}
        );

        await interaction.reply({ embeds: [embed] });
    },
};