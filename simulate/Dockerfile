FROM node:10

WORKDIR /simulate

COPY package.json package-lock.json ./

RUN npm install

COPY src ./src
COPY .babelrc ./

EXPOSE 3022

CMD npm run start:primary
