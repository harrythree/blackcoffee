FROM node:12-alpine

RUN mkdir -p /app

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8080

CMD [ "node", "server.js" ]