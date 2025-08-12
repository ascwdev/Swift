const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Unbans a user from the server.')
        .addUserOption (option =>
            option.setName('user')
                .setDescription('The user you want to unban.')
                .setRequired(true)),
    async execute({ interaction }) {
        const user = interaction.options.getUser('user');
        const embed = new EmbedBuilder()
            .setColor('#5866EF')
            .setAuthor({name: 'Unban User', iconURL: interaction.guild.iconURL()});

        if (!interaction.member.permissions.has(PermissionFlagsBits.BanMembers)) {
            embed.setDescription('You do not have permission to unban a user.');
            return await interaction.reply({ embeds: [embed], ephemeral: true });

        }

        await interaction.guild.bans.fetch()
            .then(async bans => {
                if (bans.size === 0) {
                    embed.setDescription('The ban list is currently empty.');
                    return await interaction.reply({ embeds: [embed], ephemeral: true});
                }
                    
                let bannedUser = bans.find(ban => ban.user.id === user);
                    
                if (!bannedUser) {
                    embed.setDescription('The specified user is not banned.');
                    return await interaction.reply({ embeds: [embed], ephemeral: true});
                }
                    
                await interaction.guild.bans.remove(user);
                console.log(`${user.username} was unbanned.`);

                embed.setAuthor({name: `Unbanned ${user.tag}`, iconURL: user.avatarURL()})
                embed.setDescription(`${user.username} has been unbanned.`)
                        
                await interaction.reply({ embeds: [embed] });
            })        
    },
};