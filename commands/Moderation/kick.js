const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'kick',
    description: 'Kicks a specified member. Additionally, a reason can be specified.',
    usage: '`/kick <member> [reason]`',
    permissions: '`KickMembers`',
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Boots a member from the server.')
        .addUserOption (option =>
            option.setName('member')
                .setDescription('The member you want to kick.')
                .setRequired(true))
        .addStringOption (option =>
            option.setName('reason')
                .setDescription('The reason for kicking the member.')
                .setRequired(false)),
    async execute({ interaction }) {
        const user = interaction.options.getUser('member');
        const member = interaction.options.getMember('member');
        const reason = interaction.options.getString('reason');
        
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            return await interaction.reply({ content: 'You do not have permission to kick a member.', ephemeral: true });
        }

        if (member.user.bot) {
            return await interaction.reply({ content: `You cannot kick ${member.displayName}.`, ephemeral: true });
        }

        if (member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return await interaction.reply({ content: `You cannot kick ${member.displayName}.`, ephemeral: true });
        }

        member.kick({reason:`${!reason ? "Unspecified" : `${reason}`}`});
            console.log(`${user.username} was banned from ${member.guild.name}.`);
    
            const embed = new EmbedBuilder()
            .setColor('#5866EF')
            .setAuthor({name: `Kicked ${user.tag}`, iconURL: user.avatarURL()})
            .setDescription(`${member.displayName} was kicked.`)
            .addFields (
                { name: 'Reason', value: `${reason}`, inline: true }
            )
    
        await interaction.reply({ embeds: [embed] });    
    },
};