const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    description: 'Allows members to page information from [GitHub](https://github.com/).',
    usage: '`/git who <user>`\n`/git repo <user> <repository>`',
    permissions: '`none`',
    data: new SlashCommandBuilder()
        .setName(`git`)
        .setDescription('Allows members to page information from GitHub.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('who')
                .setDescription('Retrieves info about a specified GitHub user.')
                .addStringOption(option => 
                    option
                        .setName('user')
                        .setDescription('The GitHub user you want info on.')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
		subcommand
			.setName('repo')
			.setDescription('Retrieves info about a GitHub user\'s repository.')
			.addStringOption(option => 
                option
                    .setName('user')
                    .setDescription('The GitHub user whose repositories you wish to get info from.')
                    .setRequired(true))
            .addStringOption(option =>
                option
                    .setName('repository')
                    .setDescription('The name of the repository you want info on.')
                    .setRequired(true))),
    async execute({ client, interaction }) {
        const user = interaction.options.getString('user');
        const repo = interaction.options.getString('repository');

        let embed = new EmbedBuilder()
            .setColor('#5866EF');

        if (interaction.options.getSubcommand() === 'who') {
            const response = await fetch(`https://api.github.com/users/${user}`);
            const data = await response.json();

            if (data.message) {
                return await interaction.reply({ content: 'The specified GitHub user could not be found.', ephemeral: true });
            }

            await interaction.deferReply();

            if (!/^https?:\/\//i.test(data.blog)) {
                data.blog = 'https://' + data.blog;
            }

            let twitter = `• [Twitter](https://twitter.com/${data.twitter_username})`;
            let blog = `• [Website](${data.blog})`;
            let repos = `• [Repositories](${data.repos_url})`;
            let profile = `• [Profile](${data.html_url})`;

            let links = `${!data.twitter_username ? `` : `${twitter}`}\n${!data.blog || data.blog == 'https://' ? `` : `${blog}`}\n${!data.repos_url ? `` : `${repos}`}\n${!data.html_url ? `` : `${profile}`}`;

            embed
                .setAuthor({name: `${data.login}`, iconURL: data.avatar_url});    

            if (data.bio) {
                embed.addFields({ name: `:question: About`, value: `${data.bio}`});
            }

            if (data.location) {
                embed.addFields({ name: `:globe_with_meridians: Location`, value: `${data.location}`, inline: true});
            }        

            embed
                .addFields(
                    { name: `Joined`, value: `<t:${Math.floor(new Date(data.created_at).getTime() / 1000)}:R>`, inline: true})

            embed
                .addFields(

                    { name: `:link: Links`, value: `${links}`, inline: true},
                );

            embed
                .setThumbnail(data.avatar_url)
                .setFooter({ text: `ID: ${data.id}` });
            
            return await interaction.editReply({ embeds: [embed] });

        }
        else if (interaction.options.getSubcommand() === 'repo') {

        }
    },
};