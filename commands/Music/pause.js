const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pauses the current song.'),
    async execute({ client, interaction }) {
        const queue = client.player.getQueue(interaction.guild);

        if (!queue) {
            return await interaction.reply({ content: 'There is no song playing.', ephemeral: true });
        }

        const currentSong = queue.current;

        queue.setPaused(true);

        return await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor('#5866EF')
                    .setAuthor({name: 'Song Paused', iconURL: client.user.avatarURL()})
                    .setDescription(`**[${currentSong.title}](${currentSong.url})** has been paused.`)
            ]
        });
    },
}