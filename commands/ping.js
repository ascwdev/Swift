const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong. Debugging tool.'),
    async execute(interaction) {
        await interaction.reply({ content: 'Pong!' });
    },
};