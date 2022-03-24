const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('who')
        .setDescription('Returns information on a given user.')
        .addUserOption (option =>
            option.setName('user')
                .setDescription('The user you want information on.')
                .setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const member = interaction.options.getMember('user');
        const embed = new MessageEmbed()
        .setColor('#2F3136')
        .setAuthor({name: user.tag, iconURL: user.avatarURL()})
        .setThumbnail ( user.avatarURL() )
        .setTitle('User Information')
        .setFooter({ text: `ID: ${user.id}`})
        .addFields(
            { name: 'Name', value: `<@${user.id}>` },
            { name: `Date Joined`, value: `<t:${parseInt(member.joinedTimestamp / 1000)}:R>`, inline: true},
            { name: 'Date Created', value: `<t:${parseInt(user.createdTimestamp / 1000)}:R>`, inline: true},
            { name: ':shield: Roles', value: `${member.roles.cache.map(r => r).join(' ').replace("@everyone", " ")}` }
        );

        await interaction.reply({ embeds: [embed] });
    },
};