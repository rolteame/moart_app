FROM node:latest-apline

WORKDIR /app

ARG PORT=3000

COPY package.json yarn.lock .

RUN yarn install 

RUN yarn build

ENV PORT=$PORT
ENV NODE_ENV=production
ENV BACKEND_URL='https://moart-backend.onrender.com/v1'

CMD ["node", ".output/server/index.mjs"]
