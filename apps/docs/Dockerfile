FROM node:19.8.1-alpine as build

WORKDIR /app

RUN apk add --no-cache python3 make g++

COPY package.json package-lock.json ./

RUN npm install

COPY . .
RUN npx prisma generate
RUN npx nx build docs


CMD ["npx", "nx", "serve", "docs", "--prod"]
