FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the bot’s code into the container
COPY . .

CMD ["npm", "start"]
