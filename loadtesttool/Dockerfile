FROM buildkite/puppeteer

RUN apt-get update

RUN apt-get install -yyq git

WORKDIR /3box-load-test

COPY package.json package-lock.json ./

RUN npm ci

USER $user

COPY webpack.config.js ./

COPY src ./src

CMD npm start & sleep 20s && ./src/cli.js 10 5 2 2
