# -------- Build Stage --------
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN yarn install

# Copy the rest of the app
COPY . .

#Environment variables
ENV BACKEND_URL=https://moart-backend.onrender.com/v1
# Build the Nuxt app
RUN yarn build

# -------- Production Stage --------
FROM node:20-alpine AS runner

WORKDIR /app

# Copy only the required files from builder
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN yarn install

# Expose port (default Nuxt port)
EXPOSE 3000

# Run Nuxt app
CMD ["node", ".output/server/index.mjs"]
