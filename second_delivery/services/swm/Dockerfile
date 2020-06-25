FROM node:10
WORKDIR /swm-service
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3002
CMD [ "npm", "start" ]