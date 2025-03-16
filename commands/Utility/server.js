const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    usage: '`/server`',
    permissions: 'none',
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Replies with Server Info!'),
    async execute({ interaction }) {
        const { guild } = interaction;
        // const { ownerId } = guild;

        const embed = new EmbedBuilder()
            .setColor('#5866EF')
            .setTitle(`${guild.name}`)
            .setAuthor({name: 'Server Info', iconURL: guild.iconURL()})
            .setDescription(guild.description) // .setDescription(`${guild.description}`)
            .setThumbnail(guild.iconURL())
            .setFooter({text: `ID: ${guild.id}`})
            .setImage(guild.bannerURL())
            .addFields(
                { name: 'Guild Master', value: `<@${guild.ownerId}>`, inline: true },
                { name: 'Created', value: `<t:${parseInt(guild.createdTimestamp / 1000)}:R>`, inline: true},
                { name: 'Members', value: `${guild.memberCount}`, inline: true},
                { name: 'Custom Emotes', value: guild.emojis.cache.map((e) => `${e}`).join(" ") } 
            );

        await interaction.reply({ embeds: [embed] });
    },
};