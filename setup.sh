#!/bin/bash

# Resume Application Setup Script (Unix/Linux/macOS)
# This script helps set up the Docker environment for the resume application

echo "╔════════════════════════════════════════════════════════════╗"
echo "║     Resume Application - Docker Setup                      ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Check prerequisites
echo "🔍 Checking prerequisites..."
echo ""

# Check Docker
if command -v docker &> /dev/null; then
    DOCKER_VERSION=$(docker --version)
    echo "✅ Docker is installed: $DOCKER_VERSION"
else
    echo "❌ Docker is not installed"
    echo "   Please install from: https://www.docker.com/products/docker-desktop/"
    exit 1
fi

# Check Docker Compose
if command -v docker-compose &> /dev/null; then
    COMPOSE_VERSION=$(docker-compose --version)
    echo "✅ Docker Compose is installed: $COMPOSE_VERSION"
else
    echo "❌ Docker Compose is not installed"
    echo "   Please install from: https://docs.docker.com/compose/install/"
    exit 1
fi

echo ""

# Create .env file
echo "📝 Setting up environment variables..."
if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo "✅ Created .env file from .env.example"
    else
        echo "⚠️  .env.example not found"
    fi
else
    echo "✅ .env file already exists"
fi

echo ""

# Create required directories
echo "📁 Creating required directories..."
mkdir -p backend
mkdir -p nginx/conf.d
echo "✅ Created required directories"

echo ""

# Build and start services
echo "🚀 Building and starting services..."
echo "   This may take a few minutes on first run..."
echo ""

docker-compose build
if [ $? -ne 0 ]; then
    echo "❌ Failed to build services"
    exit 1
fi

docker-compose up -d
if [ $? -ne 0 ]; then
    echo "❌ Failed to start services"
    exit 1
fi

echo ""

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 5

# Check service status
echo ""
echo "📊 Service Status:"
docker-compose ps

echo ""
echo "✅ Setup completed successfully!"
echo ""
echo "📱 Access your applications:"
echo "   • Frontend:   http://localhost:3000"
echo "   • Backend:    http://localhost:5000"
echo "   • API:        http://localhost/api"
echo "   • pgAdmin:    http://localhost:5050"
echo ""
echo "📚 Default pgAdmin credentials:"
echo "   • Email:      admin@example.com"
echo "   • Password:   admin"
echo ""
echo "🔧 Useful commands:"
echo "   • make help           - Show all available commands"
echo "   • docker-compose logs - View service logs"
echo "   • docker-compose ps   - Check service status"
echo ""
echo "📖 For more information, see DOCKER_README.md"
echo ""
