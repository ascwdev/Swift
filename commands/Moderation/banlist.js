const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('banlist')
        .setDescription('Displays a list of current bans in the server.'),
    async execute({ client, interaction }) {

        await interaction.guild.bans.fetch()
            .then(async bans => {
                const embed = new EmbedBuilder()
                    .setColor('#5866EF')
                    .setAuthor({name: `Ban List`, iconURL: client.user.avatarURL()})

                if (bans.size === 0) {
                    embed.setDescription('The ban list is currently empty. Use the `/help` command for more information on how to use this command.');
                    return await interaction.reply({ embeds: [embed], ephemeral: true});
                }

                let users = bans.map(user => user.user.username).join('\n');
                let reasons = bans.map(reason => reason.reason).join('\n');

                embed.setDescription(`${bans.size} users are banned.`)
                embed.addFields(
                    { name: 'User', value: users, inline: true },
                    { name: 'Reason', value: reasons, inline: true }
                )
                        
                await interaction.reply({ embeds: [embed] });
            })
    },
}