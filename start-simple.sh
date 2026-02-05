#!/bin/bash

echo "🚀 Starting AxisRide Infrastructure (Simple Mode)..."
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

echo "✅ Docker is running"
echo ""

# Start only infrastructure services
echo "📦 Starting infrastructure services (PostgreSQL, Redis, Kafka, Keycloak)..."
docker-compose -f docker-compose-simple.yml up -d

echo ""
echo "⏳ Waiting for services to be ready..."
sleep 30

echo ""
echo "🔍 Checking service health..."
echo ""

# Function to check service
check_service() {
    local service=$1
    local port=$2
    local max_attempts=15
    local attempt=0
    
    while [ $attempt -lt $max_attempts ]; do
        if nc -z localhost $port 2>/dev/null; then
            echo "✅ $service is ready (port $port)"
            return 0
        fi
        attempt=$((attempt + 1))
        sleep 2
    done
    
    echo "⚠️  $service is not responding (port $port)"
    return 1
}

# Check infrastructure
check_service "PostgreSQL" 5432
check_service "Redis" 6379
check_service "Kafka" 9092
check_service "Keycloak" 8180

echo ""
echo "🎉 Infrastructure is ready!"
echo ""
echo "📍 Next Steps:"
echo ""
echo "   1️⃣  Build the microservices:"
echo "      ./gradlew build"
echo ""
echo "   2️⃣  Run services locally:"
echo "      java -jar discovery-server/build/libs/*.jar &"
echo "      # Wait 20 seconds for Eureka to start"
echo "      java -jar config-server/build/libs/*.jar &"
echo "      java -jar api-gateway/build/libs/*.jar &"
echo "      java -jar auth-service/build/libs/*.jar &"
echo ""
echo "   3️⃣  Start the frontend:"
echo "      cd frontend-angular"
echo "      npm install"
echo "      npm start"
echo ""
echo "📊 Infrastructure URLs:"
echo "   • PostgreSQL:  localhost:5432 (postgres/postgres)"
echo "   • Redis:       localhost:6379"
echo "   • Kafka:       localhost:9092"
echo "   • Keycloak:    http://localhost:8180 (admin/admin)"
echo ""
echo "🛑 Stop infrastructure:"
echo "   docker-compose -f docker-compose-simple.yml down"
echo ""
