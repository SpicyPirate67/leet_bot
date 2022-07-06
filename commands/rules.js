
const { SlashCommandBuilder } = require("@discordjs/builders")

const message = "Rey can do this bit"

module.exports = {
    data: new SlashCommandBuilder()
        .setName("rules")
        .setDescription("This is how to use me"),

    async execute(interaction) {
        await interaction.reply(message)
    }
}