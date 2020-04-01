FROM node:10

WORKDIR /js-ipfs

COPY package.json package-lock.json ./
RUN npm install

COPY src ./src

EXPOSE  4002 4003 5002 9090

CMD npm run start
