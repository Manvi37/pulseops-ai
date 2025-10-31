from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from agents.pulseops_agent import PulseOpsAgent, AgentResponse
from pydantic import BaseModel
from datetime import datetime
import uvicorn

app = FastAPI(title="PulseOps AI API", version="1.0.0")
agent = PulseOpsAgent()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

@app.get("/")
async def root():
    return {
        "message": "PulseOps AI Agent API", 
        "status": "running",
        "agent": agent.name,
        "timestamp": datetime.now().isoformat()
    }

@app.get("/clients")
async def get_clients():
    return agent.clients

@app.get("/clients/{client_id}")
async def get_client(client_id: int):
    for client in agent.clients:
        if client["id"] == client_id:
            return client
    return {"error": "Client not found"}

@app.get("/analytics/health")
async def get_health_analytics():
    return agent.analyze_client_health()

@app.get("/analytics/costs")
async def get_cost_analytics():
    return agent.get_cost_optimization_insights()

@app.post("/chat")
async def chat(request: ChatRequest):
    response = agent.chat_query(request.message)
    return {
        "response": response.response,
        "data": response.data,
        "action_items": response.action_items
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy", 
        "agent": agent.name,
        "clients_loaded": len(agent.clients),
        "timestamp": datetime.now().isoformat()
    }

# Add this debug line to see if the file is loading
print("✅ main.py is loading...")
print(f"📊 Agent initialized: {agent.name}")
print(f"👥 Clients loaded: {len(agent.clients)}")

if __name__ == "__main__":
    print("🚀 Starting PulseOps AI Agent API Server...")
    print("🌐 API will be available at: http://localhost:8000")
    print("📚 Documentation at: http://localhost:8000/docs")
    print("⏹️  Press Ctrl+C to stop the server")
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")