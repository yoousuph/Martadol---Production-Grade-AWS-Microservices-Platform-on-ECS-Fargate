
# Import node base image
FROM node:24-alpine

# Create working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application source
COPY . .

# Make start script executable
RUN chmod +x start.sh

# Expose port 5000
EXPOSE 5000

# Build the application
CMD ["./start.sh"]

















