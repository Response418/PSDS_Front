FROM node:lts-alpine AS build-stage
WORKDIR /

COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build


FROM nginx:1.15.2-alpine

COPY --from=build-stage /dist /var/www
COPY config/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]