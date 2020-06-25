FROM node:10
WORKDIR /pedestre-service
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3003
CMD [ "npm", "start" ]