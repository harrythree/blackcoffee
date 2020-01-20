FROM node:12-alpine

RUN mkdir -p /app

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3001

CMD ["npm", "start"]