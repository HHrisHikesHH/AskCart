# 🛒 AskCart - AI-Powered E-Commerce Platform

AskCart is a microservices-based e-commerce platform that integrates **Conversational AI (RAG)** for a smart shopping experience. It features a distributed architecture using **Spring Boot**, **Kafka**, **PostgreSQL**, **Redis**, and **Vector DB (Milvus)**, with **JWT-based authentication** and a modern **React frontend**.

## 🏗️ Architecture Overview

| Service | Port | Description | DB | Status |
| :--- | :--- | :--- | :--- | :--- |
| **API Gateway** | `8000` | Unified entry point, JWT validation, routing | - | ✅ Production Ready |
| **Product Service** | `8001` | Manages product catalog, emits `product.events` | PostgreSQL | ✅ Production Ready |
| **Cart Service** | `8002` | Manages user carts and session state | Redis | ✅ Production Ready |
| **Order Service** | `8003` | Handles order placement and lifecycle | PostgreSQL | ✅ Production Ready |
| **AI Service** | `8004` | RAG-based AI assistant, vector ingestion | Milvus | ✅ Production Ready |
| **Auth Service** | `8005` | User registration, login, JWT management | PostgreSQL | ✅ Production Ready |
| **Frontend** | `5173` | React + Ant Design UI | - | ✅ Production Ready |

### 🔐 Authentication Flow
- JWT tokens stored in HTTP-only cookies
- API Gateway validates all requests
- User context propagated via `X-User-Id` header
- Automatic token refresh
- Protected routes in frontend

---

## 🚀 Quick Start (Automated)

### **Option 1: One-Command Startup** ⚡ (Recommended)

```bash
# 1. Start infrastructure (PostgreSQL, Redis, Kafka, Milvus)
docker-compose up -d
sleep 10  # Wait for containers to be ready

# 2. Build all services
mvn clean install -DskipTests

# 3. Start everything automatically
./scripts/startup.sh
```

### **Option 2: One-Command Shutdown** 🛑

```bash
./scripts/shutdown.sh
```

> **Note:** These scripts handle graceful shutdown/startup with proper ordering and logging to `./logs/`

---

## 📚 Manual Setup (Step by Step)

### Prerequisites
- Java 21+
- Maven 3.8+
- Node.js 18+ & npm
- Docker & Docker Compose

### 1. Start Infrastructure

```bash
docker-compose up -d
```

**Services started:**
- PostgreSQL (port 5432)
- Redis (port 6379)
- Kafka (external: 29092, internal: 9092)
- Zookeeper (port 2181)
- Milvus (port 19530)
- MinIO (port 9000)

### 2. Build the Project

```bash
mvn clean install -DskipTests
```

### 3. Run Microservices

> **Important:** Start services in this order to ensure proper dependency initialization.

#### Terminal 1: Product Service
Initializes Kafka topics.
```bash
java -jar BackEnd/product_service/target/product-service-0.0.1-SNAPSHOT.jar
```

#### Terminal 2: AI Service
Consumes product events for vector encoding.
```bash
java -jar BackEnd/ai_service/target/ai-service-0.0.1-SNAPSHOT.jar
```

#### Terminal 3: Cart Service
```bash
java -jar BackEnd/cart_service/target/cart-service-0.0.1-SNAPSHOT.jar
```

#### Terminal 4: Order Service
```bash
java -jar BackEnd/order_service/target/order-service-0.0.1-SNAPSHOT.jar
```

#### Terminal 5: Auth Service
Handles user registration, login, JWT tokens.
```bash
java -jar BackEnd/authService/target/auth-service-0.0.1-SNAPSHOT.jar
```

#### Terminal 6: API Gateway
Must start **after** all other services.
```bash
java -jar BackEnd/api_gateway/target/api-gateway-0.0.1-SNAPSHOT.jar
```

#### Terminal 7: Frontend
React application with authentication UI.
```bash
cd FrontEnd
npm install  # First time only
npm run dev
```

---

## 🌐 Access Points

| Service | URL | Authentication |
|---------|-----|----------------|
| **Frontend** | http://localhost:5173 | Login/Register Page |
| **API Gateway** | http://localhost:8000 | Required for `/api/*` |
| **Auth API** | http://localhost:8000/api/auth/* | Public endpoints |

### Quick Test
```bash
# Health check
curl http://localhost:8000/actuator/health

# Register a user
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"test123"}'

# Login (returns JWT cookie)
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test123"}' \
  -c cookies.txt

# Access protected resource
curl http://localhost:8000/api/cart/1 -b cookies.txt
```

---

## 🧪 Testing the Application

### Using Postman
Import the collection: `AskCart API.postman_collection.json`

**Includes:**
- ✅ User Registration & Login
- ✅ Token Refresh & Logout
- ✅ Product CRUD operations
- ✅ Cart management
- ✅ Order creation
- ✅ AI Chat queries

### Manual Testing Guide
See [TESTING.md](./TESTING.md) for detailed API testing steps.

---

## 🛑 Safe Shutdown & Startup

### **Automated (Recommended)**

```bash
# Graceful shutdown
./scripts/shutdown.sh

# Graceful startup
./scripts/startup.sh
```

### **Why This Matters**

| ❌ Wrong | ✅ Right |
|----------|----------|
| `kill -9` PID | `kill -15` PID |
| Random order | Dependency order |
| `docker-compose kill` | `docker-compose stop` |

