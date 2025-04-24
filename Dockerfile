FROM node:lts-alpine as build

WORKDIR /app
COPY package*.json ./

#WORKDIR /usr/local/app
#COPY ./ /usr/local/app

RUN npm install

COPY . .

RUN npm run build
EXPOSE 3000

CMD ["node", "dist/app.js"]