const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Displays the song queue.'),
    async execute({ client, interaction }) {
        const queue = client.player.getQueue(interaction.guild);

        if(!queue || !queue.playing) {
            return await interaction.reply({ content: 'There is no song playing.', ephemeral: true });
        }

        const queueString = queue.tracks.slice(0, 10).map((song, i) => {
            return `${i + 1}) **[${song.title}](${song.url})** \`[${song.duration}]\``;
        }).join("\n");

        // Get the current song
        const currentSong = queue.current

        return await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor('#5866EF')
                    .setAuthor({name: 'Song Queue', iconURL: client.user.avatarURL()})
                    .setDescription(`**Currently Playing**\n` + (currentSong ? `**[${currentSong.title}](${currentSong.url})** \`[${currentSong.duration}]\`` : "None") +`\n\n**Queue**\n${queueString}`)
                    .setThumbnail(currentSong.setThumbnail)
            ]
        });
    },
}