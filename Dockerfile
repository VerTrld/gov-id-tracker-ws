# ------------------------
# Stage 1: Build
# ------------------------
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install all deps (needed for build + prisma)
RUN npm install

# Copy rest of the source
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the app
RUN npm run build

# Remove dev dependencies
RUN npm prune --omit=dev


# ------------------------
# Stage 2: Prune node_modules (optional but recommended)
# ------------------------
FROM golang:1.22-alpine AS prune

WORKDIR /app

# Copy only what we need
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/package*.json ./

# Install node-prune
RUN go install github.com/tj/node-prune@latest

# Remove unnecessary files from node_modules
RUN node-prune


# ------------------------
# Stage 3: Production
# ------------------------
FROM node:20-alpine AS production

WORKDIR /app

# Copy pruned output
COPY --from=prune /app /app

# Expose app port
EXPOSE 3001

# Start the app
CMD ["node", "dist/main.js"]
