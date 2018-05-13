FROM node:9.11
MAINTAINER Aidan O Flannagain

ADD . /code
WORKDIR /code

ARG DEVELOPMENT

# install all dependencies
RUN npm install

# install nodemon globally
RUN npm install -g nodemon

# run the app
CMD if [ "$DEVELOPMENT" == true]; \
    then node src/app/index.js; \
    else nodemon src/app/index.js; \
    fi
