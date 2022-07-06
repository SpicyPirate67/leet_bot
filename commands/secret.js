
const { SlashCommandBuilder } = require("@discordjs/builders")
const { secretUser } = require("../config.json")
const { secretUserID } = require("../config.json")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("secret")
        .setDescription("Sends you a secret message"),
    
    async execute(interaction) {
        const user = interaction.user.username
        const userID = interaction.user.id

        if (user === secretUser || userID === secretUserID) {

            const messages = require("../secretMessages.json")
            const Number = randomNumber(1, Object.keys(messages).length)
            await interaction.reply({ content: messages[Number], ephemeral: true})
                .then( () => {
                    console.log("Secret user activated secret")
                })
                .catch(err => {
                    console.log(err)
                    interaction.reply("Oops somthing went wrong")
                })

        } else {

            if (Math.random() >= 0.75) {
                const message = randomString(21)
                await interaction.reply({ content: message, ephemeral: true})
                    .then( message => {
                        console.log("Decoy string sent")
                    })
                    .catch(err => {
                        console.log(err)
                        interaction.reply("Oops something went wrong")
                    })
            } else {
                const messages = require("../messages.json")
                const Number = randomNumber(1, Object.keys(messages).length).toString()
                await interaction.reply({ content: messages[Number], ephemeral: true})
                    .then( () => {
                        console.log("Decoy message sent")
                    })
                    .catch(err => {
                        console.log(err)
                        interaction.reply("Oops something went wrong")
                    })
            }
        }
    },
}

function randomNumber(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    number = Math.floor(Math.random() * (max - min + 1) + min)
    return number.toString()
}

function randomString(length) {
    var result = ""
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!£$%^&*()-=_+,.<>?/|`¬"

    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(randomNumber(0, characters.length))
    }

    return result
}