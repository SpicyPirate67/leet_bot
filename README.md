# leet_bot
Dicord bot to track leet time (13:37)

In order to change leet time, edit the leetTime.js file in Objects  

# Docker
Note: all these commands are meant to be exected on the command line  

Running `docker-compose up` will run the `docker-compose.yml` from the current directory, if it can't find a file it will thorw an error. The `docker-compose.yml` file will pull and build the latest images from docker hub, start their containers and link them togeather.  
 
Running `docker-compose down` will stop all the containers started from the compose file.  

If you are running windows or mac, download docker desktop, on linux install the docker and docker-compose packages from your package manager.  

If you just want to deploy this app in docker, all you have to do is download / copy the `docker-compose.yml` file, make sure you have docker and docker-compose installed, and run `docker-compose up` in the command line from the directory with the `docker-compose.yml` file. This will pull the latest images from docker hub and start the containers.  

Note: please read through the `docker-compose.yml` file first as there might be changes you have to make if you are deploying on a linux machine.   

Note: docker caches the images, so to ensure you are composing the latest image run `docker-compose pull` to check for the latest images, and pull them if yours are out of date.  

If you would like to build your own image from this repository I recommed reading through the docker documentation and familiarizing yourself with docker, just in case you run into any problems.  
# Config file
You will need to set up your own config.json  

{  
    "token": "YOUR_TOKEN",  
    "clientID": "YOUR_CLIENT_ID",  
    "MongoDBurl": "mongodb://host.docker.internal:27017/LeetTimeScores",  
} 

`YOUR_TOKEN` is the token from your dicord developer portal, go into you application and into bots and there should be a token. DO NOT SHARE THIS TOKEN, it is essentiall the password for your bot, anyone with the token can pretend to be your bot.  

`YOUR_CLIENT_ID` is the client id from your dicord developer portal, go to applications and bot and you should see a client id field.  

The mongoDB url is explained in the mongoDB section. If you are not running the database locally then you will have to go to the mongoose and mongodb docs to find out what to put here  

# MongoDB
The leet bot uses a mongoDB database to store the scores for the guilds it is in, the database can be run locally on the machine in a docker container, or on the cloud for free. I have run it locally but feel free to run it in the cloud.  

I am using the mongoose wrapper for mongoDB to make database managment easier  

The MongoDBurl is where the leet bot will look for the database, in the example config above it looks for it on the machines local host, on port 27017. This is the default port for mongoDB. Feel free to change it but you will have to update the `docker-compose.yml` and this config entry.   

`host.docker.internal` is the same as `localhost` on a normal machine, but we use this because we are running the bot inside a docker container. "LeetTimeScores" is the name of the database within mongoDB.  

# Discord.js
This bot uses the dicord.js libary, the documentation and starting guide are linked bellow  

If you wish to add more slash commands, create a new file in the `commands` folder, the name dosent matter but it needs to end with .js for obvious reasons. Once you have finished the command, or when you have changed it and want to update it, run the `DeployCommands.js` file, this will register the commands with the discord API and you will be able to use them.  

Note commands can be either registered globaly or to a guid (a discord server), at the moment all commands are registered globaly so every guild the bot is in will be able to use them. See the documentation if you would like to change this.  

# Documentation links
[Mongoose](https://mongoosejs.com/)  
[Discord.js](https://discord.js.org/#/)  
[Discord.js guide](https://discordjs.guide/#before-you-begin)  
[Docker](https://docs.docker.com/)  
[Docker compose](https://docs.docker.com/compose/)  