"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hi! I'm your PulseOps AI assistant. I can help you analyze client data, identify risks, and find optimization opportunities. What would you like to know?",
    role: "assistant",
    timestamp: new Date()
  }
]

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
  if (!input.trim()) return;

  const userMessage: Message = {
    id: Date.now().toString(),
    content: input,
    role: "user",
    timestamp: new Date()
  };

  setMessages(prev => [...prev, userMessage]);
  setInput("");
  setIsLoading(true);

  try {
    // Use real backend API
    const response = await fetch('http://localhost:8000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: input }),
    });
    
    if (!response.ok) throw new Error('API request failed');
    
    const data = await response.json();
    
    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      content: data.response,
      role: "assistant",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, aiResponse]);
  } catch (error) {
    console.error('Chat error:', error);
    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      content: "I'm having trouble connecting to the AI service. Please try again.",
      role: "assistant", 
      timestamp: new Date()
    };
    setMessages(prev => [...prev, aiResponse]);
  } finally {
    setIsLoading(false);
  }
};

  const getAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase()
    
    if (lowerQuery.includes("risk") || lowerQuery.includes("churn")) {
      return "Based on current data, 3 clients are at high risk of churn: Beta Solutions (health: 45%), Epsilon Labs (health: 35%), and TechNova Inc (health: 52%). I recommend proactive outreach and service reviews for these accounts."
    }
    
    if (lowerQuery.includes("revenue") || lowerQuery.includes("growth")) {
      return "Your top revenue opportunities are: 1) Upsell backup services to Beta Solutions (+$2k/mo), 2) Expand security package with Gamma Tech (+$1.5k/mo), 3) Migrate Delta Systems to premium support (+$3k/mo)."
    }
    
    if (lowerQuery.includes("license") || lowerQuery.includes("cost")) {
      return "I've identified $3,200 in potential monthly savings: 1) 37 unused Microsoft 365 licenses ($1,850/mo), 2) 12 dormant AWS instances ($950/mo), 3) 8 redundant SaaS tools ($400/mo). Would you like me to generate optimization tickets?"
    }
    
    if (lowerQuery.includes("health") || lowerQuery.includes("score")) {
      return "The average client health score is 78%. 65% of clients are in good health (score > 70%), 25% need attention (score 50-70%), and 10% are at risk (score < 50%). The healthiest client is Delta Systems at 95%."
    }
    
    return "I can help you analyze client data, identify risks, and find optimization opportunities. Try asking about client health, revenue growth, cost savings, or risk management."
  }

  const quickQuestions = [
    "Which clients are at risk?",
    "Show revenue opportunities",
    "Find cost savings",
    "Client health summary"
  ]

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          AI Assistant
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages */}
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <Avatar className={`w-8 h-8 ${
                message.role === "user" 
                  ? "bg-blue-500" 
                  : "bg-linear-to-r from-purple-500 to-pink-500"
              }`}>
                <span className="text-white text-sm">
                  {message.role === "user" ? "U" : "AI"}
                </span>
              </Avatar>
              
              <div className={`max-w-[80%] rounded-lg p-3 ${
                message.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-900"
              }`}>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.role === "user" ? "text-blue-100" : "text-gray-500"
                }`}>
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3">
              <Avatar className="w-8 h-8 bg-linear-to-r from-purple-500 to-pink-500">
                <span className="text-white text-sm">AI</span>
              </Avatar>
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        <div className="border-t p-4">
          <div className="flex flex-wrap gap-2 mb-4">
            {quickQuestions.map((question) => (
              <Button
                key={question}
                variant="outline"
                size="sm"
                onClick={() => setInput(question)}
                className="text-xs"
              >
                {question}
              </Button>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about clients, revenue, or cost optimization..."
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              disabled={isLoading}
            />
            <Button 
              onClick={handleSend} 
              disabled={isLoading || !input.trim()}
            >
              Send
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}