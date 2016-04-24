FROM node:slim

ENV NPM_CONFIG_LOGLEVEL error
ENV NPM_CONFIG_REGISTRY http://registry.npmjs.org/

ENV HUBOT_SLACK_TOKEN ""

RUN mkdir /app
WORKDIR /app

COPY app /app/
RUN npm install --no-optional

CMD npm start

EXPOSE 80