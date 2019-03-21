FROM node as builder
WORKDIR '/app'
COPY . .
RUN npm install --production
RUN npm run build

ENV port 80
EXPOSE 80
RUN npm run prod-server
