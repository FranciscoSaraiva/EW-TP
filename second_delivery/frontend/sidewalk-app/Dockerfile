FROM node:10
WORKDIR /frontend-app
COPY ./ /frontend-app
RUN npm install && npm audit fix
EXPOSE 3000
CMD [ "npm", "start" ]
COPY . .