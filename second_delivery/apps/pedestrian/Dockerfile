FROM node:10
WORKDIR /pedestre-app
COPY package*.json ./
RUN npm install

COPY . .

CMD [ "node", "pedestrian.ts" ]