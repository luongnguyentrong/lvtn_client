FROM node:16-alpine as build

WORKDIR /app
COPY package.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install

COPY . .
RUN yarn build

FROM nginx:mainline-alpine-slim
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80