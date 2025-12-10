#!/bin/bash

# Banana Slides VPS Quick Setup Script

# ---
# Note: This script is for Ubuntu/Debian based systems.
# ---

# 1. Update system
apt update && apt upgrade -y

# 2. Install dependencies
apt install -y python3 python3-pip git

# 3. Clone repository
if [ -d "/var/www/banana-slides" ]; then
    echo "Repository already exists, pulling latest changes..."
    cd /var/www/banana-slides
    git pull
else
    echo "Cloning repository..."
    git clone https://github.com/guychenya/banana-slides.git /var/www/banana-slides
fi

# 4. Install Python packages
pip3 install -r /var/www/banana-slides/backend/requirements.txt

# 5. Make instance and uploads directory
mkdir -p /var/www/banana-slides/backend/instance
mkdir -p /var/www/banana-slides/backend/uploads

# 6. Configure environment
if [ ! -f "/var/www/banana-slides/backend/.env" ]; then
    echo "Creating .env file..."
    touch /var/www/banana-slides/backend/.env
    echo "FLASK_ENV=production" >> /var/www/banana-slides/backend/.env
    echo "SECRET_KEY='a-very-secret-key'" >> /var/www/banana-slides/backend/.env
    echo "CORS_ORIGINS='http://localhost:5173,http://localhost:3000,http://your_domain.com'" >> /var/www/banana-slides/backend/.env
    echo "# Add your Google API key here" >> /var/www/banana-slides/backend/.env
    echo "GOOGLE_API_KEY=''" >> /var/www/banana-slides/backend/.env
else
    echo ".env file already exists."
fi

# 7. Init database
python3 -c "from app import create_app; from models.database import db; app = create_app(); db.create_all(app=app)"

# 8. Setup systemd service
cp /var/www/banana-slides/backend/banana-slides.service /etc/systemd/system/
systemctl daemon-reload
systemctl enable banana-slides.service

# 9. Configure firewall
if [ -x "$(command -v ufw)" ]; then
    ufw allow 5000/tcp
fi

echo "---"
echo "Setup complete!"
echo "Please edit the .env file and add your GOOGLE_API_KEY."
echo "Then, run the following commands to start the service:"
echo "---"
echo "sudo systemctl start banana-slides.service"
echo "sudo systemctl status banana-slides.service"
echo "---"
echo "You can test the service by running:"
echo "curl http://localhost:5000/api/health"
echo "---"