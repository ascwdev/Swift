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

        const isCommand = client.commands.get(`${string}`);

        const embed = new MessageEmbed()
        .setColor('#5866EF')
        .setAuthor({name: 'Swift Help', iconURL: client.user.avatarURL()})

        if (!isCommand) {
            const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel('Full Command List')
                    .setStyle('LINK')
                    .setURL('https://google.com/'),
            );

                embed.setDescription("I'm a multi-purpose discord bot designed for niche servers.\nHeres a list of commands.\n\nUse `/help <command>` for extended information on a command.\n\n**Support:** [swift.io/support](https://swift.io/support)\n**Invite:** [swift.io/invite](https://swift.io/invite)\n\nFor a full list of commands, follow the **link** at the bottom.")
                embed.addFields(
                    { name: ':stars: Main', value: '`/help`, `/who`, `/played`' },
                    { name: ':game_die: Fun', value: '`/roll`, `/flip`, `/dnd`, `/pvp`, `/duel`' },
                    { name: ':tools: Utility', value: '`/server`' },
                    { name: ':shield: Moderation', value: '`/kick`, `/ban`, `/unban`, `/timeout`, `/banlist`, `/role`' },
                    { name: ':gear: Settings', value: '`/automod`' } 
                )
                embed.setFooter({text: 'Swift is currently in its early stages of development!\nIf you have any feedback, please join our support server - swift.io/join'});

            return await interaction.reply({ embeds: [embed], components: [row] });
        }


        // Get module.exports from command, match command name with specified <command> string.
        const command = client.commands.get(`${string}`);
        
        embed.setTitle(`/${command.name}`)
        embed.setDescription(`${command.description}`)
        embed.setFields( 
            { name: 'Usage', value: `${command.usage}`, inline: true},
            { name: 'Permissions', value: `${command.permissions}`, inline: true}
        );

        await interaction.reply({ embeds: [embed] });
    },
};