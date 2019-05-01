FROM node:11-slim

WORKDIR /app
COPY ./src /app

RUN npm install

ENV WEB_PORT 3000
EXPOSE 3000

ENTRYPOINT [ "npm run start" ]