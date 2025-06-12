FROM node:latest-apline as base

WORKDIR /app

ARG PORT=3000

COPY package.json yarn.lock .

FROM base

RUN yarn install 

RUN yarn build

FROM base

ENV PORT=$PORT
ENV NODE_ENV=production
ENV BACKEND_URL='https://moart-backend.onrender.com/v1'

CMD ["node", ".output/server/index.mjs"]
