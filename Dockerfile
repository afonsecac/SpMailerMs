# Install dependencies only when needed
FROM node:22-alpine3.18 AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Build the app with cached dependencies
FROM node:22-alpine3.18 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build
RUN cp -r /app/src/templates dist/templates
RUN cp -r /app/src/templates /app/dist/templates
RUN cp -r /app/src/templates /app/templates

# Production image
FROM node:22-alpine3.18 AS runner
WORKDIR /app

# Install only production dependencies
COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile

# Copy built application
COPY --from=builder /app/dist ./dist

# Optional: Copy templates if needed (uncomment if required)
#COPY --from=builder /app/dist/template ./app/template

# Run as non-root user for security
#RUN adduser -D pokeuser
#USER pokeuser
#
#EXPOSE 3000

CMD ["node", "dist/main"]
