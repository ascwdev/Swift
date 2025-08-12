const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans a member from the server.')
        .addUserOption (option =>
            option.setName('member')
                .setDescription('The member you want to ban.')
                .setRequired(true))
        .addStringOption (option =>
            option.setName('reason')
                .setDescription('The reason for banning the member.')
                .setRequired(false)),
    async execute({ interaction }) {
        const user = interaction.options.getUser('member');
        const member = interaction.options.getMember('member');
        const reason = interaction.options.getString('reason');
        const embed = new EmbedBuilder()
            .setColor('#5866EF')
            .setAuthor({name: `Ban User`, iconURL: interaction.guild.iconURL()})
    
        if (!member.permissions.has(PermissionFlagsBits.BanMembers)) {
            embed.setDescription('You do not have permission to ban a member.');
            return await interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (!member) {
            embed.setDescription('The specified member is not a part of this guild.');
            return await interaction.reply({ embeds: [embed], ephemeral: true});
        }

        if (member.user.bot) {
            embed.setDescription(`You cannot ban ${member.displayName}.`)
            return await interaction.reply({ embeds: [embed] , ephemeral: true });
        }
        
        if (member.permissions.has(PermissionFlagsBits.Administrator)) {
            embed.setDescription(`You cannot ban ${member.displayName}.`);
            return await interaction.reply({ embeds: [embed], ephemeral: true });
        }

        member.ban({reason:`${!reason ? "None" : `${reason}`}`});
        console.log(`${member.displayName} was banned from ${member.guild.name}.`);

        embed.setAuthor({name: `Banned ${user.tag}`, iconURL: user.avatarURL()})
        embed.setDescription(`${member.displayName} was banned.`)
        embed.addFields (
            { name: 'Reason', value: `${reason}`, inline: true },
        );
            
        await interaction.reply({ embeds: [embed] });
    },
};