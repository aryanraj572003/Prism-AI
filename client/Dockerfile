# Step 1: Build the app
FROM node:18-alpine AS builder

WORKDIR /app

# Copy ONLY dependencies first
COPY package*.json ./

RUN npm install

# Copy only required project files
COPY src ./src
COPY public ./public
COPY vite.config.js ./
COPY index.html ./

RUN npm run build


# Step 2: Serve the build
FROM node:18-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/dist ./dist

EXPOSE 8000

CMD ["serve", "-s", "dist", "-l", "8000"]
