# syntax=docker/dockerfile:1

FROM node:14.19.1-alpine3.15
ENV NODE_ENV=production

WORKDIR /www-data

COPY ["src", "./"]
COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

CMD [ "node", "server.js" ]