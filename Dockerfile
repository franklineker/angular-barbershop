FROM --platform=linux/amd64 node:latest as build
WORKDIR /usr/local/app/
COPY ./ /usr/local/app/
RUN npm install --legacy-peer-deps
RUN npm run build

FROM --platform=linux/amd64 nginx:1.13 as builder
COPY --from=build /usr/local/app/dist/frontend /usr/share/nginx/html
COPY --from=build /usr/local/app/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/local/app /usr/local/app

EXPOSE 80
EXPOSE 8000
