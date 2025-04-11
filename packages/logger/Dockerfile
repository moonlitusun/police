# syntax=docker/dockerfile:1

FROM develop.dztec.net:50243/web-teams/node:20-alpine
ENV NODE_ENV=production

WORKDIR /www-data

COPY ["src", "./"]
COPY ["package.json", "package-lock.json*", "./"]

RUN npm install -g pnpm && \
    pnpm install --registry=https://registry.npmmirror.com/

CMD [ "node", "server.js" ]