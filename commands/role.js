const { SlashCommandBuilder, strikethrough } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('role')
        .setDescription("Displays information about a role.")
        .addRoleOption (option =>
            option.setName('role')
                .setDescription('The role you want information on.')
                .setRequired(true)),
    async execute(interaction) {
        const role = interaction.options.getRole('role');
        // const rolePermissions = role.permissions.toArray();

        const embed = new MessageEmbed()
        .setColor('#5866EF')
        .setDescription(`<@&${role.id}> was created <t:${parseInt(role.createdTimestamp / 1000)}:R>`)
        .setAuthor({ name: 'Role Info', iconURL: interaction.guild.iconURL()})
        .addFields(
            { name: 'Name', value: `${role.name}`, inline: true },
            { name: 'ID', value: `${role.id}`, inline: true },
            { name: 'Hoisted?', value: `${role.hoist}`, inline: true },
            { name: `Permissions (${role.permissions.toArray().length})`, value: '`' + `${role.permissions.toArray(p => p).join('`, `')}` + '`'}
        );

        await interaction.reply({ embeds: [embed] });
    },
};