FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4000

CMD ["npx", "vite", "--host", "0.0.0.0", "--port", "4000"]