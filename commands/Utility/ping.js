const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    usage: '',
    permissions: '',
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong. Debugging tool.'),
    async execute({ interaction }) {
        await interaction.reply({ content: 'Pong!' });
    },
};