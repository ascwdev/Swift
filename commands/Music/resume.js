const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    usage: '`/resume`',
    permissions: 'none',
    data: new SlashCommandBuilder()
        .setName('resume')
        .setDescription('Resumes the current song.'),
    async execute({ client, interaction }) {
        const queue = client.player.getQueue(interaction.guild);

        if (!queue) {
            return await interaction.reply({ content: 'There is no song playing.', ephemeral: true });
        }

        const currentSong = queue.current;

        queue.setPaused(false);

        return await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor('#5866EF')
                    .setAuthor({name: 'Song Resumed', iconURL: client.user.avatarURL()})
                    .setDescription(`**[${currentSong.title}](${currentSong.url})** has resumed playing.`)
            ]
        })
    },
}