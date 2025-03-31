# Install dependencies only when needed
FROM node:alpine AS development

WORKDIR /app
COPY package*.json package-lock*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["yarn", "start"]