FROM node:10
WORKDIR /vehicle-app
COPY package*.json ./
RUN npm install

COPY . .

CMD [ "node", "vehicle.ts" ]