FROM node:10
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY server.js subTask.js task.js taskServer.js ./
COPY bin ./bin
COPY public ./public
COPY routes ./routes
COPY views ./views
EXPOSE 8080
CMD ["npm", "start"]
