# leet_bot
Dicord bot to track leet time (13:37)

# Docker
Note: all these commands are meant to be exected on the command line

Running "docker build ." will build an image on your machine from the Dockerfile in the directory you run the command from.
Running "docker-compose up" will run the docker-compose.yml, build/pull the containers listed in it and link them togeather.
Running "docker pull YOUR_DOCKER_ACCOUNT_NAME/THE_IMAGE_NAME" will pull the image from your docker account

If your on windows download docker desktop, and your image will show up in there once you have built it. You can run the image from there and it will create a container, this container is the bot running.

If you want to deploy to another machine, push your docker image to your docker hub account. Then on the machine you want to deploy on, pull the image down and use "docker up YOUR_IMAGE" to run a container for the image

# Config file
You will need to set up your own config.json

{
    "token": "YOUR_TOKEN",
    "clientID": "YOUR_CLIENT_ID",
    "MongoDBurl": "mongodb://host.docker.internal:27017/LeetTimeScores",
}

YOUR_TOKEN is the token from your dicord developer portal, go into you application and into bots and there should be a token. DO NOT SHARE THIS TOKEN, it is essentiall the password for your bot, anyone with the token can pretend to be your bot.

YOUR_CLIENT_ID is the client id from your dicord developer portal, go to applications and bot and you should see a client id field.

The mongoDB url is explained in the mongoDB section. If you are not running the database locally then you will have to go to the mongoose and mongodb docs to find out what to put here

# MongoDB
The leet bot uses a mongoDB database to store the scores for the guilds it is in, the database can be run locally on the machine in a docker container, or on the cloud for free. I have run it locally but feel free to run it in the cloud.

I am using the mongoose wrapper for mongoDB to make database managment easier

The MongoDBurl is where the leet bot will look for the database, in the example config above it looks for it on the machines local host, on port 27017. This is the default port for mongoDB. Feel free to change it but you will have to update the docker-compose.yml and this config entry. 

"host.docker.internal" is the same as /localhost on a normal machine, but we use this because we are running the bot inside a docker container. "LeetTimeScores" is the name of the database within mongoDB.