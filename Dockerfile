FROM mhart/alpine-node:latest

RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

RUN apk update && apk upgrade
RUN apk add git

COPY . /usr/src/nuxt-app/
RUN apk add --no-cache make gcc g++ python && \
  yarn && \
  apk del make gcc g++ python

RUN yarn build

EXPOSE 3000

ENV BASE_URL=http://localhost:3000

CMD [ "yarn", "start" ]