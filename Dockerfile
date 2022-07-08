
#From the node docker image
FROM node:16.15-alpine

#Set the correct timezone
ENV TZ=Europe/London

#Set the working directory inside the container to /code
WORKDIR /code

#Copy package.json and package-lock.json into the working directory
COPY package.json /code
COPY package-lock.json /code

#Runs npm install in the command line to install all the packages
RUN npm install

#Install package for managing timezones and configure the timezone
RUN apk add --no-cache tzdata
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

#Copys everything from the current directory into the /code working directory, ignoring files listed in the .dockerignore file
COPY . /code 

#Sets the user, I'm not 100% what this actually does
USER node

#Runs node Index.js in the command line, this runs the Index.js file and starts the bot. Putting this at the end means the bot will start up everytime
# a container is started.
CMD ["node", "Index.js"]
