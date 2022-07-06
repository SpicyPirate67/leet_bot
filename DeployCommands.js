const { REST } = require("@discordjs/rest")
const { token, clientID } = require("./config.json")
const { Routes } = require("discord-api-types/v9")
const fs = require("node:fs")
const path = require("node:path")

const commands = []
const commandsPath = path.join(__dirname, "commands")
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file)
    const command = require (filePath)
    commands.push(command.data.toJSON())
}

const rest = new REST({ version: "9" }).setToken(token)

//The .applicationCommands registers commands globaly, see the discord.js docs if you want to change this
rest.put(
    Routes.applicationCommands(clientID),
    { body: commands })
    .then( () => console.log("Successfully registered commands"))
    .catch(err => console.log(err))