# syntax=docker/dockerfile:1

FROM node:12.18.1
ENV NODE_ENV=production

RUN mkdir /www-data
WORKDIR /www-data

COPY ["src", "./"]
COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

CMD [ "node", "server.js" ]