FROM node:10
WORKDIR /gateway
COPY ./ /gateway
RUN npm install && npm audit fix
EXPOSE 3333
CMD [ "npm", "start" ]
COPY . .
