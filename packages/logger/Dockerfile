# syntax=docker/dockerfile:1

FROM develop.dztec.net:50243/web-teams/node:14.19.1
ENV NODE_ENV=production

WORKDIR /www-data

COPY ["src", "./"]
COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production --registry http://10.10.11.236:4873

CMD [ "node", "server.js" ]