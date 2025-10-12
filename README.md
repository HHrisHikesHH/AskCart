# 🛒 AI-Powered E-Commerce Platform (Spring Boot + React + Kafka)
## 📖 Overview

This project is a **modular, microservices-based e-commerce platform** built with **SpringBoot**, **Kafka**, and **React**.
It blends **traditional shopping** (browsing, cart, checkout) with **conversational AI** for a modern, interactive experience.

The architecture follows a **clean separation of concerns**:

* **Frontend Layer:** React (web) & React Native (mobile)
* **Backend (BFF + Microservices):** Spring Boot microservices (API Gateway, Product Service)
* **Event Streaming:** Kafka for async event flow & saga orchestration
* **RAG Layer:** Vector DB for semantic product and FAQ search
* **Monitoring:** Prometheus, Grafana, and ELK stack for observability

---

## 🏗️ System Architecture
<p align="center">
  <img src="./docs/architecture.png" width="700" alt="System Architecture"/>
  <br/>
  <em>Figure: High-level system architecture</em>
</p>
<hr />

## ⚙️ Features

* 🧩 Modular microservices: API Gateway, Product Service, with plans for Cart, Order, etc.
* ⚡ **Asynchronous event flow** via Kafka (event-driven architecture)
* 🔒 **JWT-based authentication**
* 🧠 **AI product assistant** using RAG and LLM orchestrator
* 💳 **Payment gateway integration** (UPI, COD, Stripe/Razorpay)
* 🧾 **Saga pattern for order flow** — ensures consistency across services
* 🔍 **Full-text & vector search** using Elasticsearch and Milvus/Pinecone
* 🧠 **Personalization engine** driven by real-time user events
* 📊 **Monitoring stack** with Prometheus, Grafana & OpenTelemetry
* 🚀 **CI/CD ready** (GitHub Actions + Docker + ArgoCD)

---

## 🧰 Tech Stack

**Frontend:**

* React, TailwindCSS, React Query, Zustand
* React Native for mobile

**Backend (Spring Boot):**

* Spring Boot (Java framework)
* Spring Data JPA (Postgres ORM)
* Redis (cache/sessions)
* Spring Kafka (Kafka integration)
* Spring Security (JWT authentication)

**Infra & DevOps:**

* Docker & Docker Compose
* Kafka + Zookeeper (event streaming)
* PostgreSQL & Redis
* Prometheus, Grafana, ELK stack
* GitHub Actions / ArgoCD for CI/CD

---

## 🧱 Folder Structure

```
AskCart/
├── BackEnd/
│   ├── api_gateway/           # API Gateway microservice
│   └── product_service/      # Product catalog microservice
├── FrontEnd/
│   ├── web/                  # React web app
│   └── mobile/               # React Native app
├── docs/                     # Architecture diagrams
└── docker-compose.yml        # Kafka, Redis, Postgres setup

```

---

## 🏃‍♂️ Quick Start

### 1. Clone and start infrastructure

```bash
git clone https://github.com/HHrisHikesHH/AskCart.git
cd AskCart
docker-compose up -d --profile dev
```

This will start:

* Postgres on `localhost:5432`
* Redis on `localhost:6379`
* Kafka on `localhost:9092`
* Zookeeper on `localhost:2181`

### 2. Run Services Locally (Development)

Open api_gateway and product_service in IntelliJ.
Set environment variable: SPRING_PROFILES_ACTIVE=docker.
Run each service for hot reloading.

### 3. Run Full Application (Production)
mvn clean package
docker-compose up --build --profile prod

```bash
API Gateway: http://localhost:8000
```

```bash
Product Service: http://localhost:8001
```
# 📦 Environment Variables



Variable
Description
Default



SPRING_DATASOURCE_URL
Postgres connection string
jdbc:postgresql://postgres:5432/db


SPRING_KAFKA_BOOTSTRAP
Kafka broker address
kafka:9092


SPRING_REDIS_HOST
Redis host
redis


JWT_SECRET
Secret for JWT auth
changeme


Configure in application.yml for each service or via environment variables.

## 🧮 Event Flow Example (Order Saga)

1. **Order Created** → `order_created` event emitted
2. **Inventory Service** reserves stock → `inventory_reserved`
3. **Payments Service** charges payment → `payment_succeeded`
4. **Order Service** updates status → `order_confirmed`
5. **Notification Service** sends confirmation → `user_notifications`

If any step fails, compensating events (`inventory_released`, `order_cancelled`) restore consistency.

---

## 🧩 Microservices Overview

| Service             | Responsibility         | DB             | Key Topics                                            |
| ------------------- | ---------------------- | -------------- | ----------------------------------------------------- |
| **Product**         | Product catalog CRUD   | Postgres       | `product_created`, `product_updated`                  |
| **Cart**            | Cart & session state   | Redis/Postgres | `cart_updated`                                        |
| **Order**           | Order lifecycle + saga | Postgres       | `order_created`, `order_confirmed`, `order_cancelled` |
| **Inventory**       | Stock reservation      | Postgres       | `inventory_reserved`, `inventory_released`            |
| **Payments**        | Payment handling       | None           | `payment_succeeded`, `payment_failed`                 |
| **Notification**    | Email/SMS push         | None           | `user_notifications`                                  |
| **Personalization** | Recommendations        | Redis          | Consumes all user events                              |

---

## 🧠 AI & RAG Layer

The **LLM Orchestrator** connects product search, FAQs, and reviews to an external LLM API (e.g., OpenAI, Anthropic).

* Uses **vector embeddings** stored in **Milvus/Pinecone**
* Documents stored in **S3 / MinIO**
* Implements a **RAG pipeline** (Retrieve → Augment → Generate)

---

## 🔍 Monitoring & Observability

* **Prometheus** → Metrics collection
* **Grafana** → Dashboards
* **OpenTelemetry** → Distributed tracing
* **ELK / OpenSearch** → Centralized logs

---

## 🧪 Testing
```bash
mvn test
```

Tests include:

* CRUD and API route tests
* Event emission/consumption mocks
* Saga flow simulations
* Integration tests using Docker Compose

---

## 🚀 Deployment

* Each microservice is containerized via Dockerfile
* GitHub Actions runs tests & builds images
* ArgoCD or Helm manages deployment to Kubernetes

---

## 🤝 Contributing

1. Fork the repo & create a feature branch
2. Run tests and lint (mvn checkstyle:check, mvn test)
3. Open a PR with clear commit messages

---

## 📜 License

MIT License — feel free to use and modify for your own learning or projects.

---

## 💡 Future Enhancements

* Add more microservices (Cart, Order, Inventory, etc.)
* Improve AI Orchestrator (multi-turn chat + semantic search)
* Integrate vector embeddings for user behavior
* Add OpenTelemetry tracing in Kafka event headers
* CI/CD auto-scaling with Argo Rollouts
