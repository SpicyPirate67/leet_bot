
//Note if you use the regex global flag, leetTimeRegex.test will store its last state
//which breaks everything, so yeah don't do that.

module.exports = {
    name: "messageCreate",

    async execute(message) {
        message.guild.guildLeetTime.isLeetMessage(message)
    }
}