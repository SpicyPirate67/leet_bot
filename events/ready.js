
const { leetTime } = require("../config.json") //The time object for leet time
const LeetTime = require("../Objects/leetTime") //The LeetTime object

module.exports = {
    name: "ready",
    once: true,

    async execute(client) {
        console.log(`Online! Logged in as ${client.user.tag}`)

        client.guildObject = client.guilds.cache.map(guild => ({name: guild.name, guild: guild}))

        client.guildObject.forEach( (guild, name) => {
            //Create a leet time object for each guild and initalize it
            guild.guild.guildLeetTime = new LeetTime(client, guild.guild, leetTime)
            guild.guild.guildLeetTime.init()
        })
    }
}
