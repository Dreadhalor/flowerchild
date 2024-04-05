ARG NODE_VERSION=21.6.1
ARG PNPM_VERSION=8.15.1

# Use node image for base image for all stages.
FROM --platform=linux/amd64 node:${NODE_VERSION}-alpine as base
# FROM node:${NODE_VERSION}-alpine as base

# Set working directory for all build stages.
WORKDIR /usr/src/app

# Install pnpm.
RUN npm install -g pnpm@${PNPM_VERSION}

# Copy all local files
COPY . .

# Install dependencies needed to install aws-crt. Bleh.
RUN apk add --no-cache build-base gcc g++ make python3 cmake

# Install dependencies.
RUN pnpm i

# Build the app.
RUN pnpm build

# Expose the port.
EXPOSE 3001

# # Start the portfolio backend.
ENTRYPOINT ["pnpm", "start"]