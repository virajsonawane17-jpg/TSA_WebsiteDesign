#!/bin/bash

# Startup script for Tampa Community Resource Hub
# This script will install dependencies and start the development server

echo "🚀 Starting Tampa Community Resource Hub..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    if command -v npm &> /dev/null; then
        npm install
    elif command -v yarn &> /dev/null; then
        yarn install
    elif command -v pnpm &> /dev/null; then
        pnpm install
    elif command -v bun &> /dev/null; then
        bun install
    else
        echo "❌ Error: No package manager found. Please install Node.js and npm."
        exit 1
    fi
else
    echo "✅ Dependencies already installed"
fi

echo ""
echo "🌐 Starting development server..."
echo "📍 Server will be available at http://localhost:3000"
echo ""

# Start the dev server
if command -v npm &> /dev/null; then
    npm run dev
elif command -v yarn &> /dev/null; then
    yarn dev
elif command -v pnpm &> /dev/null; then
    pnpm dev
elif command -v bun &> /dev/null; then
    bun run dev
else
    echo "❌ Error: No package manager found."
    exit 1
fi
