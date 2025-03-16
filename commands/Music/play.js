const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
    usage: '`/play <song>`',
    permissions: 'none',
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Plays a song.')
        .addStringOption(option =>
            option
                .setName('song')
                .setDescription('The song to search for.')
                .setRequired(true)
        ),
    async execute({ client, interaction }) {

            // await interaction.deferReply();

        if (!interaction.member.voice.channel) {
            return await interaction.reply({ content: 'You must be in a voice channel to use this command.', ephemeral: true });
        }

        const queue = await client.player.createQueue(interaction.guild);

        if (!queue.connection) {
            await queue.connect(interaction.member.voice.channel);
        }

        let query = interaction.options.getString('song');

        const result = await client.player.search(query, {
            requestedBy: interaction.user,
            searchEngine: QueryType.AUTO,
        });

        if (result.tracks.length === 0) {
            return await interaction.reply({ content: 'No results found.', ephemeral: true });
        }

        const song = result.tracks[0];
        await queue.addTrack(song);

        let embed = new EmbedBuilder();

        embed
            .setColor('#5866EF')
            .setTitle(`${song.title}`)
            .setURL(`${song.url}`)
            .setAuthor({name: 'Song Added', iconURL: client.user.avatarURL()})
            .setDescription(`Song added to the queue.`)
            .setThumbnail(song.thumbnail)
            .setFields(
                { name: 'Duration', value: `${song.duration}`}
                );

        if (!queue.playing) {
            await queue.play();
        }

        return await interaction.reply({ embeds: [embed] });
    },
}
