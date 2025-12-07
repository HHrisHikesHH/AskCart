# 🧪 Testing AskCart - User Guide

This guide is designed for anyone (technical or non-technical) to test the AskCart e-commerce platform. It walks you through starting the system, populating it with dummy data, and verifying that everything works as expected.

---

## 🏁 1. Getting Started (Start the App)

Before testing, ensure the application is running. If you haven't started it yet, follow these quick steps:

1.  **Open your Terminal / Command Prompt.**
2.  **Start the Infrastructure (Database & Messaging):**
    ```bash
    docker compose --profile dev up -d
    ```
3.  **Build the Application Code:**
    ```bash
    mvn clean install -DskipTests
    ```
4.  **Run the Services:** 
    Open **5 separate terminal windows** and run one command in each, in this exact order:

    *   **Terminal 1 (Product Service):** 
        `java -jar BackEnd/product_service/target/product-service-0.0.1-SNAPSHOT.jar`
    *   **Terminal 2 (AI Service):** 
        `java -jar BackEnd/ai_service/target/ai-service-0.0.1-SNAPSHOT.jar`
    *   **Terminal 3 (Cart Service):** 
        `java -jar BackEnd/cart_service/target/cart-service-0.0.1-SNAPSHOT.jar`
    *   **Terminal 4 (Order Service):** 
        `java -jar BackEnd/order_service/target/order-service-0.0.1-SNAPSHOT.jar`
    *   **Terminal 5 (API Gateway):** 
        `java -jar BackEnd/api_gateway/target/api-gateway-0.0.1-SNAPSHOT.jar`

    *Wait ~30 seconds for all services to start fully.*

---

## 📦 2. Populate Dummy Data (One-Click Setup)

To test the system, you need products in the catalog. You can use these commands to automatically add sample data.

### **Copy & Paste this into a new Terminal:**

```bash
# Add Product 1: Sony Headphones
curl -X POST http://localhost:8000/api/products \
-H "Content-Type: application/json" \
-d '{
  "name": "Sony WH-1000XM5",
  "sku": "SONY-XM5-BLK",
  "price": 349.99,
  "currency": "USD",
  "description": "Premium noise cancelling headphones",
  "categoryId": "electronics"
}'

# Add Product 2: iPhone 15
curl -X POST http://localhost:8000/api/products \
-H "Content-Type: application/json" \
-d '{
  "name": "iPhone 15 Pro",
  "sku": "APPLE-IP15-TI",
  "price": 999.00,
  "currency": "USD",
  "description": "Titanium design, A17 Pro chip",
  "categoryId": "smartphones"
}'
```

**✅ What to expect:**
- You should see a JSON response for each command containing an `"id"` (e.g., `"id": "a1b2c3d4..."`).
- **Look at Terminal 2 (AI Service):** You should see logs saying: `Received Product Event` or `Ingesting product`. This means the AI system successfully "read" the new products.

---

## 🛒 3. Test the Shopping Flow

Now act as a user (`user123`) shopping on the platform.

### **Step A: Add Item to Cart**
Let's add 1 Sony Headphone to the cart. **Replace `<PRODUCT_ID>`** with the ID you received in the previous step (or just use the command below if you want to verify the cart endpoint is reachable).

*Note: For a real test, you need the actual UUID from Step 2. If you missed it, check Terminal 1 logs.*

```bash
# Example Command (You must manually replace <YOUR_PRODUCT_ID>)
curl -X POST "http://localhost:8000/api/cart/user123/items" \
-H "Content-Type: application/json" \
-d '{
  "productId": "<PASTE_YOUR_PRODUCT_ID_HERE>",
  "quantity": 1
}'
```

### **Step B: View Cart**
Check if the item is saved.

```bash
curl -X GET "http://localhost:8000/api/cart/user123"
```

**✅ What to expect:**
- A response showing your user ID and the list of items you just added.

### **Step C: Place an Order**
Buy the items in your cart.

```bash
curl -X POST http://localhost:8000/api/orders \
-H "Content-Type: application/json" \
-d '{
  "userId": "user123",
  "totalAmount": 349.99,
  "items": [
    {
       "productId": "<PASTE_YOUR_PRODUCT_ID_HERE>",
       "quantity": 1,
       "price": 349.99
    }
  ]
} '
```

**✅ What to expect:**
- A response confirming the order was created: `"status": "CREATED"`.
- **Look at Terminal 4 (Order Service):** You should see logs indicating a new order was processed.

---

## 🔍 4. Troubleshooting / Verification

If you are unsure if data was saved, you can inspect the database directly.

**Check Orders in Database:**
Run this command to see all orders stored in the system:
```bash
docker exec -it askcart-postgres-1 psql -U user -d db -c "SELECT * FROM orders;"
```

**Check Products:**
```bash
docker exec -it askcart-postgres-1 psql -U user -d db -c "SELECT * FROM products;"
```

---

## 🧹 Cleanup

To stop everything and clean up (removes all data):
```bash
docker compose down -v
```
