const { SlashCommandBuilder, strikethrough, memberNicknameMention } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    description: "Inspects a given role. Further commands can be issued to modify a member's role.",
    usage: '`/role info <role>`\n`/role add <role> [member]`\n`/role remove <role> [member]`',
    permissions: '`ManageRoles`',
    data: new SlashCommandBuilder()
        .setName('role')
        .setDescription("Allows users to moderate guild roles and inspect individual roles.")
        .addSubcommand(subcommand => subcommand
            .setName('info')
            .setDescription('Retrieves information on the specified role.')
            .addRoleOption (option => option
                .setName('role')
                .setDescription('The role you want information on.')
                .setRequired(true)))

        .addSubcommand(subcommand => subcommand
            .setName('add')
            .setDescription('Adds a role to a specified member.')
            .addUserOption(option => option
                .setName('member')
                .setDescription('The member you want to add to a role.')
                .setRequired(true))
            .addRoleOption(option => option
                .setName('role')
                .setDescription('The role you want to add to the member to.')
                .setRequired(true)))

        .addSubcommand(subcommand => subcommand
            .setName('remove')
            .setDescription('Removes a role to a specified member')
            .addUserOption(option => option
                .setName('member')
                .setDescription('The member you want to remove from a role.')
                .setRequired(true))
            .addRoleOption(option => option
                .setName('role')
                .setDescription('The role you want a member to be removed from.')
                .setRequired(true))),
    async execute({ interaction }) {
        if (interaction.options.getSubcommand() === 'add') {
            const member = interaction.options.getMember('member');
            const role = interaction.options.getRole('role');

            if(!member) {
                return await interaction.reply({content: 'The specified member is not a part of this guild.', ephemeral: true})
            }

            if(member.roles.cache.has(role.id)) {
                return await interaction.reply({content: 'The specified member already is a part of this role.', ephemeral: true})
            }

            member.roles.add(role);

            const embed = new EmbedBuilder()
                .setColor('#5866EF')
                .setDescription(`${member} was added to ${role}.`)
                .setAuthor({ name: 'Role Change', iconURL: interaction.guild.iconURL()})

            return await interaction.reply({ embeds: [embed] })
        }
        else if (interaction.options.getSubcommand() === 'remove') {
            const member = interaction.options.getMember('member');
            const role = interaction.options.getRole('role');

            if(!member.roles.cache.has(role.id)) {
                return await interaction.reply({content: 'The specified member does not have this role.', ephemeral: true})
            }

            member.roles.remove(role);

            const embed = new EmbedBuilder()
                .setColor('#5866EF')
                .setDescription(`${member} was removed from ${role}.`)
                .setAuthor({ name: 'Role Change', iconURL: interaction.guild.iconURL()})

            return await interaction.reply({ embeds: [embed] })
        }
        else if (interaction.options.getSubcommand() === 'info') {
            const role = interaction.options.getRole('role');

            const embed = new EmbedBuilder()
                .setColor('#5866EF')
                .setDescription(`<@&${role.id}> was created <t:${parseInt(role.createdTimestamp / 1000)}:R>`)
                .setAuthor({ name: 'Inspect Role', iconURL: interaction.guild.iconURL()})
                .addFields(
                    { name: 'Name', value: `${role.name}`, inline: true },
                    { name: 'ID', value: `${role.id}`, inline: true },
                    { name: 'Hoisted?', value: `${role.hoist}`, inline: true },
                    { name: `Permissions (${role.permissions.toArray().length})`, value: '`' + `${role.permissions.toArray(p => p).join('`, `')}` + '`'}
                );

            return await interaction.reply({ embeds: [embed] });
        }
    },
};