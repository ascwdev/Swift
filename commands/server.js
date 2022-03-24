const { SlashCommandBuilder, strikethrough } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Replies with Server Info!'),
    async execute(interaction) {
        const { guild } = interaction;
        // const { ownerId } = guild;

        const embed = new MessageEmbed()
            .setColor('#2F3136')
            .setTitle('Server Information')
            // .setDescription("")
            .setThumbnail( guild.iconURL() )
            .addFields(
                { name: 'Name', value: `${guild.name}` },
                { name: 'Created', value: `<t:${parseInt(guild.createdTimestamp / 1000)}:R>`, inline: true},
                { name: 'Owner', value: `<@${guild.ownerId}>`, inline: true },
                { name: 'Custom Emotes', value: guild.emojis.cache.map((e) => `${e}`).join(" ") },
                { name: 'Members', value: `${guild.memberCount}` }
            );

        await interaction.reply({ embeds: [embed] });
    },
};