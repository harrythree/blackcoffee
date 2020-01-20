FROM node:12-alpine

RUN mkdir -p /app

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 4000

CMD [ "node", "index.js" ]