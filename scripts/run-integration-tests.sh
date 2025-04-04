#!/bin/bash

# Function to cleanup background processes on exit
cleanup() {
    echo "Cleaning up..."
    kill $(jobs -p) 2>/dev/null
    exit
}

# Set up cleanup trap
trap cleanup EXIT INT TERM

# Start Spring Boot backend
echo "Starting Spring Boot backend..."
cd "$(dirname "$0")/.." || exit 1
./mvnw spring-boot:run &

# Wait for backend to be ready
echo "Waiting for backend to start..."
until curl -s http://localhost:8080/api/health > /dev/null; do
    sleep 1
done
echo "Backend is ready!"

# Start frontend tests
echo "Running frontend tests..."
cd frontend || exit 1
npm run test

# Store the test result
TEST_RESULT=$?

# Exit with the test result
exit $TEST_RESULT