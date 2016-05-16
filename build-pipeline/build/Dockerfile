FROM node:slim

ENV NPM_CONFIG_LOGLEVEL error
ENV NPM_CONFIG_REGISTRY http://registry.npmjs.org/

RUN mkdir /app
WORKDIR /app

COPY app/package.json /app/
RUN npm install --no-optional

COPY app /app/

CMD npm start

EXPOSE 80