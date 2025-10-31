import aiohttp
import os
from typing import List, Dict, Any
import random
from datetime import datetime, timedelta

class SuperOpsClient:
    def __init__(self):
        self.base_url = "https://api.superops.ai/v1"
        self.api_key = os.getenv("SUPEROPS_API_KEY")
        self.session = None
    
    async def connect(self):
        """Connect to SuperOps API"""
        if not self.api_key:
            print("⚠️  No SuperOps API key found - using mock data")
            return {"status": "mock_mode"}
        
        self.session = aiohttp.ClientSession(
            headers={"Authorization": f"Bearer {self.api_key}"}
        )
        return {"status": "connected", "service": "SuperOps"}
    
    async def get_clients(self) -> List[Dict[str, Any]]:
        """Get real clients from SuperOps API"""
        if not self.session:
            # Fallback to mock data if no API key
            return await self._get_mock_clients()
        
        try:
            async with self.session.get(f"{self.base_url}/clients") as response:
                if response.status == 200:
                    data = await response.json()
                    print(f"✅ Fetched {len(data)} clients from SuperOps API")
                    return data
                else:
                    print(f"❌ SuperOps API error: {response.status}")
                    return await self._get_mock_clients()
        except Exception as e:
            print(f"❌ SuperOps API connection failed: {e}")
            return await self._get_mock_clients()
    
    async def _get_mock_clients(self) -> List[Dict[str, Any]]:
        """Fallback mock data"""
        print("🔄 Using mock SuperOps data")
        # This is your existing mock data structure
        client_names = [
            "Acme Corporation", "Beta Solutions", "Gamma Tech", "Delta Systems", 
            "Epsilon Labs", "Zeta Innovations", "Eta Networks", "Theta Systems"
        ]
        
        clients = []
        for i, name in enumerate(client_names, 1):
            tickets = random.randint(1, 25)
            devices = random.randint(15, 80)
            
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