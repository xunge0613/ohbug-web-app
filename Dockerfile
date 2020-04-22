# Stage 0
FROM node:alpine as build
WORKDIR /usr/src/app/
USER root
COPY package*.json yarn.lock ./
RUN yarn
COPY ./ ./
RUN yarn postinstall
RUN yarn build

# Stage 1
FROM nginx:alpine
WORKDIR /usr/share/nginx/html/
USER root
COPY --from=build /usr/src/app/docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
