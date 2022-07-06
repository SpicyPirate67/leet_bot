
const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("scoreboard")
        .setDescription("Returns a score, based on option parsed")
        .addStringOption(option => 
            option.setName("option")
                .setDescription("Use [all] for everyones score, \n\t\t\t [$username] for someones score, \n\t\t\t leave blank for your score")),

    async execute(interaction) {
        LeetObject = interaction.guild.guildLeetTime
        LeetObject.scoreBoard(interaction)
    }
}