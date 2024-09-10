FROM node:20-alpine3.20 AS base

FROM base AS build_client
WORKDIR /build

COPY client ./client
RUN yarn --cwd ./client install --frozen-lockfile --production=false
RUN yarn --cwd ./client build

FROM base AS build_server
WORKDIR /build

COPY server ./server
RUN yarn --cwd ./server install --frozen-lockfile --production=false
RUN yarn --cwd ./server build
RUN yarn --cwd ./server install --frozen-lockfile --production=true --prefer-offline
RUN yarn cache clean

FROM base
WORKDIR /app
EXPOSE 80

COPY --from=build_client /build/client/build ./client/build
COPY --from=build_server /build/server/node_modules ./server/node_modules
COPY --from=build_server /build/server/dist ./server/dist
COPY --from=build_server /build/server/package.json ./server/package.json

CMD yarn --cwd ./server start:prod