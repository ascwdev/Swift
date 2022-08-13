const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'stop',
    description: 'Stops the music player.',
    usage: '`/stop`',
    permissions: 'none',
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stops the music player.'),
    async execute({ client, interaction }) {
        const queue = client.player.getQueue(interaction.guild);

        if (!queue) {
            return await interaction.reply({ content: 'There is no song playing.', ephemeral: true });
        }

        queue.destroy();

        return await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor('#5866EF')
                    .setAuthor({name: 'Song Stopped', iconURL: client.user.avatarURL()})
                    .setDescription(`The music player has been stopped.`)
            ]
        });
    },
}