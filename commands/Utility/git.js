const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    description: 'Allows members to page information from [GitHub](https://github.com/).',
    usage: '`/git who <user>`\n`/git repo <user> <repository>',
    permissions: '`none`',
    data: new SlashCommandBuilder()
        .setName(`git`)
        .setDescription('Allows members to page information from GitHub.'),
    async execute({ interaction }) {
        await interaction.reply({ content: 'Pong!' });
    },
};