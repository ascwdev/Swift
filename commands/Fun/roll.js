const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'roll',
    description: 'Rolls for a random number between 1 and a specified maximum.',
    usage: '`/roll <number>`',
    permissions: '`none`',
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Rolls for a random number between 1 and a specified maximum.')
        .addNumberOption (option =>
            option.setName('number')
                .setDescription('The maximum value you wish for the roll to be between.')
                .setRequired(true)),
    async execute({ interaction }) {
        const number = interaction.options.getNumber('number');
        
        const min = Math.ceil(1);
        const max = Math.floor(number);
        const total = Math.floor(Math.random() * (max - min) + min);
        
        const wait = require('node:timers/promises').setTimeout;

        const embed = new MessageEmbed()
            .setColor('#5866EF')
            .setAuthor({name: `Dice Roll`, iconURL: `https://i.imgur.com/39fsK14.png`})
            .setDescription(`${interaction.member.displayName} rolls the **d${max}**.`);


        await interaction.reply({ embeds: [embed] });
        await wait(2000);
        embed.setDescription(`${interaction.member.displayName} rolled **${total}**.`);
		await interaction.followUp({ embeds: [embed] });                     
    },
}


