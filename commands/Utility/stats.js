const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'stats',
    description: 'Retrieves statistics about Swift.',
    usage: '`/stats`',
    permissions: 'none',
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription("Shows a breakdown of Swift's statistics."),
    async execute({ client, interaction }) {;
        
        // Initialise uptime units.
        let totalSeconds = (client.uptime / 1000);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;

        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
        let uptime = `${hours}H, ${minutes}m, ${seconds}s`;

        // Fetch latest version from Swift's GitHub repo.
        const response = await fetch('https://api.github.com/repos/ascwnyc/Swift/releases/latest');
        const data = await response.json();

        const embed = new EmbedBuilder()
        .setColor('#5866EF')
        .setAuthor({name: `Swift Stats`, iconURL: client.user.avatarURL()})
        .addFields(
            { name: ':desktop: Servers', value: `\`\`\`${client.guilds.cache.size}\`\`\`` , inline: true},
            { name: ':hourglass: Uptime', value: `\`\`\`${uptime}\`\`\`` , inline: true},
            { name: ':rocket: Version', value: `\`\`\`${data.tag_name}\`\`\``, inline: true}
        );

        await interaction.reply({ embeds: [embed] });
    },
};