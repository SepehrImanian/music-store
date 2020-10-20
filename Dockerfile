FROM alpine:latest

LABEL maintainer="sepehr_imanian"

RUN apk add --no-cache bash

RUN apk add --update nodejs npm

COPY . /home

WORKDIR /home/MusicStore

RUN npm install

EXPOSE 80

CMD [ "node", "server.js" ]


