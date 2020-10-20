FROM alpine:latest

LABEL maintainer="sepehr_imanian"

RUN apk add bash nodejs npm python3 make g++

COPY . /home

WORKDIR /home/MusicStore

RUN npm install

EXPOSE 80

CMD [ "node", "server.js" ]


