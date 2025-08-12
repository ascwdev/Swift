const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Boots a member from the server.')
        .addUserOption (option => option
            .setName('member')
            .setDescription('The member you want to kick.')
            .setRequired(true))
        .addStringOption (option => option.setName('reason')
            .setDescription('The reason for kicking the member.')
            .setRequired(false)),
    async execute({ interaction }) {
        const user = interaction.options.getUser('member');
        const member = interaction.options.getMember('member');
        const reason = interaction.options.getString('reason');
        const embed = new EmbedBuilder()
            .setColor('#5866EF')
            .setAuthor({name: `Kick User`, iconURL: interaction.guild.iconURL()});
        
        if (!member.permissions.has(PermissionFlagsBits.KickMembers)) {
            embed.setDescription('You do not have permission to kick a member.');
            return await interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (member.user.bot || interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            embed.setDescription(`You cannot kick ${member.displayName}.`);
            return await interaction.reply({ embeds: [embed], ephemeral: true });
        }

        await member.kick({reason: `${!reason ? "Unspecified" : `${reason}`}`});
        console.log(`${user.username} was banned from ${member.guild.name}.`);

        embed.setAuthor({name: `Kicked ${user.tag}`, iconURL: user.avatarURL()})
        embed.setDescription(`${member.displayName} was kicked.`)
        embed.addFields (
            { name: 'Reason', value: `${reason}`, inline: true }
        );
    
        await interaction.reply({ embeds: [embed] });    
    },
};