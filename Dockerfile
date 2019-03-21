FROM node:alpine as builder
WORKDIR '/app'
COPY . .

RUN apk update && apk upgrade \
	&& apk add --no-cache git \
	&& apk --no-cache add --virtual builds-deps build-base python \
	&& npm install --production\
	&& npm rebuild bcrypt --build-from-source

RUN npm run build

ENV port 80
EXPOSE 80
CMD npm run prod-server
