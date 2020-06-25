FROM node:10
WORKDIR /pedestrian-app
COPY package.json /pedestrian-app
RUN npm install && npm install tsc -g && npm audit fix 

ADD . /pedestrian-app

CMD [ "npm", "start" ]
COPY . .
