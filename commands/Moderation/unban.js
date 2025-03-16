const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    usage: '`/unban <user>`',
    permissions: '`BanMembers`',
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Unbans a user from the server.')
        .addUserOption (option =>
            option.setName('user')
                .setDescription('The user you want to unban.')
                .setRequired(true)),
    async execute({ interaction }) {
        const user = interaction.options.getUser('user');

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return await interaction.reply({ content: 'You do not have permission to unban a user.', ephemeral: true });

        }

        await interaction.guild.bans.fetch()
            .then(async bans => {
                if (bans.size == 0) {
                    return await interaction.reply({ content: 'The ban list is currently empty.', ephemeral: true});
                }
                    
                let bannedUser = bans.find(ban => ban.user.id == user);
                    
                if (!bannedUser) {
                    return await interaction.reply({content: 'The specified user is not banned.', ephemeral: true});
                }
                    
                await interaction.guild.bans.remove(user);
                console.log(`${user.username} was unbanned.`);

                const embed = new EmbedBuilder()
                    .setColor('#5866EF')
                    .setAuthor({name: `Unbanned ${user.tag}`, iconURL: user.avatarURL()})
                    .setDescription(`${user.username} has been unbanned.`)
                        
                await interaction.reply({ embeds: [embed] });
            })        
    },
};