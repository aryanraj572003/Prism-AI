FROM node:18-alpine

WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy required backend folders manually
COPY config ./config
COPY controllers ./controllers
COPY middlewares ./middlewares
COPY models ./models
COPY routes ./routes

# Copy individual files
COPY server.js .
COPY vercel.json .

# Expose port
EXPOSE 8000
CMD ["node", "server.js"]
