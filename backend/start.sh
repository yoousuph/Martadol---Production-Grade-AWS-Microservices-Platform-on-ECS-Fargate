#!/bin/sh

set -e

echo "======================================"
echo "Starting backend container..."
echo "======================================"

echo "🌱 Running database seed..."

node seed.js

echo "======================================"
echo "✅ Seed completed successfully"
echo "🚀 Starting backend application..."
echo "======================================"

exec node server.js