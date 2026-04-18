# Production Dockerfile for StadiumPulse AI - Refactored Build
# Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .

# Bake environment variables directly into the build
ENV VITE_FIREBASE_API_KEY=AIzaSyAwZTUh5V2sDiL2P4HQqz8ZFukQyRb3dEw
ENV VITE_FIREBASE_AUTH_DOMAIN=stadiumpulse-ai.firebaseapp.com
ENV VITE_FIREBASE_PROJECT_ID=stadiumpulse-ai
ENV VITE_FIREBASE_STORAGE_BUCKET=stadiumpulse-ai.firebasestorage.app
ENV VITE_FIREBASE_MESSAGING_SENDER_ID=169784611425
ENV VITE_FIREBASE_APP_ID=1:169784611425:web:661a7a45c06f95372d1020
ENV VITE_GEMINI_API_KEY=AIzaSyCiLwsbMALjzqQgEjwgvsSM6ohgNI15yck
ENV VITE_MAPS_API_KEY=AIzaSyDv1NoO68zEJMTL6gCuMZxJM4YqEX6EBBo
ENV VITE_DEMO_MODE=true

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
