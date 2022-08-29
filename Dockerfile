FROM node:16.17

WORKDIR /bk-front-end

COPY package*.json .

RUN npm install

RUN npm install react-scripts

COPY . .

EXPOSE 3000

CMD ["npm", "start"]