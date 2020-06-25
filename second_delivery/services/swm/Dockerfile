FROM node:10
WORKDIR /swm-service
COPY package.json /swm-service
RUN npm install && npm install typescript -g && npm audit fix 

ADD . /swm-service

EXPOSE 3002

CMD [ "npm", "start" ]
COPY . .
