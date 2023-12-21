# syntax=docker/dockerfile:1

# Setup base
FROM node:16-alpine AS base
WORKDIR /app

# Initalize dependencies
FROM base AS dependencies
COPY package.json ./

# Build dependencies
FROM dependencies AS builder
COPY . .
RUN npm install

# Run the app
FROM base AS runner
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["npm", "start"]