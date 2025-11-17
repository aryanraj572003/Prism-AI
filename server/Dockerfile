# ============================
# 1️⃣ Build Stage
# ============================
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy all source code
COPY . .

# Optional: run build step (for TS, Next.js, etc.)
# Remove if not needed
# RUN npm run build


# # ============================
# # 2️⃣ Production Stage
# # ============================
# FROM node:18-alpine AS runner

# WORKDIR /app

# # Copy only necessary files from builder
# COPY --from=builder /app/package*.json ./
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/dist ./dist      # for TypeScript builds
# COPY --from=builder /app/build ./build    # for Next.js/React builds
# COPY --from=builder /app/. .              # fallback for normal JS apps

# Expose port 
EXPOSE 8000

# Start the server
CMD ["node", "server.js"]
