FROM node:18-alpine

WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy required backend folders manually
COPY server/config ./server/config
COPY server/controllers ./server/controllers
COPY server/middlewares ./server/middlewares
COPY server/models ./server/models
COPY server/routes ./server/routes

# Copy individual files
COPY server.js .
COPY vercel.json .
COPY .env .

# Expose port
EXPOSE 8000
CMD ["node", "server.js"]
