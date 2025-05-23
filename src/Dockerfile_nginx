FROM node:18

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.27.4-alpine

COPY --from=0 /dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]