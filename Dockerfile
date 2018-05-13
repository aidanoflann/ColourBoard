FROM node:9.11 as production
MAINTAINER Aidan O Flannagain

ADD . /code
WORKDIR /code

ARG DEVELOPMENT

# install all dependencies
RUN npm install

# run the app
CMD node src/app/index.js

FROM production as development
COPY --from=production /code /code
# install nodemon globally - only needed on dev image
RUN npm install -g nodemon

CMD nodemon --legacy-watch src/app/index.js --watch src/*