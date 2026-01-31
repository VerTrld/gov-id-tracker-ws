# ------------------------
# Build
# ------------------------
FROM node:20-alpine AS build
WORKDIR /app

# Copy package files and install all dependencies (dev + prod)
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the NestJS app
RUN npm run build

# Remove devDependencies to prepare for production
RUN npm prune --omit=dev


# ------------------------
# Production
# ------------------------
FROM node:20-alpine
WORKDIR /app

# Copy the production build and pruned node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/package*.json ./

# Expose app port
EXPOSE 3001

# Start the application
CMD ["node", "dist/main.js"]
