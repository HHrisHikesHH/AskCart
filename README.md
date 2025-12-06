# 🛒 AskCart - AI-Powered E-Commerce Platform

AskCart is a microservices-based e-commerce platform that integrates **Conversational AI (RAG)** for a smart shopping experience. It features a distributed architecture using **Spring Boot**, **Kafka**, **PostgreSQL**, **Redis**, and **Vector DB (Milvus)**.

## 🏗️ Architecture Overview

| Service | Port | Description | DB |
| :--- | :--- | :--- | :--- |
| **API Gateway** | `8000` | Unified entry point for all client requests | - |
| **Product Service** | `8001` | Manages product catalog and emits `product.events` | PostgreSQL |
| **Cart Service** | `8002` | Manages user carts and session state | Redis |
| **Order Service** | `8003` | Handles order placement and lifecycle | PostgreSQL |
| **AI Service** | `8004` | RAG-based AI assistant for product queries (vector ingestion) | Milvus |

## 🚀 Quick Start Guide

### Prerequisites
- Java 21+
- Maven 3.8+
- Docker & Docker Compose

### 1. Start Infrastructure
Start the required databases, message brokers, and infrastructure containers (Postgres, Redis, Kafka, Zookeeper, MinIO, Milvus).

```bash
docker compose --profile dev up -d
```
> **Note:** Kafka is accessible locally on port `29092` and internally on `9092`.

### 2. Build the Project
Build all microservices and generate JAR files.

```bash
mvn clean install -DskipTests
```

### 3. Run Microservices
Run each service in a **separate terminal window** to monitor their logs independently.

#### Terminal 1: Product Service
start this first to initialize Kafka topics.
```bash
java -jar BackEnd/product_service/target/product-service-0.0.1-SNAPSHOT.jar
```

#### Terminal 2: AI Service
Starts the AI consumer for product encoding.
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

#### Terminal 5: API Gateway
```bash
java -jar BackEnd/api_gateway/target/api-gateway-0.0.1-SNAPSHOT.jar
```

---

## 🧪 Testing the Application

For detailed instructions on testing API endpoints and verification steps, please refer to [TESTING.md](./TESTING.md).

## 🧰 Tech Stack
- **Backend:** Spring Boot 3.2, Spring Cloud Gateway
- **Data:** PostgreSQL, Redis (Reactive), Milvus (Vector DB)
- **Messaging:** Apache Kafka (Event-driven)
- **AI/RAG:** LangChain4j / Spring AI (Planned)

## 🐛 Troubleshooting

### **1. "FATAL: role 'user' does not exist"**
**Cause:** Local PostgreSQL is running on port 5432, blocking Docker Postgres.

**Fix:**
```bash
# Check what's using port 5432
lsof -i :5432

# Stop local Postgres (Mac)
brew services stop postgresql@14

# Restart Docker containers with fresh volumes
docker compose down -v && docker compose --profile dev up -d
```

---

### **2. API Gateway Returns 404 for All Endpoints**
**Cause:** Gateway forwards full paths (e.g., `/api/products`) but services expect stripped paths (e.g., `/products`).

**Fix:** Ensure `StripPrefix=1` filter is configured for all routes in `BackEnd/api_gateway/src/main/resources/application.yml`:
```yaml
routes:
  - id: product-service
    uri: http://localhost:8001
    predicates:
      - Path=/api/products/**
    filters:
      - StripPrefix=1  # This removes '/api' from the path
```

---

### **3. Kafka Connection Refused / Timed Out**
**Cause:** Services configured to use `localhost:9092`, but Kafka is accessible on `localhost:29092` for host connections.

**Fix:** Update `application.yml` in each service:
```yaml
spring:
  kafka:
    bootstrap-servers: localhost:29092  # Not 9092!
```

---

### **4. "relation 'products' does not exist"**
**Cause:** R2DBC (reactive database driver) doesn't auto-create tables like JPA/Hibernate.

**Fix:** Manually create the products table:
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

### **5. R2DBC "Connection Reset" Errors**
**Cause:** R2DBC can have instability after Docker has been running for extended periods.

**Fix:**
1. Completely quit Docker Desktop
2. Restart Docker Desktop
3. Restart all containers:
   ```bash
   docker compose down -v
   docker compose --profile dev up -d
   ```
4. Recreate database tables (see issue #4)
5. Restart all Java services

---

### **6. Spring Boot Version Incompatibility**
**Cause:** Spring Boot 3.5.6+ is incompatible with Spring Cloud Gateway dependencies.

**Fix:** Use Spring Boot 3.2.11 in `pom.xml`:
```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.2.11</version>
</parent>
```

---

### **General Docker Health Check**
If services are behaving unexpectedly:
```bash
# Check all container statuses
docker ps

# Check specific container logs
docker logs askcart-postgres-1 --tail 50
docker logs askcart-kafka-1 --tail 50

# Restart everything cleanly
docker compose down -v
docker compose --profile dev up -d
```
