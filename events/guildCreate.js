
const { leetTime } = require("../config.json") //The time object for leet time
const LeetTime = require("../Objects/leetTime.js") //The LeetTime Object

//Message to send when bot joins
const message = "Hey there, I keep score on who says leet time at 13:37! type /help for more commands ;)"

module.exports = {
    name: "guildCreate",
    once: true,

    async execute(Guild) {
        //Create a LeetTime object for the new guild and initalize it
        Guild.guildLeetTime = new LeetTime(Guild.client, Guild, leetTime)
        await Guild.guildLeetTime.init()
        //Send a hello message to the bot channel
        botChannel = Guild.guildLeetTime.botChannel
        botChannel.send(message)
    }
}