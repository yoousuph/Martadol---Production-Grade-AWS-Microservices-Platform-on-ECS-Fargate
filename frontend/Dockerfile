# # -----------------------------
# # Stage 1 - Build the React app
# # -----------------------------
# FROM node:24-alpine AS builder

# WORKDIR /app

# # Copy package files
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy application source
# COPY . .

# # Build the application
# RUN npm run build


# # -----------------------------
# # Stage 2 - Nginx
# # -----------------------------
# FROM nginx:alpine

# # Remove default nginx site
# RUN rm /etc/nginx/conf.d/default.conf

# # Copy nginx configuration
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# # Copy built application
# COPY --from=builder /app/build /usr/share/nginx/html

# # Expose port 80
# EXPOSE 80

# # Start nginx
# CMD ["nginx", "-g", "daemon off;"]




# ==========================================
# Stage 1: Build React/Vite Application
# ==========================================
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency files first for Docker layer caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application source
COPY . .

# Build production frontend
RUN npm run build


# ==========================================
# Stage 2: Nginx Production Server
# ==========================================
FROM nginx:alpine

# Remove default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy our custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy React/Vite production build
COPY --from=builder /app/build /usr/share/nginx/html

# Nginx listens on port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

