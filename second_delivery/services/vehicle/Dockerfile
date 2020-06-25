FROM node:10
WORKDIR /vehicle-service
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3001
CMD [ "npm", "start" ]