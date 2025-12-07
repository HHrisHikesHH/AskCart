#!/bin/bash

echo "🛑 Safely shutting down AskCart services..."

# Function to gracefully stop a service by port
stop_service_by_port() {
    local port=$1
    local service_name=$2
    
    echo "Stopping $service_name (port $port)..."
    PID=$(lsof -ti:$port)
    if [ ! -z "$PID" ]; then
        kill -15 $PID  # SIGTERM for graceful shutdown
        sleep 2
        # Check if still running
        if lsof -ti:$port > /dev/null; then
            echo "  ⚠️  $service_name didn't stop gracefully, forcing..."
            kill -9 $PID
        else
            echo "  ✅ $service_name stopped gracefully"
        fi
    else
        echo "  ℹ️  $service_name not running"
    fi
}

# Stop Spring Boot Services (in reverse order of dependencies)
echo ""
echo "Stopping Spring Boot Microservices..."
stop_service_by_port 8000 "API Gateway"
stop_service_by_port 8005 "Auth Service"
stop_service_by_port 8004 "AI Service"
stop_service_by_port 8003 "Order Service"
stop_service_by_port 8002 "Cart Service"
stop_service_by_port 8001 "Product Service"

# Stop Frontend
echo ""
echo "Stopping Frontend..."
PID=$(lsof -ti:5173)
if [ ! -z "$PID" ]; then
    kill -15 $PID
    echo "  ✅ Frontend stopped"
else
    echo "  ℹ️  Frontend not running"
fi

# Stop Docker containers gracefully
echo ""
echo "Stopping Docker containers..."
docker-compose --profile dev stop

echo ""
echo "✅ All services stopped successfully!"
echo ""
echo "To start again, run: ./scripts/startup.sh"
