from fastapi import FastAPI

app = FastAPI(title="LLM Orchestrator Service")

@app.get("/health")
async def health():
	return {"status": "ok"}
