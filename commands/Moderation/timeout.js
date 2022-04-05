const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');

module.exports = {
    name: 'timeout',
    description: 'Gives the specified user a timeout. Additionally a reason can be given.',
    usage: '`/timeout <reason>`',
    permissions: '`MUTE_MEMBERS`',
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Gives the specified user a timeout.')
        .addUserOption (option =>
            option.setName('user')
                .setDescription('The user you want to timeout.')
                .setRequired(true))
        .addNumberOption (option =>
            option.setName('duration')
                .setDescription('The duration of the timeout in minutes.')
                .setRequired(true))
        .addStringOption (option =>
            option.setName('reason')
                .setDescription('The reason for giving the user a timeout.')
                .setRequired(false)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const member = interaction.options.getMember('user');
        const duration = interaction.options.getNumber('duration');
        const reason = interaction.options.getString('reason');

        const { guild } = interaction;

        if (!interaction.member.permissions.has(Permissions.FLAGS.MUTE_MEMBERS)) {
            return await interaction.reply({ content: 'You do not have permission to give a user a timeout.', ephemeral: true });
        }

        if (member.user.bot) {
            return await interaction.reply({ content: `You cannot give ${member.displayName} a timeout.`, ephemeral: true });
        }

        if (member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            return await interaction.reply({ content: `You cannot give ${member.displayName} a timeout.`, ephemeral: true });
        }

        member.timeout(duration * 60 * 1000, `${!reason ? "Unspecified" : `${reason}`}`);
            console.log(`${user.username} was given a ${duration} minute timeout in ${member.guild.name}.`);
    
            const embed = new MessageEmbed()
            .setColor('#5866EF')
            .setAuthor({ name: `Timeout For ${user.tag}`, iconURL: user.avatarURL() })
            .setDescription(`${member.displayName} was given a ${duration} minute timeout.`)
            .addFields (
                { name: 'Reason', value: `${reason}`, inline: true }
            )
    
        await interaction.reply({ embeds: [embed] });  
    },
};