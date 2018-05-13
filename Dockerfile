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
# in DEVELOPMENT mode use nodemon, note that --legacy-watch flag is required for detecting docker mount file changes
CMD if [ "$DEVELOPMENT" == true]; \
    then node src/app/index.js; \
    else nodemon --legacy-watch src/app/index.js --watch src/*; \
    fi
