# Multi-stage build for optimized production image

# Stage 1: Build React application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies with force flag to resolve conflicts
RUN npm install --force

# Copy application source
COPY . .

# Build optimized production bundle
RUN npm run build

# Stage 2: Production image with minimal footprint
FROM node:18-alpine

WORKDIR /app

# Install curl for health checks
RUN apk add --no-cache curl

# Install serve to run the React app in production
RUN npm install -g serve

# Copy built application from builder stage
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:3000 || exit 1

# Start application
CMD ["serve", "-s", "build", "-l", "3000"]
