# 🧑‍💻 Copilot Instructions for AskCart

## Big Picture Architecture
- **Microservices-based e-commerce platform** using FastAPI (Python) for backend, React for frontend, and Kafka for event streaming.
- **Service boundaries:** Each domain (product, cart, order, inventory, payments, notification, personalization, LLM orchestrator) is a separate FastAPI microservice in `BackEnd/services/`.
- **API Gateway** (`BackEnd/api_gateway/`) routes requests and will eventually centralize JWT validation.
- **Event-driven communication:** Kafka topics connect services for async workflows (e.g., order saga, inventory reservation, payment processing).
- **AI/RAG Layer:** LLM orchestrator service connects to external LLM APIs and vector DBs (Milvus/Pinecone) for semantic search and product Q&A.
- **Monitoring:** Prometheus, Grafana, ELK stack, and OpenTelemetry for metrics, logs, and tracing.

## Developer Workflows
- **Start infrastructure:**
  ```bash
  cd AskCart
  docker-compose up -d
  ```
  (Starts Postgres, Redis, Kafka, Zookeeper)
- **Run a microservice:**
  ```bash
  cd BackEnd/services/<service_name>
  pip install -r requirements.txt
  uvicorn app.main:app --reload --port <port>
  ```
- **Run frontend:**
  ```bash
  cd FrontEnd
  npm install
  npm run dev
  ```
- **Testing:**
  ```bash
  pytest -v --asyncio-mode=auto
  ```
  (Run in each service's `tests/` folder)
- **Linting:**
  ```bash
  black .
  ruff .
  ```
- **Build/Deploy:**
  - Each service has a Dockerfile.
  - CI/CD via GitHub Actions, deploys with ArgoCD/Helm.

## Project-Specific Patterns
- **Async FastAPI:** All backend services use async endpoints and database drivers (asyncpg, aiokafka).
- **Event topics:**
  - Product: `product_created`, `product_updated`
  - Order: `order_created`, `order_confirmed`, `order_cancelled`
  - Inventory: `inventory_reserved`, `inventory_released`
  - Payments: `payment_succeeded`, `payment_failed`
  - Notification: `user_notifications`
- **Saga pattern:** Order flow uses compensating events for rollback (see README for event flow).
- **Shared code:** Common utilities (auth, db, kafka) in `BackEnd/services/shared/`.
- **Environment variables:** Each service uses its own `.env` for DB/Kafka/Redis/JWT config.
- **API docs:** Each service exposes `/docs` via FastAPI Swagger UI.

## Integration Points
- **Kafka:** All services connect to Kafka for event-driven workflows. See `kafka_utils.py` in shared.
- **Vector DB:** LLM orchestrator integrates with Milvus/Pinecone for semantic search.
- **External APIs:** Payment gateways (Stripe/Razorpay), LLM APIs (OpenAI/Anthropic).
- **Monitoring:** Metrics/logs/traces are exposed for Prometheus/Grafana/ELK.

## Key Files & Directories
- `BackEnd/services/<service>/app/main.py` — Service entrypoint
- `BackEnd/services/<service>/app/routers/` — API routes
- `BackEnd/services/shared/` — Shared utilities
- `docker-compose.yml` — Infra setup
- `FrontEnd/src/` — React app source
- `docs/architecture.png` — System diagram
- `README.md` — High-level overview and workflows

---

For unclear workflows or missing conventions, ask the user for clarification or examples from their recent work.
