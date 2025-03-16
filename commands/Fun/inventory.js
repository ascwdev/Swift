const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('inventory')
        .setDescription('Calculates the aggregate value of the Steam user\'s inventory..')
        .addStringOption(option =>
            option
            .setName('user')
            .setDescription('The Steam user ID to fetch information from.')
            .setRequired(true)),
    async execute({ interaction }) {
        const user = interaction.options.getString(`user`);

        let post = await fetch(`http://steamcommunity.com/id/${user}/inventory/json/753/1`).then(res =>
            res.json());
    },
}
