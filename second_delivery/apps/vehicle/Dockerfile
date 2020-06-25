FROM node:10
WORKDIR /vehicle-app
COPY package.json /vehicle-app
RUN npm install && npm install typescript -g && npm audit fix 

ADD . /vehicle-app

CMD [ "npm", "start" ]
COPY . .
