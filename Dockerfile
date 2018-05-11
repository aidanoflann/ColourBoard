FROM node:9.11
MAINTAINER Aidan O Flannagain

ADD . /code
WORKDIR /code

CMD node src/index.js
