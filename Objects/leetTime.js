
const schedule = require("node-schedule")
const mongoose = require("mongoose")
const { MongoDBurl } = require("../config.json")
const Score = require("../Schemas/score.js")
const leetTimeRegex = /(l\S?e\S?e\S?t.*)|(13\S?37)/i
const generalRegex = /general/i
const botRegex = /bot/i

module.exports = function LeetTime(DiscordClient, guild, time) {
    //Object properties
    this.DiscordClient = DiscordClient;
    this.guild = guild;
    this.time = {hour: 13, minute: 36, second: 50};
    this.leetTime = false;
    this.leetTimeScoreTracker;
    this.guildScoreModel;
    this.leetTimeChannel;
    this.leetTimeChannelName;
    this.botChannel;
    this.botChannelName;

    //Initializer
    this.init = async function() {
        //Find correct channels
        channelInfoMap = await this.findTheGeneral()
        mapIterator = channelInfoMap.entries()
        this.setLeetTimeChannel(mapIterator.next().value)
        this.setBotChannel(mapIterator.next().value)

        //Schedule leet time
        this.Schedule()
        console.log(`Leet time scheduled for ${this.time.hour}:${this.time.minute}:${this.time.second} in ${this.guild.name}. Location: ${this.leetTimeChannelName}`)
        console.log(`Bot channel: ${this.botChannelName}`)
        console.log(`\n`)
    }
    //Setters
    this.setLeetTimeChannel = function(infoArray) {
        this.leetTimeChannel = infoArray[1]
        this.leetTimeChannelName = infoArray[0]
    };
    this.setBotChannel = function(infoArray) {
        this.botChannel = infoArray[1]
        this.botChannelName = infoArray[0]
    };
    //Methods
    this.ping = function() {
        console.log(`${this.guild.name}`)
    };
    this.Schedule = function() {
        Job = schedule.scheduleJob(this.time, this.leet_time.bind(this))
        //Job.on("error", () => console.error("error"))
    };
    this.recordToDatabase = async function() {
    
        this.guildConnection = mongoose.createConnection(`${MongoDBurl}`)
        this.guildConnection.on("error", (err) => console.log(err))

        this.guildScoreModel = this.guildConnection.model("Score", Score, this.guild.name)

        this.scoreMessage = ""

        try {
            await this.record()
            await this.readAll()
        } catch(err) {
            console.log(err)
        }
        
        this.guildConnection.close()

        console.log(this.scoreMessage)
        return this.scoreMessage
    };
    this.record = async function() {

        this.objectInstance = this
        console.log(`Recording data for ${this.guild.name}`)

        return new Promise( async (resolve, reject) => {

            if (this.objectInstance.leetTimeScoreTracker.size === 0) {
                resolve(console.log(`No one said leet time in ${this.objectInstance.guild.name}`))
            }

            this.objectInstance.leetTimeScoreTracker.forEach( async (user, userID) => {
                const exists = await this.objectInstance.guildScoreModel.exists({ userID: userID})

                if (exists) {

                    const currentScore = await this.objectInstance.guildScoreModel.findOne({ userID: userID}).exec()
                    await this.objectInstance.guildScoreModel.updateOne({ userID: userID}, { score: currentScore.get("score") + 1})
                    resolve(console.log(`Updating ${user}`))

                } else {

                    await this.objectInstance.guildScoreModel.create({ user: user, userID: userID, score: 1})
                    resolve(console.log(`Creating ${user}`))

                }
            })
        })
    };
    this.readAll = async function() {

        this.objectInstance = this
        console.log(`Reading data for ${this.guild.name}`)

        return new Promise( async (resolve, reject) => {
            const allDocuments = await this.objectInstance.guildScoreModel.find({})
            for (document in allDocuments) {
                let doc = allDocuments[document]
                NewMessage = this.objectInstance.scoreMessage.concat(`\n${doc.user}: ${doc.score}`)
                this.objectInstance.scoreMessage = NewMessage
            }
            resolve(console.log(`Resolved ${this.objectInstance.guild.name}`))
        })
    };
    this.isLeetMessage = function(message) {
        if (leetTimeRegex.test(message.content) && this.leetTime) {
            this.leetMessage(message)
        } else {
            return
        }
    };
    this.leetMessage = function(message) {
        const userID = message.author.id
        const user = message.author.username
        console.log(`leet message found from ${user}`)
    
        try {
            if (this.leetTimeScoreTracker.has(userID)) {
                message.react("🤨")
            } else {
                message.react("☑️")
                this.leetTimeScoreTracker.set(userID, user) 
            }
        } catch(err) {
            console.log(err)
        }
        
    };
    this.scoreBoard = async function(interaction) {

        if (!interaction) return

        await interaction.reply("Fetching your score!")
        
        const option = interaction.options.getString("option")

        if (option === "all") {
        
            try {
                result = await this.lookUpAll()
                this.send_scoreboard(interaction, result)
            } catch(err) {
                console.log(err)
            }
            
        } else if (option === null) {

            try {
                result = await this.lookUp(interaction.user.username, interaction.user.id)
                console.log(result)
                await interaction.editReply({content: result, ephemeral: true})
            } catch(err) {
                console.log(err)
            }
            
        } else if (option.length > 0) {

            try {

                memberCollection = await interaction.guild.members.fetch({ query: option, limit: 1})

                value = memberCollection.first()
                key = memberCollection.firstKey()

                console.log(typeof value, value)
                result = await this.lookUp(value.user.username, key)
                interaction.editReply({content: result, ephemeral: true})

            } catch(err) {
                console.log(err)
            }
            

        } else {
            error(interaction)
        }
    };
    this.findTheGeneral = async function() {
        this.channelInfo = new Map()
        const result = await guild.channels.fetch()
        
        result.forEach( (value, key) => {
            if (value.type === "GUILD_TEXT" && generalRegex.test(value.name)) {
                this.channelInfo.set(value.name, value)
            }
            if (value.type === "GUILD_TEXT" && botRegex.test(value.name)) {
                this.channelInfo.set(value.name, value)
            }
        })
        return this.channelInfo
    };
    this.leet_time = function() {
        console.log(`Leet time in ${this.guild.name}`)
        this.leetTime = true
        this.leetTimeScoreTracker = new Map()
        setTimeout(this.leet_time_over.bind(this), 70000)
    };
    this.leet_time_over = async function() {
        console.log(`Leet time is over in ${this.guild.name}`)
        this.leetTime = false
        message = await this.recordToDatabase()
        this.send_scoreboard(undefined, message)
    };
    this.send_scoreboard = function(interaction, message) {
        if (interaction === undefined) {
            if (message.length === 0) {
                this.leetTimeChannel.send("The scoreboard is empty")
            } else {
                this.leetTimeChannel.send(message)
            }
        } else if (interaction) {
            if (message.length === 0) {
                interaction.editReply("The scoreboard is empty")
            } else {
                interaction.editReply(message)
            }
        } else {
            console.error(interaction, message)
        }
        
    };
    this.lookUp = async function(user, userID) {
        if (userID === undefined || user === undefined) {
            console.error(user, userID)
            return `Oops something went wrong`
        }
    
        this.guildConnection = mongoose.createConnection(MongoDBurl)
        this.guildConnection.on("error", (err) => console.log(err))

        this.guildScoreModel = this.guildConnection.model("Score", Score, this.guild.name)
    
        let exists = null;
        try {
            exists = await this.guildScoreModel.exists({ userID: userID })
        } catch(err) {
            console.error(err)
        }

        let result = "Something went wrong";
    
        if (exists !== null) {
            return this.guildScoreModel.findOne({ userID: userID }).exec()
                .then( (doc) => {
                    result = `${doc.get("user")} score is ${doc.get("score")}`
                    this.guildConnection.close()
                    return result
                }).catch(err => {
                    result = `Oops something went wrong`
                    console.error(err.message)
                    this.guildConnection.close()
                    return result
                })
        } else {
            return this.guildScoreModel.create({ user: user, userID: userID, score: 0})
                .then( () => {
                    result = `Created a document for ${user} your score is 0`
                    console.log(`Score for ${user} created, Score 0`)
                    this.guildConnection.close()
                    return result
                })
                .catch(err => {
                    result = `Oops something went wrong`
                    console.log(err)
                    this.guildConnection.close()
                    return result
                })
        }
    };
    this.lookUpAll = async function() {
        let message = ""
    
        this.guildConnection = mongoose.createConnection(MongoDBurl)
        this.guildConnection.on("error", (err) => console.log(err))

        this.guildScoreModel = this.guildConnection.model("Score", Score, this.guild.name)
    
        const allDocuments = await this.guildScoreModel.find({})
    
        for (document in allDocuments) {
            let doc = allDocuments[document]
            NewMessage = message.concat(`\n${doc.user}: ${doc.score}`)
            message = NewMessage
        }
    
        await mongoose.connection.close()
                .then( () => console.log("Disconnected from Database"))
                .catch(err => console.log(err))
        
        return message
    };
}


