# Use Node.js as the base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Expose the API port (modify if necessary)
ENV PORT=3000
EXPOSE 3000

# Set environment variables for database selection
ENV SQLITE_DB_LOCATION=/etc/todos/todo.db

# Ensure database migrations run before starting
RUN mkdir -p /etc/todos

# Default command to run the server
CMD ["node", "app.js"]
