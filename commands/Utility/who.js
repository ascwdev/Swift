const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'who',
    description: 'Returns information on the specified user.',
    usage: '`/who <user>`',
    permissions: 'none',
    data: new SlashCommandBuilder()
        .setName('who')
        .setDescription('Returns information on a given user.')
        .addUserOption (option =>
            option.setName('user')
                .setDescription('The user you want information on.')
                .setRequired(true)),
    async execute({ interaction }) {
        const user = interaction.options.getUser('user');
        const member = interaction.options.getMember('user');
        let roleList = member.roles.cache.map(r => r).join(' ').replace("@everyone", " ");

    // Check if specified user is a guild member. If not, return error.
    if (!member) {
        return await interaction.reply({ content: "Couldn't find the specified user.", ephemeral: true });
    }
    
    // Check if specified user has any roles. If not, return "None".
    if (roleList === " ") {
        roleList = "None";
    }

    const embed = new EmbedBuilder()
        .setColor('#5866EF')
        .setAuthor({name: user.tag, iconURL: user.avatarURL()})
        .setThumbnail ( user.avatarURL() )
        .setFooter({ text: `ID: ${user.id}`})
        .addFields(
            // { name: 'Status', value: `${activity.name}`},
            { name: 'Joined', value: `<t:${parseInt(member.joinedTimestamp / 1000)}:R>`, inline: true},
            { name: 'Registered', value: `<t:${parseInt(user.createdTimestamp / 1000)}:R>`, inline: true},
            { name: ':shield: Roles', value: `${roleList}` }
        );

        await interaction.reply({ embeds: [embed] });
    },
};