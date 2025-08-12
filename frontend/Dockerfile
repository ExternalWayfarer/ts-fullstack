FROM node:20.18.0


WORKDIR /app-frontend

COPY package*.json ./

RUN npm install

COPY . .


CMD ["npm", "run", "dev"]
