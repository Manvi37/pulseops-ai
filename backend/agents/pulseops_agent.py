from typing import List, Dict, Any
from dataclasses import dataclass
import random
from datetime import datetime, timedelta

@dataclass
class AgentResponse:
    response: str
    data: Dict[str, Any]
    action_items: List[str]

class PulseOpsAgent:
    def __init__(self):
        self.name = "PulseOps AI Agent"
        self.description = "Autonomous AI agent for MSP management"
        self.clients = self._generate_mock_clients()
    
    def _generate_mock_clients(self) -> List[Dict[str, Any]]:
        client_names = [
            "Acme Corporation", "Beta Solutions", "Gamma Tech", "Delta Systems", 
            "Epsilon Labs", "Zeta Innovations", "Eta Networks", "Theta Systems"
        ]
        
        clients = []
        for i, name in enumerate(client_names, 1):
            tickets = random.randint(1, 25)
            devices = random.randint(15, 80)
            
            # Calculate health score
            base_score = 100
            if tickets > 15: base_score -= 30
            elif tickets > 8: base_score -= 15
            if devices > 50: base_score -= 10
                
            health_score = max(35, min(98, base_score + random.randint(-10, 10)))
            risk = "high" if health_score < 50 else "medium" if health_score < 70 else "low"
                
            clients.append({
                "id": i, "name": name, "healthScore": health_score,
                "revenue": random.randint(5000, 25000), "tickets": tickets,
                "devices": devices, "risk": risk,
                "lastActivity": f"{random.randint(1, 24)} hours ago",
                "contact": f"contact{i}@{name.lower().replace(' ', '')}.com",
                "services": ["Managed IT", "Cloud Security", "Backup Solutions"][:random.randint(1, 3)]
            })
        
        return clients
    
    def analyze_client_health(self) -> Dict[str, Any]:
        clients = self.clients
        total_clients = len(clients)
        avg_health = sum(c["healthScore"] for c in clients) / total_clients
        
        return {
            "total_clients": total_clients,
            "average_health_score": round(avg_health, 1),
            "risk_distribution": {
                "high": len([c for c in clients if c["risk"] == "high"]),
                "medium": len([c for c in clients if c["risk"] == "medium"]), 
                "low": len([c for c in clients if c["risk"] == "low"])
            },
            "top_concerns": [c for c in clients if c["risk"] == "high"][:3],
            "insights": [
                f"{len([c for c in clients if c['risk'] == 'high'])} clients need immediate attention",
                f"Average health: {round(avg_health, 1)}%",
                "Focus on ticket reduction for at-risk clients"
            ]
        }
    
    def get_cost_optimization_insights(self) -> Dict[str, Any]:
        unused_licenses = random.randint(20, 50)
        monthly_savings = random.randint(1500, 3000)
        
        return {
            "total_potential_savings": monthly_savings,
            "optimization_opportunities": [
                {
                    "type": "license_optimization",
                    "description": f"Deactivate {unused_licenses} unused licenses",
                    "savings": monthly_savings,
                    "action": "license_cleanup"
                }
            ],
            "recommendations": [
                "Implement automated license monitoring",
                "Set up cost anomaly alerts"
            ]
        }
    
    def chat_query(self, message: str) -> AgentResponse:
        message_lower = message.lower()
        
        if any(word in message_lower for word in ["risk", "churn", "problem"]):
            analysis = self.analyze_client_health()
            high_risk = [c for c in self.clients if c["risk"] == "high"]
            
            response = f"Found {len(high_risk)} high-risk clients:\n"
            for client in high_risk[:3]:
                response += f"• {client['name']} (Health: {client['healthScore']}%)\n"
            response += "Recommendation: Proactive outreach needed."
            
            return AgentResponse(
                response=response,
                data=analysis,
                action_items=["Schedule client meetings", "Review service delivery"]
            )
        
        elif any(word in message_lower for word in ["revenue", "growth", "upsell"]):
            total_revenue = sum(c["revenue"] for c in self.clients)
            
            response = f"Monthly revenue: ${total_revenue:,}\n"
            response += f"Average per client: ${total_revenue/len(self.clients):,.0f}\n"
            response += "Upsell opportunities identified in stable clients."
            
            return AgentResponse(
                response=response,
                data={"total_revenue": total_revenue},
                action_items=["Develop upsell proposals", "Schedule business reviews"]
            )
        
        elif any(word in message_lower for word in ["cost", "save", "optimize"]):
            insights = self.get_cost_optimization_insights()
            
            response = f"Potential monthly savings: ${insights['total_potential_savings']:,}\n"
            for opportunity in insights["optimization_opportunities"]:
                response += f"• {opportunity['description']}\n"
            
            return AgentResponse(
                response=response,
                data=insights,
                action_items=["Run license audit", "Review cloud costs"]
            )
        
        else:
            return AgentResponse(
                response="I can analyze client risks, revenue opportunities, and cost optimization. What would you like to know?",
                data={},
                action_items=[]
            )