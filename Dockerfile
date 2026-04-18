# Production Dockerfile for StadiumPulse AI - Refactored Build
# Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .

# Pass build args if needed for static replacement, 
# but Vite usually handles envs via .env during build.
# For Cloud Run, we typically bake them in or use a runtime config.
RUN npm run build

# Stage 2: Serve
FROM nginx:stable-alpine

# Copy build assets from stage 1
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config if needed (optional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

# Cloud Run expects the port to be 8080 by default, 
# but Nginx defaults to 80. Let's adjust Nginx to listen on 8080.
RUN sed -i 's/listen\(.*\)80;/listen 8080;/g' /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
