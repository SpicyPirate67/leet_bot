
FROM node:16.15-alpine

WORKDIR /code

COPY package.json /code
COPY package-lock.json /code

RUN npm install

COPY . /code 

#Setting the user here stopped the no access errors
USER node

CMD ["node", "Index.js"]
