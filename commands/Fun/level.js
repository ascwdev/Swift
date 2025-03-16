const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    usage: '`/level <game> [level]`',
    permissions: '`none`',
    data: new SlashCommandBuilder()
        .setName('level')
        .setDescription('Displays level information for Souls games.')
        .addStringOption(option =>
            option 
                .setName('game')
                .setDescription('The game you want level range information on.')
                .addChoices(
                    { name: 'Dark Souls', value: 'ds1'},
                    { name: 'Dark Souls III', value: 'ds3'},
                    { name: 'Bloodborne', value: 'bb'},
                    { name: 'Elden Ring', value: 'er'}
                )
                .setRequired(true))
        .addNumberOption(option =>
            option
                .setName('level')
                .setDescription('The level you want the range from.')
                .setRequired(true)),
    async execute({ interaction }) {
        const game = interaction.options.getString('game');        
        const level = interaction.options.getNumber('level');

        if (game === 'ds1') {
            const upperLimitInvader = Math.ceil(level + 20 + (level * 0.1));
            const lowerLimitInvader = Math.ceil(level - (level * 0.1));

            const upperLimitCoop = Math.ceil(level + 10 + (level * 0.1));
            const lowerLimitCoop = Math.ceil(level - 10 - (level * 0.1));

            const upperLimitCovenant = Math.ceil(level + (level * 0.1));
            const lowerLimitCovenant = Math.ceil(level - 20 + (level * 0.2));

            const embed = new EmbedBuilder()
                .setColor('#5866EF')
                .setAuthor({name: `Level Range Calculator`, iconURL: interaction.user.avatarURL()})
                .setDescription(`Level ranges for a character at **SL${level}**.\nFormulas can be found **[here](http://darksouls.wikidot.com/online-matchmaking)**.`)
                .addFields (
                    { name: `<:red_eye:1015554841780703252> Invader`, value: `Level ${lowerLimitInvader} - ${upperLimitInvader}`, inline: true},
                    { name: '<:cat_covenant:1015555253178990602> Covenant', value: `Level ${lowerLimitCovenant} - ${upperLimitCovenant}`, inline: true},
                    { name: '<:white_soapstone:1015558078755786753> Co-Op', value: `Level ${lowerLimitCoop} - ${upperLimitCoop}`, inline: true},
                )
                .setFooter({text: '(Blue Spirits share the same range formula as other invaders in DS1).'})

            return await interaction.reply({ embeds: [embed] });

        } 
        else if (game === 'ds3') {
            if (level >= 351) {
                return await interaction.reply({ content: `Level **${level}** is out of range. \n\n*"As of Regulation 1.35 the Upper Limit is removed if you're Soul Level 351 or above - but without a password you will not be able to do matchmaking with anyone below Soul Level 351."*`, ephemeral: true})
            }

            // Dark Spirit range formula
            const upperLimitRed = Math.ceil(level * 1.1 + 20);
            const lowerLimitRed = Math.ceil(level * 0.9);
            
            // Moundmaker range formula
            const upperLimitPurple = Math.ceil(level * 1.15 + 20);
            const lowerLimitPurple = Math.ceil(level * 0.9);
            
            // Aldrich Faithful etc. range formula
            const upperLimitCovenant = Math.ceil(level * 1.1);
            const lowerLimitCovenant = Math.ceil(level * 0.8 - 20);
        
            // Summon range formula
            const upperLimitCoop = Math.ceil(level * 1.1 + 10);
            const lowerLimitCoop = Math.ceil(level * 0.9 - 10);
            
            // Blue Spirit range formula
            const upperLimitBlue = Math.ceil(level * 1.1 + 15);
            const lowerLimitBlue = Math.ceil(level * 0.9 - 15);

            const embed = new EmbedBuilder()
                .setColor('#5866EF')
                .setAuthor({name: `Level Range (DS3)`, iconURL: interaction.user.avatarURL()})
                .setDescription(`Level ranges for a character at **SL${level}**.\nFormulas can be found **[here](https://www.reddit.com/r/darksouls3/comments/64iw3i/the_patches_notes_113_date_to_be_defined/?utm_source=share&utm_medium=web2x&context=3)**.`)
                .addFields (
                    { name: `<:red_eye:1015558228962193468> Dark Spirit`, value: `Level ${lowerLimitRed} - ${upperLimitRed}`, inline: true},
                    { name: '<:mound_maker:1015558345966501918> Mad Phantom', value: `Level ${lowerLimitPurple} - ${upperLimitPurple}`, inline: true },
                    { name: '<:aldrich_faithful:1015558228962193468> Covenant', value: `Level ${lowerLimitCovenant} - ${upperLimitCovenant}`},
                    { name: '<:white_soapstone:1015558804533936150> Co-Op', value: `Level ${lowerLimitCoop} - ${upperLimitCoop}`, inline: true},
                    { name: '<:blue_eye:1015558345966501918> Blue Spirit', value: `Level ${lowerLimitBlue} - ${upperLimitBlue}`, inline: true },
                )
                
            return await interaction.reply({ embeds: [embed] });

        } 
        else if (game === 'bb') {
            
            const upperLimitSinister = Math.ceil(level + 20 + (level * 0.1))
            const lowerLimitSinister = Math.ceil(level - (level * 0.1))


            const upperLimitBeckoning = Math.ceil(level + (level * 0.1) + 10);
            const lowerLimitBeckoning = Math.ceil(level - (level * 0.1) - 10);
            
            const embed = new EmbedBuilder()
                .setColor('#5866EF')
                .setAuthor({name: `Level Range (BB)`, iconURL: interaction.user.avatarURL()})
                .setDescription(`Level ranges for a character at **BL${level}**.\nFormulas can be found **[here](https://bloodborne.fandom.com/wiki/Network_Play)**.`)
                .addFields (
                    { name: `<:sinister_bell:1015558228962193468> Sinister Bell`, value: `Level ${lowerLimitSinister} - ${upperLimitSinister}`, inline: true},
                    { name: '<:beckoning_bell:1015558228962193468> Beckoning Bell', value: `Level ${lowerLimitBeckoning} - ${upperLimitBeckoning}`, inline: true },
                )
                
            return await interaction.reply({ embeds: [embed] });
        } 
        else if (game === 'er') {
            const upperLimitCoop = Math.ceil(level * 1.1 + 10);
            const lowerLimitCoop = Math.ceil(level * 0.9 - 10);

            const upperLimitRed = Math.ceil(level * 1.1 + 20);
            const lowerLimitRed = Math.ceil(level * 0.9);

            const embed = new EmbedBuilder()
                .setColor('#5866EF')
                .setAuthor({name: `Level Range (ER)`, iconURL: interaction.user.avatarURL()})
                .setDescription(`Level ranges for a character at **RL${level}**.\nFormulas can be found **[here](https://www.reddit.com/r/Eldenring/comments/t7620i/unofficial_matchmaking_information/)**.`)
                .addFields (
                    { name: `<:furled_finger:1015558345966501918> Co-Op`, value: `Level ${lowerLimitCoop} - ${upperLimitCoop}`, inline: true},
                    { name: '<:recusant_finger:1015558345966501918> Invader', value: `Level ${lowerLimitRed} - ${upperLimitRed}`, inline: true },
                )
            
            return await interaction.reply({ embeds: [embed] });

        }
    
    },
}
