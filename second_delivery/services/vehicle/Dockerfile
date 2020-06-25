FROM node:10
WORKDIR /vehicle-service
COPY package.json /vehicle-service
RUN npm install && npm install typescript -g && npm audit fix 

ADD . /vehicle-service

EXPOSE 3001

CMD [ "npm", "start" ]
COPY . .
