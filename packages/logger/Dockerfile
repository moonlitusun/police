# syntax=docker/dockerfile:1

FROM dev.hub.dztec.net/lib/node:14.19.1
ENV NODE_ENV=production

WORKDIR /www-data

COPY ["src", "./"]
COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

CMD [ "node", "server.js" ]