const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Swift will display the help menu. Follow /help with a command to get more info on it.')
        .addStringOption(option =>
            option.setName('command')
                .setDescription('Specify a command for more information on it.')
                .setRequired(false)),       
    async execute(interaction) {

        // setup MessageEmbed & <command> option...
        const string = interaction.options.getString('command');
        const embed = new MessageEmbed()
        .setColor('#2F3136')

        if (string == 'server') {

                embed.setTitle('/server')
                embed.setDescription("Returns a report of relevant server information.")
                embed.setFields( 
                    { name: 'Usage', value: '`/server`', inline: true},
                    { name: 'Permissions', value: '`none`', inline: true}
                );

                await interaction.reply({ embeds: [embed] });
        }
        else if (string == 'who') {

                embed.setTitle('/who')
                embed.setDescription("Returns information on the specified user.")
                embed.setFields( 
                    { name: 'Usage', value: '`/who <user>`', inline: true},
                    { name: 'Permissions', value: '`none`', inline: true}
                );

                await interaction.reply({ embeds: [embed] });            
        }
        else {
            const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel('Full Command List')
                    .setStyle('LINK')
                    .setURL('https://google.com/'),
            );
            
                embed.setColor('#2F3136')
                embed.setTitle('Help')
                embed.setDescription("Below is a list of commands available for Swift. It has been organised by the popularity and frequency of use.\n\nUse `/help <command>` for more detail on a command's functionality.\n\nFor a full list of commands, follow the **link** at the bottom.")
                embed.addFields(
                    { name: ':stars: Main', value: '`/help`, `/who`' },
                    { name: ':game_die: Fun', value: '`/reddit`, `/dnd`' },
                    { name: ':shield: Moderation', value: '`/mute`, `/unmute`, `/kick`, `/ban`, `/role`' },
                    { name: ':hammer: Admin', value: '`/server`, `/ping`' },
                    { name: ':gear: Settings', value: '`/automod`' },
            );

            await interaction.reply({ embeds: [embed], components: [row] });
        }
    },
};