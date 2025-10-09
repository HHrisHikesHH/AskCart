from fastapi import FastAPI

app = FastAPI(title="Inventory Service")

@app.get("/health")
async def health():
	return {"status": "ok"}
