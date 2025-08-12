FROM node:20.18.0


WORKDIR /app-backend

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install
RUN npx prisma generate

COPY . .

EXPOSE 3000

# Запускаем сервер
CMD ["npm", "run", "start:dev"]
