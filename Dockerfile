# Stage 0
FROM node:12 as build
WORKDIR /usr/src/app
USER root

COPY package.json /usr/src/app/package.json
COPY yarn.lock /usr/src/app/yarn.lock
RUN yarn

COPY ./ /usr/src/app
RUN yarn postinstall
RUN yarn build

# Stage 1
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
USER root

RUN rm /etc/nginx/conf.d/default.conf

COPY --from=build /usr/src/app/docker/nginx/conf.d /etc/nginx/conf.d
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
