
const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Lists my commands"),

    async execute(interaction) {
        const commands = interaction.client.commands
        var message = "Here are my commands!! \n"

        commands.forEach( (value, key) => {
            NewMessage = message.concat(`\n /${key}: ${commands.get(key).data.description}`)
            message = NewMessage

            let options = commands.get(key).data.options

            if (options.length > 0) {
                NewMessage = message.concat(`\n \t\t ${options[0].name}: ${options[0].description}`)
                message = NewMessage
            }
        })

        await interaction.reply({ content: message, ephemeral: true})
            .catch(err => {
                console.log(err)
                interaction.reply({ content: "Oops something went wrong", ephemeral: true})
            })
    }
}