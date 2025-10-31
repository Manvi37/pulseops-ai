const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-url.vercel.app'  // You'll deploy backend separately if needed
  : 'http://localhost:8000';

export interface Client {
  id: number;
  name: string;
  healthScore: number;
  revenue: number;
  tickets: number;
  devices: number;
  risk: string;
  lastActivity: string;
  contact?: string;
  email?: string;
  services?: string[];
}

export interface ChatResponse {
  response: string;
  data: any;
  action_items: string[];
}

// For demo purposes, let's create a fallback to mock data if API fails
const fallbackClients: Client[] = [
  {
    id: 1, name: "TechCorp Solutions", healthScore: 35, revenue: 8000,
    tickets: 22, devices: 18, risk: "high", lastActivity: "1 hour ago"
  },
  {
    id: 2, name: "Global Enterprises", healthScore: 92, revenue: 22000,
    tickets: 2, devices: 67, risk: "low", lastActivity: "3 days ago"
  },
  {
    id: 3, name: "Startup Labs", healthScore: 45, revenue: 6000,
    tickets: 15, devices: 23, risk: "high", lastActivity: "5 minutes ago"
  }
];

export async function getClients(): Promise<Client[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/clients`);
    if (!response.ok) throw new Error('API failed');
    return response.json();
  } catch (error) {
    console.log('Using demo data - backend not available');
    return fallbackClients;
  }
}

export async function getHealthAnalytics() {
  try {
    const response = await fetch(`${API_BASE_URL}/analytics/health`);
    if (!response.ok) throw new Error('API failed');
    return response.json();
  } catch (error) {
    return {
      total_clients: 3,
      average_health_score: 57,
      risk_distribution: { high: 2, medium: 0, low: 1 },
      top_concerns: fallbackClients.filter(c => c.risk === 'high')
    };
  }
}

export async function getCostAnalytics() {
  try {
    const response = await fetch(`${API_BASE_URL}/analytics/costs`);
    if (!response.ok) throw new Error('API failed');
    return response.json();
  } catch (error) {
    return {
      total_potential_savings: 3200,
      optimization_opportunities: [
        {
          type: "license_optimization",
          description: "Deactivate 37 unused Microsoft 365 licenses",
          savings: 1850,
          action: "license_cleanup"
        }
      ]
    };
  }
}

export async function sendChatMessage(message: string): Promise<ChatResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    if (!response.ok) throw new Error('API failed');
    return response.json();
  } catch (error) {
    // Fallback AI responses
    if (message.toLowerCase().includes('risk')) {
      return {
        response: "I found 2 high-risk clients: TechCorp Solutions (35% health) and Startup Labs (45% health). Recommend immediate proactive outreach.",
        data: { high_risk_count: 2 },
        action_items: ["Schedule client meetings", "Review service delivery"]
      };
    }
    return {
      response: "I can analyze client risks, revenue opportunities, and cost optimization. Try asking about client health or cost savings.",
      data: {},
      action_items: []
    };
  }
}