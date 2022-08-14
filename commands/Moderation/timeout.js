const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    description: 'Gives the specified member a timeout. Additionally a reason can be given.',
    usage: '`/timeout <reason>`',
    permissions: '`MuteMembers`',
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Gives the specified member a timeout.')
        .addUserOption (option =>
            option.setName('member')
                .setDescription('The member you want to timeout.')
                .setRequired(true))
        .addNumberOption (option =>
            option.setName('duration')
                .setDescription('The duration of the timeout in minutes.')
                .setRequired(true))
        .addStringOption (option =>
            option.setName('reason')
                .setDescription('The reason for giving the member a timeout.')
                .setRequired(false)),
    async execute({ interaction }) {
        const user = interaction.options.getUser('member');
        const member = interaction.options.getMember('member');
        const duration = interaction.options.getNumber('duration');
        const reason = interaction.options.getString('reason');

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.MuteMembers)) {
            return await interaction.reply({ content: 'You do not have permission to give a member a timeout.', ephemeral: true });
        }

        if (member.user.bot) {
            return await interaction.reply({ content: `You cannot give ${member.displayName} a timeout.`, ephemeral: true });
        }

        if (member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return await interaction.reply({ content: `You cannot give ${member.displayName} a timeout.`, ephemeral: true });
        }

        member.timeout(duration * 60 * 1000, `${!reason ? "Unspecified" : `${reason}`}`);
            console.log(`${user.username} was given a ${duration} minute timeout in ${member.guild.name}.`);
    
            const embed = new EmbedBuilder()
            .setColor('#5866EF')
            .setAuthor({ name: `Timeout For ${user.tag}`, iconURL: user.avatarURL() })
            .setDescription(`${member.displayName} was given a ${duration} minute timeout.`)
            .addFields (
                { name: 'Reason', value: `${reason}`, inline: true }
            )
    
        await interaction.reply({ embeds: [embed] });  
    },
};