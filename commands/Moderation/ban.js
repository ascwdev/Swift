const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'Bans a specified user. Additionally, a reason can be specified as well as a ban duration (in days).',
    usage: '`/ban`',
    permissions: '`BAN_MEMBERS`',
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans a user from the server.')
        .addUserOption (option =>
            option.setName('user')
                .setDescription('The user you want to ban.')
                .setRequired(true))
        .addStringOption (option =>
            option.setName('reason')
                .setDescription('The reason for banning the user.')
                .setRequired(false)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const member = interaction.options.getMember('user');
        const reason = interaction.options.getString('reason');   
    
        if (!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {    
            return await interaction.reply({ content: 'You do not have permission to ban a user.', ephemeral: true });
        }

        if (!member) {
            return await interaction.reply({ content: 'The specified user is not a part of this guild.', ephemeral: true});
        }

        if (member.user.bot) {
            return await interaction.reply({ content: `You cannot ban ${member.displayName}.`, ephemeral: true });
        }
        
        if (member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            return await interaction.reply({ content: `You cannot ban ${member.displayName}.`, ephemeral: true });
        }

        member.ban({reason:`${!reason ? "Unspecified" : `${reason}`}`});
        console.log(`${member.displayName} was banned from ${member.guild.name}.`);

        const embed = new MessageEmbed()
            .setColor('#5866EF')
            .setAuthor({name: `Banned ${user.tag}`, iconURL: user.avatarURL()})
            .setDescription(`${member.displayName} was banned.`)
            .addFields (
                { name: 'Reason', value: `${reason}`, inline: true },
            );
            
        await interaction.reply({ embeds: [embed] });
    },
};