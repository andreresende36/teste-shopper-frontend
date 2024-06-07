FROM node:lts-alpine3.19
WORKDIR /app-frontend
COPY package*.* ./
RUN npm install
COPY . .
EXPOSE 3000
ENTRYPOINT [ "npm", "start" ]