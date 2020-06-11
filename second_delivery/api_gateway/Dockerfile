FROM node:10
WORKDIR /gateway
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3333

CMD [ "node", "app.ts" ]