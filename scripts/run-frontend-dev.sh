#!/bin/bash

# Change to frontend directory
cd frontend || exit 1

# Check if node_modules exists, if not run npm install
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Start the development server
echo "Starting Vite development server..."
npm run dev