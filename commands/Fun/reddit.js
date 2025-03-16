const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    usage: '`/reddit <subreddit>`',
    permissions: '`none`',
    data: new SlashCommandBuilder()
        .setName('reddit')
        .setDescription('Returns information from the Reddit API.')
        .addStringOption(option =>
                option
                    .setName('subreddit')
                    .setDescription('The subreddit to fetch a post from.')
                    .setRequired(true)),
    async execute({ interaction }) {
        const sub = interaction.options.getString(`subreddit`);

        try {
            await interaction.deferReply();
            // Fetch post from user-defined subreddit. Solely numeric subreddits (e.g: '196') instead point to the count function and therefore don't work as intended.
            let post = await fetch(`https://meme-api.com/gimme/${sub}`).then(res =>
            res.json());
            

            // console.log(post);

            // If the post returns an error code, defer the user to this message.
            if(post.code) {
                return await interaction.editReply({ content: post.message, ephemeral: true})
            }

            // If the post is nsfw and the channel isn't age-restricted, defer the user to this message.
            if(post.nsfw && !interaction.channel.nsfw) {
                return await interaction.editReply({ content: `Due to the adult content of this post, it can only be posted to Age-Restricted Channels.\n*(Age Restriction can be applied in the* ***channel settings*** *tab)*.`, ephemeral: true })
            }

            // Initially defer the reply to give Swift a chance to fetch and respond.
            //await interaction.deferReply();

            const embed = new EmbedBuilder()
            .setColor('#5866EF')
            .setAuthor({name: `u/${post.author}`, url: `https://reddit.com/user/${post.author}`})
            .setTitle(`${post.title}`)
            .setURL(post.postLink)
            .setDescription(`:arrow_up: Upvotes: ${post.ups}`)
            .setFooter({text: `r/${post.subreddit}`, iconURL: `https://redditinc.com/hs-fs/hubfs/Reddit%20Inc/Brand/Reddit_Logo.png?width=400&height=400&name=Reddit_Logo.png`})
            .setImage(post.url);

            await interaction.editReply({ embeds: [embed] });  

        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('request was aborted');
            }
        }
    },
};