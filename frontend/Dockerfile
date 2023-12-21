# syntax=docker/dockerfile:1

# Setup base
FROM node:18-alpine AS base
WORKDIR /app

# Initalize dependencies
FROM base AS dependencies
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install

# Build the app
FROM dependencies AS builder
COPY frontend/ ./
RUN npm run build

# Run the app
FROM base AS runner
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["npm", "run", "dev"]