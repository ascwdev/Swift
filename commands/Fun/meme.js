const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');

module.exports = {
    name: '',
    description: '',
    usage: '',
    permissions: '',
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('Returns information from the Reddit API.'),
    async execute(interaction) {
       
    },
};