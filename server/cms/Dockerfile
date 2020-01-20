FROM node:12-alpine

RUN mkdir -p /app

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 1337

CMD npm build && npm start