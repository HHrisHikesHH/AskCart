#!/bin/bash

echo "🚀 Starting AskCart services..."

# Start Docker containers first
echo ""
echo "Starting Docker containers (PostgreSQL, Redis, Kafka, Milvus)..."
docker-compose --profile dev up -d

# Wait for services to be healthy
echo ""
echo "Waiting for Docker services to be ready..."
sleep 10

# Function to start a service in background
start_service() {
    local jar_path=$1
    local service_name=$2
    
    echo "Starting $service_name..."
    nohup java -jar $jar_path > logs/${service_name}.log 2>&1 &
    echo "  ✅ $service_name started (PID: $!)"
}

# Create logs directory
mkdir -p logs

# Start microservices in dependency order
echo ""
echo "Starting Spring Boot Microservices..."
start_service "BackEnd/product_service/target/product-service-0.0.1-SNAPSHOT.jar" "product-service"
sleep 3

start_service "BackEnd/cart_service/target/cart-service-0.0.1-SNAPSHOT.jar" "cart-service"
sleep 2

start_service "BackEnd/order_service/target/order-service-0.0.1-SNAPSHOT.jar" "order-service"
sleep 2

start_service "BackEnd/ai_service/target/ai-service-0.0.1-SNAPSHOT.jar" "ai-service"
sleep 2

start_service "BackEnd/authService/target/auth-service-0.0.1-SNAPSHOT.jar" "auth-service"
sleep 3

start_service "BackEnd/api_gateway/target/api-gateway-0.0.1-SNAPSHOT.jar" "api-gateway"
sleep 3

# Start Frontend
echo ""
echo "Starting Frontend..."
cd FrontEnd
nohup npm run dev > ../logs/frontend.log 2>&1 &
echo "  ✅ Frontend started (PID: $!)"
cd ..

echo ""
echo "✅ All services started successfully!"
echo ""
echo "📊 Service URLs:"
echo "  • API Gateway:    http://localhost:8000"
echo "  • Auth Service:   http://localhost:8005"
echo "  • Product:        http://localhost:8001"
echo "  • Cart:           http://localhost:8002"
echo "  • Order:          http://localhost:8003"
echo "  • AI:             http://localhost:8004"
echo "  • Frontend:       http://localhost:5173"
echo ""
echo "📝 Logs are available in ./logs/"
echo ""
echo "To check service status: docker-compose ps"
echo "To view logs: tail -f logs/<service-name>.log"
echo "To shutdown: ./scripts/shutdown.sh"
