from fastapi import FastAPI, Depends
from BackEnd.services.shared.auth import verify_token
from BackEnd.services.shared.kafka_utils import get_kafka_producer
import asyncio

app = FastAPI(title="Payments Service")

@app.get("/health")
async def health():
	return {"status": "ok"}

@app.post("/pay")
async def process_payment(token_data: dict = Depends(verify_token)):
	# Simulate payment logic
	producer = await get_kafka_producer()
	await producer.send_and_wait("payment_succeeded", b'{"user_id": "%s"}' % token_data.get("sub", "unknown").encode())
	await producer.stop()
	return {"status": "payment processed", "user": token_data.get("sub", "unknown")}
