FROM node:14.17-buster-slim

WORKDIR /app
COPY *.json /app/
COPY .env /app/.env
COPY src/ /app/src

RUN mkdir dist/ && npm ci && npm run build
CMD ["npm", "start"]
