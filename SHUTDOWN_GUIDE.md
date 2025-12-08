# 🛑 AskCart Shutdown & Startup Guide

## Quick Commands

### Safe Shutdown (Recommended)
```bash
./scripts/shutdown.sh
```

### Safe Startup
```bash
./scripts/startup.sh
```

---

## Manual Shutdown (Step by Step)

### 1. Stop Spring Boot Services
Stop services in **reverse dependency order** to avoid connection errors:

```bash
# Step 1: Stop API Gateway (port 8000)
lsof -ti:8000 | xargs kill -15

# Step 2: Stop Auth Service (port 8005)
lsof -ti:8005 | xargs kill -15

# Step 3: Stop AI Service (port 8004)
lsof -ti:8004 | xargs kill -15

# Step 4: Stop Order Service (port 8003)
lsof -ti:8003 | xargs kill -15

# Step 5: Stop Cart Service (port 8002)
lsof -ti:8002 | xargs kill -15

# Step 6: Stop Product Service (port 8001)
lsof -ti:8001 | xargs kill -15

# Step 7: Stop Frontend (port 5173)
lsof -ti:5173 | xargs kill -15
```

**Note:** Using `kill -15` (SIGTERM) allows graceful shutdown vs `kill -9` (SIGKILL)

### 2. Stop Docker Containers Safely

> **Important:** Your containers are running under `dev` profile.

```bash
# Graceful stop (recommended)
docker-compose --profile dev stop

# OR for faster shutdown (still safe)
docker-compose --profile dev down

# To also remove volumes (⚠️ DELETES DATA)
docker-compose --profile dev down -v
```

### 3. Verify Everything Stopped

```bash
# Check no services running
lsof -i :8000,8001,8002,8003,8004,8005,5173

# Check Docker
docker-compose ps
```

---

## Manual Startup (Step by Step)

### 1. Start Docker Containers First

```bash
# Start all containers
docker-compose --profile dev up -d

# Wait for services to be healthy (important!)
sleep 10

# Verify containers are running
docker-compose ps
```

### 2. Start Microservices in Order

```bash
# Terminal 1: Product Service
java -jar BackEnd/product_service/target/product-service-0.0.1-SNAPSHOT.jar

# Terminal 2: Cart Service (wait 3 seconds after product)
java -jar BackEnd/cart_service/target/cart-service-0.0.1-SNAPSHOT.jar

# Terminal 3: Order Service
java -jar BackEnd/order_service/target/order-service-0.0.1-SNAPSHOT.jar

# Terminal 4: AI Service
java -jar BackEnd/ai_service/target/ai-service-0.0.1-SNAPSHOT.jar

# Terminal 5: Auth Service (wait for DB to be ready)
java -jar BackEnd/authService/target/auth-service-0.0.1-SNAPSHOT.jar

# Terminal 6: API Gateway (start last)
java -jar BackEnd/api_gateway/target/api-gateway-0.0.1-SNAPSHOT.jar

# Terminal 7: Frontend
cd FrontEnd && npm run dev
```

---

## Docker Container Management

### Safe PostgreSQL Shutdown
```bash
docker-compose --profile dev stop postgres
```

### Safe Redis Shutdown
```bash
docker-compose --profile dev stop redis
```

### Safe Kafka Shutdown
```bash
docker-compose --profile dev stop kafka zookeeper
```

### Check Container Health
```bash
docker-compose ps
docker logs askcart-postgres-1
docker logs askcart-redis-1
docker logs askcart-kafka-1
```

---

## Troubleshooting

### If Services Won't Stop
```bash
# Find process by port
lsof -ti:8001

# Force kill if necessary (last resort)
lsof -ti:8001 | xargs kill -9
```

### If Docker Won't Stop
```bash
# Force stop
docker-compose kill

# Remove containers
docker-compose rm -f
```

### If Database Connection Issues After Restart
```bash
# Restart PostgreSQL container
docker-compose --profile dev restart postgres

# Check logs
docker logs askcart-postgres-1

# Verify it's listening
docker exec askcart-postgres-1 pg_isready -U user
```

### If Ports Still in Use
```bash
# Find what's using a port
sudo lsof -i :8001

# Kill all Java processes (⚠️ use carefully)
pkill -f "java -jar"
```

---

## Best Practices

1. **Always shutdown front-to-back**: Gateway → Services → Docker
2. **Always startup back-to-front**: Docker → Services → Gateway
3. **Use SIGTERM (`kill -15`)** not SIGKILL (`kill -9`)
4. **Wait between starts**: Give services time to connect to dependencies
5. **Check logs**: Use `docker logs` and service console output
6. **Use scripts**: Automated scripts prevent human error

---

## Complete Rebuild (Fresh Start)

If you need to completely reset everything:

```bash
# 1. Stop everything
./scripts/shutdown.sh

# 2. Remove Docker volumes (deletes all data!)
docker-compose --profile dev down -v

# 3. Rebuild JARs
mvn clean package -DskipTests

# 4. Start fresh
docker-compose --profile dev up -d
sleep 15
./scripts/startup.sh
```

---

## Service Status Check

```bash
# Quick health check
curl http://localhost:8000/actuator/health  # Gateway
curl http://localhost:8001/actuator/health  # Product
curl http://localhost:8005/register         # Auth (should return error, but proves it's up)

# Docker health
docker-compose ps
```
