const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, Permissions } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Displays a help command.',
    usage: '`/help`\n`/help <command>`',
    permissions: '`none`',
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Swift will display the help menu. Follow /help with a command to get more info on it.')
        .addStringOption(option =>
            option.setName('command')
                .setDescription('Specify a command for more information on it.')
                .setRequired(false)),       
    async execute(interaction) {
        const { client } = interaction;
        const string = interaction.options.getString('command');

        // Get module.exports from command, match command name with specified <command> string.
        const command = client.commands.get(`${string}`);

        const embed = new MessageEmbed()
        .setColor('#5866EF')
        .setAuthor({name: 'Swift Help', iconURL: client.user.avatarURL()})

        // Return general help menu if input isn't a command.
        if (!command) {
            const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel('Full Command List')
                    .setStyle('LINK')
                    .setURL('https://github.com/ascwnyc/Swift#readme'),
            );

                embed.setDescription("I'm a multi-purpose discord bot designed for niche servers.\nHeres a list of commands.\n\nUse `/help <command>` for extended information on a command.\n\n**Support:** [tfiws.io/support](https://tfiws.io/support)\n**Invite:** [tfiws.io/invite](https://tfiws.io/invite)\n\nFor a full list of commands, follow the **link** at the bottom.")
                embed.addFields(
                    { name: ':stars: Main', value: '`/help`, `/who`, `/played`' },
                    { name: ':game_die: Fun', value: '`/roll`, `/flip`, `/dnd`, `/pvp`, `/duel`' },
                    { name: ':tools: Utility', value: '`/server`' },
                    { name: ':shield: Moderation', value: '`/kick`, `/ban`, `/unban`, `/timeout`, `/banlist`, `/role`' },
                    { name: ':gear: Settings', value: '`/automod`' } 
                )
                embed.setFooter({text: 'Swift is currently in its early stages of development!\nIf you have any feedback, please join our support server - tfiws.io/join'});

            return await interaction.reply({ embeds: [embed], components: [row] });
        }
        
        embed.setTitle(`/${command.name}`)
        embed.setDescription(`${command.description}`)
        embed.setFields( 
            { name: 'Usage', value: `${command.usage}`, inline: true},
            { name: 'Permissions', value: `${command.permissions}`, inline: true}
        );

        await interaction.reply({ embeds: [embed] });
    },
};