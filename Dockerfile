FROM node:14.17.0-alpine

RUN apk add --no-cache tzdata
ENV TZ=America/Sao_Paulo
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /var/www/catraca_stock

COPY package.json package-lock.json ./ 
RUN npm ci

COPY .eslintrc.js nest-cli.json tsconfig.json tsconfig.build.json src/config/typeorm.config.ts ./

COPY .env /var/www/catraca_stock/.env

CMD [ "npm", "run", "start:dev", "--preserveWatchOutput" ]
