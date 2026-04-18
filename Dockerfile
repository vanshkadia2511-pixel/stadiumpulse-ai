# Production Dockerfile for StadiumPulse AI - Refactored Build
# Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .

# Ensure environment variables are available to Vite during build
ARG VITE_FIREBASE_API_KEY
ARG VITE_FIREBASE_PROJECT_ID
ARG VITE_FIREBASE_AUTH_DOMAIN
ARG VITE_FIREBASE_STORAGE_BUCKET
ARG VITE_FIREBASE_MESSAGING_SENDER_ID
ARG VITE_FIREBASE_APP_ID
ARG VITE_GEMINI_API_KEY
ARG VITE_MAPS_API_KEY
ARG VITE_DEMO_MODE

ENV VITE_FIREBASE_API_KEY=$VITE_FIREBASE_API_KEY
ENV VITE_FIREBASE_PROJECT_ID=$VITE_FIREBASE_PROJECT_ID
ENV VITE_FIREBASE_AUTH_DOMAIN=$VITE_FIREBASE_AUTH_DOMAIN
ENV VITE_FIREBASE_STORAGE_BUCKET=$VITE_FIREBASE_STORAGE_BUCKET
ENV VITE_FIREBASE_MESSAGING_SENDER_ID=$VITE_FIREBASE_MESSAGING_SENDER_ID
ENV VITE_FIREBASE_APP_ID=$VITE_FIREBASE_APP_ID
ENV VITE_GEMINI_API_KEY=$VITE_GEMINI_API_KEY
ENV VITE_MAPS_API_KEY=$VITE_MAPS_API_KEY
ENV VITE_DEMO_MODE=$VITE_DEMO_MODE

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
