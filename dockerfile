# ## install dependencies

FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json yarn.lock ./
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
RUN yarn install



FROM node:18-alpine AS prod-builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY app ./app
COPY components ./components
COPY lib ./lib
COPY .env.local ./.env
COPY hooks ./hooks
COPY config ./config
COPY types ./types
COPY styles ./styles
COPY public ./public
COPY package.json next.config.js tsconfig.json ./
RUN yarn run build



FROM node:18-alpine
WORKDIR /app
COPY --from=prod-builder /app/.next ./.next
COPY --from=prod-builder /app/public ./public
COPY --from=prod-builder /app/node_modules ./node_modules
COPY --from=prod-builder /app/package.json ./
CMD ["yarn", "run", "start"]
