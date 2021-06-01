FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./
COPY .env ./

RUN npm install

COPY . .

EXPOSE 3065

CMD ["npm", "run", "deploy"]