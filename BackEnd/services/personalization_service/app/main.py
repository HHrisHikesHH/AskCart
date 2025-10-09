from fastapi import FastAPI

app = FastAPI(title="Personalization Service")

@app.get("/health")
async def health():
	return {"status": "ok"}
