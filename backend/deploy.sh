#!/bin/bash
# Deployment script for Banana Slides backend

set -e

echo "Starting Banana Slides backend deployment..."

# Update code
echo "Pulling latest code..."
git pull origin main

# Install/update dependencies
echo "Installing Python dependencies..."
pip3 install -r requirements.txt

# Create necessary directories
mkdir -p instance uploads

# Run database migrations if needed
echo "Setting up database..."
python3 -c "from app import app, db; app.app_context().push(); db.create_all(); print('Database initialized')"

# Restart the service
echo "Restarting service..."
sudo systemctl restart banana-slides

echo "Deployment complete!"
echo "Check status with: sudo systemctl status banana-slides"
