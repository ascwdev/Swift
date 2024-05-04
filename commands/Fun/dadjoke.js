const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    description: 'Replies with a dad joke. They\'re terrible.',
    usage: '`/dadjoke`',
    permissions: '`none`',
    data: new SlashCommandBuilder()
        .setName('dadjoke')
        .setDescription('Replies with a dad joke. They\'re terrible.'),
    async execute({ interaction }) {
        const response = await fetch(`https://icanhazdadjoke.com`, {
            method: "GET",
            headers: { Accept: "application/json" }
        });
        const data = await response.json();
        const embed = new EmbedBuilder()
            .setColor('#5866EF')
            .setAuthor({name: `Dad Joke`, iconURL: `https://i.imgur.com/zqhNpO1.png`})
            .setDescription(data.joke);

        await interaction.reply({ embeds: [embed] });
    },
};