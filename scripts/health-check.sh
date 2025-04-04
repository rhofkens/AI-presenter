#!/bin/bash

# Default URL
URL="http://localhost:8080/health"

# Function to print usage
print_usage() {
    echo "Usage: $0 [-u <url>]"
    echo "  -u: URL to check (default: $URL)"
    echo "Example: $0 -u http://example.com/health"
}

# Parse command line arguments
while getopts "u:h" opt; do
    case $opt in
        u) URL="$OPTARG";;
        h) print_usage; exit 0;;
        ?) print_usage; exit 1;;
    esac
done

echo "Checking health at: $URL"
echo "------------------------"

# Make the request and store the response
response=$(curl -s -w "\n%{http_code}" "$URL")
status_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | sed '$d')

# Check if curl was successful
if [ $? -ne 0 ]; then
    echo "Error: Failed to connect to $URL"
    exit 1
fi

# Check status code
if [ "$status_code" -eq 200 ]; then
    echo "Status: OK (200)"
    echo "Response:"
    echo "$body" | jq '.'
    exit 0
else
    echo "Error: Received status code $status_code"
    echo "Response:"
    echo "$body"
    exit 1
fi