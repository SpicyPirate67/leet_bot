
module.exports = {
    name: "interactionCreate",

    async execute(interaction) {
        if (!interaction.isCommand()) return

        const DiscordClient = interaction.client
        const command = DiscordClient.commands.get(interaction.commandName)

        if (!command) return

        await command.execute(interaction)
            .catch(err => console.log(err))
    }
}