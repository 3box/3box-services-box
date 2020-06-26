FROM buildkite/puppeteer

RUN apt-get update

RUN apt-get install -yyq git

WORKDIR /3box-load-test

COPY package.json package-lock.json ./

RUN npm ci

USER $user

COPY webpack.config.js ./

COPY src ./src

CMD npm run build && ./src/cli.js 20 7 3 20
