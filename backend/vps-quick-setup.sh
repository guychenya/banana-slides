#!/bin/bash
# Quick setup script for Banana Slides on VPS
# Run this on your VPS at 157.173.126.133

set -e

echo "=== Banana Slides VPS Setup ==="
echo ""

# 1. Update system
echo "Step 1: Updating system..."
apt update && apt upgrade -y

# 2. Install dependencies
echo "Step 2: Installing dependencies..."
apt install -y python3 python3-pip git

# 3. Clone repository
echo "Step 3: Cloning repository..."
mkdir -p /var/www
cd /var/www
if [ -d "banana-slides" ]; then
    echo "Repository already exists, pulling latest..."
    cd banana-slides
    git pull origin main
else
    git clone https://github.com/guychenya/banana-slides.git
    cd banana-slides
fi

# 4. Install Python packages
echo "Step 4: Installing Python packages..."
cd backend
pip3 install -r requirements.txt

# 5. Create directories
echo "Step 5: Creating directories..."
mkdir -p instance uploads

# 6. Configure environment
echo "Step 6: Setting up environment..."
if [ ! -f .env ]; then
    cat > .env << 'EOF'
FLASK_ENV=production
SECRET_KEY=change-this-to-a-random-secret-key
CORS_ORIGINS=https://memonana.netlify.app,http://localhost:3000
EOF
    echo "Created .env file. IMPORTANT: You need to add your GOOGLE_API_KEY!"
fi

# 7. Initialize database
echo "Step 7: Initializing database..."
python3 -c "from app import app, db; app.app_context().push(); db.create_all(); print('Database initialized')"

# 8. Setup systemd service
echo "Step 8: Setting up systemd service..."
cp banana-slides.service /etc/systemd/system/
systemctl daemon-reload
systemctl enable banana-slides

# 9. Configure firewall
echo "Step 9: Configuring firewall..."
if command -v ufw &> /dev/null; then
    ufw allow 5000/tcp
    ufw --force enable
else
    echo "UFW not installed, skipping firewall setup"
fi

echo ""
echo "=== Setup Complete! ==="
echo ""
echo "⚠️  IMPORTANT: Before starting the service, you MUST:"
echo "1. Edit /var/www/banana-slides/backend/.env"
echo "2. Add your GOOGLE_API_KEY"
echo ""
echo "Then run:"
echo "  systemctl start banana-slides"
echo "  systemctl status banana-slides"
echo ""
echo "Test with: curl http://157.173.126.133:5000/health"
