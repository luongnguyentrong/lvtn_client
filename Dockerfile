FROM node:16-alpine as build

WORKDIR /app
COPY package.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install

COPY . .
RUN yarn build

FROM nginx:mainline-alpine-slim
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80