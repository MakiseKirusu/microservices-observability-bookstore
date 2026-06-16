FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ... (Keep all your existing Node/build stuff at the top)

FROM nginx:alpine
# Copy your React build files (this might be /app/build or /app/dist depending on your setup)
COPY --from=build /app/dist /usr/share/nginx/html

# --- ADD THIS EXACT LINE ---
# This copies the magic routing file we just made into Nginx!
COPY nginx.conf /etc/nginx/conf.d/default.conf
# ---------------------------

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]