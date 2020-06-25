FROM node:10
WORKDIR /pedestrian-service
COPY package.json /pedestrian-service
RUN npm install && npm install typescript -g && npm audit fix 

ADD . /pedestrian-service

EXPOSE 3003

CMD [ "npm", "start" ]
COPY . .
