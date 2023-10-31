# Build stage
FROM node:14-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Runtime stage
FROM gcr.io/distroless/nodejs
WORKDIR /app
COPY --from=builder /app/build ./build
EXPOSE 3000
CMD ["serve", "-s build"]
