# 🛒 AI-Powered E-Commerce Platform (FastAPI + React + Kafka)

## 📖 Overview

This project is a **modular, microservices-based e-commerce platform** built with **FastAPI**, **Kafka**, and **React**.
It blends **traditional shopping** (browsing, cart, checkout) with **conversational AI** for a modern, interactive experience.

The architecture follows a **clean separation of concerns**:

* **Frontend Layer:** React (web) & React Native (mobile)
* **Backend (BFF + Microservices):** FastAPI microservices
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
---

## ⚙️ Features

* 🧩 **Modular microservices**: each handles a specific domain (Product, Cart, Order, etc.)
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

**Backend (FastAPI):**

* FastAPI (async Python framework)
* SQLAlchemy + asyncpg (Postgres ORM)
* Redis (cache/sessions)
* aiokafka (Kafka integration)
* Pydantic (validation & serialization)

**Infra & DevOps:**

* Docker & Docker Compose
* Kafka + Zookeeper (event streaming)
* PostgreSQL & Redis
* Prometheus, Grafana, ELK stack
* GitHub Actions / ArgoCD for CI/CD

---

## 🧱 Folder Structure

```
ecommerce/
├── infra/
│   └── docker-compose.yml     # Kafka, Redis, Postgres setup
├── services/
│   ├── product/               # Product catalog microservice
│   ├── cart/                  # Cart & session microservice
│   ├── order/                 # Order service (Saga orchestrator)
│   ├── payments/              # Payment processing
│   ├── notification/          # Email/SMS/Push
│   └── personalization/       # AI-driven recommendations
└── frontend/
    ├── web/                   # React web app
    └── mobile/                # React Native app
```

---

## 🏃‍♂️ Quick Start

### 1. Clone and start infrastructure

```bash
git clone https://github.com/<your-org>/ecommerce-fastapi.git
cd ecommerce/infra
docker-compose up -d
```

This will start:

* Postgres on `localhost:5432`
* Redis on `localhost:6379`
* Kafka on `localhost:9092`
* Zookeeper on `localhost:2181`

### 2. Run the Product Service

```bash
cd ../services/product
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### 3. Open API Docs

Visit `http://localhost:8000/docs` to explore REST endpoints.

---

## 📦 Environment Variables

| Variable          | Description                | Default                                                           |
| ----------------- | -------------------------- | ----------------------------------------------------------------- |
| `DATABASE_URL`    | Postgres connection string | `postgresql+asyncpg://postgres:postgres@localhost:5432/ecommerce` |
| `KAFKA_BOOTSTRAP` | Kafka broker address       | `localhost:9092`                                                  |
| `REDIS_URL`       | Redis connection URL       | `redis://localhost:6379`                                          |
| `JWT_SECRET`      | Secret for JWT auth        | `changeme`                                                        |

Create a `.env` file in each service directory for local configuration.

---

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
pytest -v --asyncio-mode=auto
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
2. Run tests and lint (`black`, `ruff`, `pytest`)
3. Open a PR with clear commit messages

---

## 📜 License

MIT License — feel free to use and modify for your own learning or projects.

---

## 💡 Future Enhancements

* Add API Gateway (Kong / Traefik) with centralized JWT validation
* Improve AI Orchestrator (multi-turn chat + semantic search)
* Integrate vector embeddings for user behavior
* Add OpenTelemetry tracing in Kafka event headers
* CI/CD auto-scaling with Argo Rollouts
