# Stage 1: Build
FROM node:20-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production (Dùng Nginx)
FROM nginx:stable-alpine
# Copy file đã build vào thư mục của Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html
# Copy file cấu hình Nginx (nếu có)
# COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]