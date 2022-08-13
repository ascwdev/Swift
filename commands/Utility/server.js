const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'server',
    description: 'Returns a report of relevant server information.',
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
            .setDescription('A multi-purpose bot designed for niche servers! Invite Swift today: [swift.io/invite](https://swift.io/invite)') // .setDescription(`${guild.description}`)
            .setThumbnail( guild.iconURL() ) 
            .setFooter({text: `ID: ${guild.id}`})
            .setImage( 'https://i.imgur.com/XpjK8bx.png' ) // guild.bannerURL()
            .addFields(
                { name: 'Guild Master', value: `<@${guild.ownerId}>`, inline: true },
                { name: 'Created', value: `<t:${parseInt(guild.createdTimestamp / 1000)}:R>`, inline: true},
                { name: 'Members', value: `${guild.memberCount}`, inline: true},
                { name: 'Custom Emotes', value: guild.emojis.cache.map((e) => `${e}`).join(" ") } 
            );

        await interaction.reply({ embeds: [embed] });
    },
};