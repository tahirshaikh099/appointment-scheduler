FROM node:18.17.0


WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm start

EXPOSE 80

CMD [ "npm", "start" ]
