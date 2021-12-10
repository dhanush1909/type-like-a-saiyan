FROM  node:14-alpine
WORKDIR /app
ADD package.json ./
RUN npm install
ADD . ./
CMD npm run serve