# client/Dockerfile
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./

# Force dev dependencies to install (includes react-scripts)
RUN npm install --include=dev

COPY . .

RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/build ./build
CMD ["serve", "-s", "build", "-l", "3000"]
