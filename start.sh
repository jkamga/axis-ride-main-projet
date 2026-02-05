#!/bin/bash

echo "🚀 Starting AxisRide Platform..."
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "❌ docker-compose is not installed. Please install it and try again."
    exit 1
fi

echo "✅ Docker is running"
echo ""

# Build and start services
echo "📦 Building and starting all services..."
docker-compose up -d --build

echo ""
echo "⏳ Waiting for services to be ready (this may take 2-3 minutes)..."
echo ""

# Wait for services
sleep 30

echo "🔍 Checking service health..."
echo ""

# Function to check service health
check_service() {
    local service=$1
    local port=$2
    local max_attempts=30
    local attempt=0
    
    while [ $attempt -lt $max_attempts ]; do
        if curl -s -f "http://localhost:${port}/actuator/health" > /dev/null 2>&1; then
            echo "✅ $service is healthy"
            return 0
        fi
        attempt=$((attempt + 1))
        sleep 2
    done
    
    echo "⚠️  $service is not responding (port $port)"
    return 1
}

# Check critical services
check_service "Discovery Server" 8761
check_service "API Gateway" 8080
check_service "Auth Service" 8081
check_service "Trip Service" 8083

echo ""
echo "🎉 AxisRide Platform is ready!"
echo ""
echo "📍 Access points:"
echo "   • API Gateway:      http://localhost:8080"
echo "   • Eureka Dashboard: http://localhost:8761"
echo "   • Keycloak Admin:   http://localhost:8180 (admin/admin)"
echo ""
echo "📚 Quick start:"
echo "   # Register a user"
echo "   curl -X POST http://localhost:8080/api/auth/register \\"
echo "     -H 'Content-Type: application/json' \\"
echo "     -d '{\"email\":\"test@axisride.com\",\"password\":\"Test@1234\",\"firstName\":\"John\",\"lastName\":\"Doe\",\"role\":\"USER\"}'"
echo ""
echo "📊 Monitor logs:"
echo "   docker-compose logs -f [service-name]"
echo ""
echo "🛑 Stop all services:"
echo "   docker-compose down"
echo ""