**Benefits:**
- PostgreSQL commits transactions properly
- Redis saves cache to disk
- Kafka flushes message queues
- Spring Boot closes connections cleanly

> See [SHUTDOWN_GUIDE.md](./SHUTDOWN_GUIDE.md) for troubleshooting

---

## 🧰 Tech Stack

### Backend
- **Framework:** Spring Boot 3.2.11, Spring Cloud Gateway
- **Data:** PostgreSQL, Redis (Reactive), Milvus (Vector DB)
- **Messaging:** Apache Kafka
- **Security:** JWT (HTTP-only cookies), BCrypt password hashing
- **AI:** LangChain4j / Spring AI (Planned)

### Frontend
- **Framework:** React 19 + TypeScript + Vite
- **UI Library:** Ant Design 5
- **HTTP Client:** Axios
- **Routing:** React Router v7
- **State:** React Context API

### Infrastructure
- **Containerization:** Docker & Docker Compose
- **Build:** Maven (multi-module)
- **CI/CD:** Ready for GitHub Actions

---

## 📁 Project Structure

```
AskCart/
├── BackEnd/
│   ├── api_gateway/        # 8000 - Entry point, JWT validation
│   ├── authService/        # 8005 - User auth, JWT tokens
│   ├── product_service/    # 8001 - Product catalog
│   ├── cart_service/       # 8002 - Shopping cart
│   ├── order_service/      # 8003 - Order management
│   └── ai_service/         # 8004 - RAG AI assistant
├── FrontEnd/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── contexts/       # AuthContext for global state
│   │   ├── pages/          # Login, Register, Home
│   │   ├── utils/          # API client with axios
│   │   └── router/         # Protected routes
├── scripts/
│   ├── shutdown.sh         # Safe shutdown script
│   └── startup.sh          # Automated startup
├── docker-compose.yml      # Infrastructure definition
├── pom.xml                 # Parent Maven config
├── README.md               # This file
├── TESTING.md              # API testing guide
└── SHUTDOWN_GUIDE.md       # Ops manual
```

---

## 🐛 Troubleshooting

### **1. "FATAL: role 'user' does not exist"**
**Cause:** Local PostgreSQL blocking Docker.

**Fix:**
```bash
# Stop local Postgres
brew services stop postgresql@14

# Restart Docker with fresh volumes
docker-compose down -v && docker-compose up -d
```

---

### **2. API Gateway Returns 404**
**Cause:** Missing `StripPrefix` filter.

**Fix:** Check `BackEnd/api_gateway/src/main/resources/application.yml`:
```yaml
routes:
  - id: product-service
    predicates:
      - Path=/api/products/**
    filters:
      - StripPrefix=1  # Required!
  
  - id: auth-service
    predicates:
      - Path=/api/auth/**
    filters:
      - StripPrefix=2  # Auth needs 2 (removes /api/auth)
```

---

### **3. Kafka Connection Refused**
**Cause:** Wrong port configuration.

**Fix:** Use `localhost:29092` for local development:
```yaml
spring:
  kafka:
    bootstrap-servers: localhost:29092  # Not 9092!
```

---

### **4. Frontend Shows "XHR failed" or Infinite Redirect**
**Cause:** Auth Service not running or CORS issue.

**Fix:**
```bash
# Verify Auth Service is running
curl http://localhost:8005/register

# Check API Gateway routes
curl http://localhost:8000/actuator/gateway/routes

# Restart with proper order
./scripts/shutdown.sh
./scripts/startup.sh
```

---

### **5. "relation 'products' does not exist"**
**Cause:** R2DBC doesn't auto-create tables.

**Fix:**
```bash
docker exec -it askcart-postgres-1 psql -U user -d db -c "
CREATE TABLE products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    sku VARCHAR(255),
    price DOUBLE PRECISION,
    currency VARCHAR(10),
    stock_quantity INTEGER,
    category_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    version BIGINT DEFAULT 0
);"
```

---

### **6. Ports Already in Use**
**Fix:**
```bash
# Find what's using a port
lsof -i :8001

# Kill specific port
lsof -ti:8001 | xargs kill -15

# OR use shutdown script
./scripts/shutdown.sh
```

---

### **General Health Check**

```bash
# Docker containers
docker ps
docker-compose ps

# Service logs
docker logs askcart-postgres-1 --tail 50
docker logs askcart-kafka-1 --tail 50

# Service health
curl http://localhost:8000/actuator/health
curl http://localhost:8001/actuator/health

# Check service logs (if using startup script)
tail -f logs/product-service.log
```

---

## 📖 Additional Documentation

- **[TESTING.md](./TESTING.md)** - API testing guide with examples
- **[Postman Collection](./AskCart%20API.postman_collection.json)** - Ready-to-use API tests

---

## 🤝 Contributing

1. Follow the startup/shutdown scripts for consistent environments
2. Add tests for new features
3. Update Postman collection with new endpoints
4. Document breaking changes in README

---

## 📝 License

This project is part of the AskCart e-commerce platform.

---

## 🎯 Next Steps

- [ ] Add OAuth2 login (Google, GitHub)
- [ ] Implement rate limiting
- [ ] Add Prometheus metrics
- [ ] Create Kubernetes manifests
- [ ] Add integration tests
- [ ] Set up CI/CD pipeline

---
