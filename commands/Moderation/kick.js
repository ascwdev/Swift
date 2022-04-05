const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');

module.exports = {
    name: 'kick',
    description: 'Kicks a specified user. Additionally, a reason can be specified.',
    usage: '`/kick <user> [reason]`',
    permissions: '`KICK_MEMBERS`',
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Boots a user from the server.')
        .addUserOption (option =>
            option.setName('user')
                .setDescription('The user you want to kick.')
                .setRequired(true))
        .addStringOption (option =>
            option.setName('reason')
                .setDescription('The reason for kicking the user.')
                .setRequired(false)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const member = interaction.options.getMember('user');
        const reason = interaction.options.getString('reason');
        
        if (!interaction.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
            return await interaction.reply({ content: 'You do not have permission to kick a user.', ephemeral: true });
        }

        if (member.user.bot) {
            return await interaction.reply({ content: `You cannot kick ${member.displayName}.`, ephemeral: true });
        }

        if (member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            return await interaction.reply({ content: `You cannot kick ${member.displayName}.`, ephemeral: true });
        }

        member.kick({reason:`${!reason ? "Unspecified" : `${reason}`}`});
            console.log(`${user.username} was banned from ${member.guild.name}.`);
    
            const embed = new MessageEmbed()
            .setColor('#5866EF')
            .setAuthor({name: `Kicked ${user.tag}`, iconURL: user.avatarURL()})
            .setDescription(`${member.displayName} was kicked.`)
            .addFields (
                { name: 'Reason', value: `${reason}`, inline: true }
            )
    
        await interaction.reply({ embeds: [embed] });    
    },
};