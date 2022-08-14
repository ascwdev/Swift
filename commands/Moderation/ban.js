const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'Bans a specified member. Additionally, a reason can be specified as well as a ban duration (in days).',
    usage: '`/ban`',
    permissions: '`BanMembers`',
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
    
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {    
            return await interaction.reply({ content: 'You do not have permission to ban a member.', ephemeral: true });
        }

        if (!member) {
            return await interaction.reply({ content: 'The specified member is not a part of this guild.', ephemeral: true});
        }

        if (member.user.bot) {
            return await interaction.reply({ content: `You cannot ban ${member.displayName}.`, ephemeral: true });
        }
        
        if (member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return await interaction.reply({ content: `You cannot ban ${member.displayName}.`, ephemeral: true });
        }

        member.ban({reason:`${!reason ? "None" : `${reason}`}`});
        console.log(`${member.displayName} was banned from ${member.guild.name}.`);

        const embed = new EmbedBuilder()
            .setColor('#5866EF')
            .setAuthor({name: `Banned ${user.tag}`, iconURL: user.avatarURL()})
            .setDescription(`${member.displayName} was banned.`)
            .addFields (
                { name: 'Reason', value: `${reason}`, inline: true },
            );
            
        await interaction.reply({ embeds: [embed] });
    },
};