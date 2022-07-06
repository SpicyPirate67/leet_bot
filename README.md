# leet_bot
Dicord bot to track leet time (13:37)

Running "docker build ." will build an image on your machine from the Dockerfile in the directory you run the command from.

So for example if you clone this repo, and run "docker build ." from within it, it will build an image using the Dockerfile in this repo.

If your on windows download docker desktop, and your image will show up in there once you have built it. You can run the image from there and it will create a container, this container is the bot running.

If you want to deploy to another machine, push your docker image to your docker hub account. Then on the machine you want to deploy on, pull the image down and use "docker up YOUR_IMAGE" to run a container for the image

You will need to set up your own config.json

{
    "token": "YOUR_TOKEN",
    "clientID": "YOUR_CLIENT_ID",
    "MongoDBurl": "mongodb://host.docker.internal:27017/LeetTimeScores",
}

The MongoDBurl is where the leet bot will look for the database, in this example it looks for it on the machines local host on port 27017. This is the default port for mongoDB. Feel free to change it but you will have to update the docker-compose.yml and this config entry. "host.docker.internal" is the same as /localhost on a normal machine, but we use this because we are running the bot inside a docker container. 


the Dockerfile will build an image for the leet bot on your local machine, you can upload this to docker hub so you can pull it down to your deployment machine.

Then use the docker-compose.yml to deploy both the leet bot container and the database container a machine.

The machine you want to deploy to, you will want to install docker and docker-compose, then in the directory you want the bot, create a docker-compose.yml file, when you run this file it will pull the images from docker hub and deploy the containers