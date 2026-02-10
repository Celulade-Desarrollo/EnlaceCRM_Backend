FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm config set fetch-retries 5 \
 && npm config set fetch-retry-mintimeout 20000 \
 && npm config set fetch-retry-maxtimeout 120000 \
 && npm config set maxsockets 5 \
 && npm ci --omit=dev

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
