FROM node:11-slim

WORKDIR /app
COPY ./src /app

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "dev" ]