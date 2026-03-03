# Etape 1 - build angular
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json .
RUN npm i --force
COPY . .
RUN npm run build

# Etape 2 - deployer sur nginx
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/CompagnWebApp /usr/share/nginx/html
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]
