#FROM node:18
# FROM node:lts-alpine
FROM node:23.9

# install simple http server for serving static content
RUN npm install -g http-server

WORKDIR /
# make the 'app' folder the current working directory
#WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./
#COPY package*.json ./

#RUN npm install

# install project dependencies
RUN npm install

#COPY . .
# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

#RUN npm run build
# build app for production with minification
RUN npm run build

#FROM nginx:1.27.4-alpine

#COPY --from=0 /dist /usr/share/nginx/html

EXPOSE 80

#CMD ["nginx", "-g", "daemon off;"]

#EXPOSE 8080
CMD [ "http-server", "dist" ]