from fastapi import FastAPI

app = FastAPI(title="Product Service")

@app.get("/health")
async def health():
	return {"status": "ok"}
