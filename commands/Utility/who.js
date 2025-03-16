const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    usage: '`/who <member>`',
    permissions: 'none',
    data: new SlashCommandBuilder()
        .setName('who')
        .setDescription('Returns information on a given member.')
        .addUserOption (option =>
            option.setName('member')
                .setDescription('The member you want information on.')
                .setRequired(true)),
    async execute({ interaction }) {
        const user = interaction.options.getUser('member');
        const member = interaction.options.getMember('member');
        let roleList = member.roles.cache.map(r => r).join(' ').replace("@everyone", " ");

    // Check if specified user is a guild member. If not, return error.
    if (!member) {
        return await interaction.reply({ content: "Couldn't find the specified member.", ephemeral: true });
    }
    
    // Check if specified user has any roles. If not, return "None".
    if (roleList === " ") {
        roleList = "None";
    }

    const embed = new EmbedBuilder()
        .setColor('#5866EF')
        .setAuthor({name: user.tag, iconURL: user.avatarURL()})
        .setThumbnail ( user.avatarURL() )
        .setFooter({ text: `ID: ${user.id}`})
        .addFields(
            // { name: 'Status', value: `${activity.name}`},
            { name: 'Joined', value: `<t:${parseInt(member.joinedTimestamp / 1000)}:R>`, inline: true},
            { name: 'Registered', value: `<t:${parseInt(user.createdTimestamp / 1000)}:R>`, inline: true},
            { name: `:shield: Roles (${member.roles.cache.size - 1})`, value: `${roleList}` },
        );
        
        
        // Check if a member has a status. If no status, dont add embed field.
        if (!member.presence?.activities || member.presence.activities.length === 0) {

        }
        else {
            const activity = member.presence.activities[0];
            
            // Create an array to translate enums into strings.
            const status = {
                0: 'Playing',
                1: 'Streaming',
                2: 'Listening',
                3: 'Watching',
                4: '',
                5: 'Competing'
            }

            embed.addFields({ name: 'Status', value: `${status[activity.type]} ${activity.name}` });
        }

        await interaction.reply({ embeds: [embed] });
    },
};