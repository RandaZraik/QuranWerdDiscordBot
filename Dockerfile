FROM node:22-bookworm-slim

ENV NODE_ENV=production

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install exactly the locked production dependencies
RUN npm ci --omit=dev --omit=optional --no-audit

# Copy the rest of the bot’s code into the container
COPY . .

CMD ["npm", "start"]
