import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Bot, User, Search, Globe, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Input } from './ui/input';
import { GoogleGenerativeAI } from "@google/generative-ai";

const COMPANY_INFO = `
Company Name: Afferent Technologies Pvt Ltd
Founder: Annem Akhila (Visionary Leader & Technology Innovator)
Mission: To provide authentic technology education and empower individuals with practical skills in emerging technologies.
Core Values: Innovation, Empowerment, Authenticity.

Internship Domains:
1. Artificial Intelligence: Machine learning, neural networks, AI applications.
2. Cyber Security: Ethical hacking, penetration testing, security protocols.
3. Data Science: Data analysis, building models, insights.
4. Internet of Things (IoT): Connecting devices, sensors, smart systems.
5. CSE & Software: Software solutions with modern programming practices.
6. Robotics: Building and programming intelligent robotic systems.

IT Solutions & Projects:
- Final year project support for students (AI, ML, Cybersecurity, etc.)
- Custom Software Development
- System Integration
- Cloud Solutions
- Enterprise Applications

Technologies Used:
- Web: React, Node.js, Python, AWS, MongoDB, PostgreSQL
- Mobile: React Native, Flutter, Swift, Kotlin, Firebase
- Automation: Custom AI Agents, Workflow Automation, Chatbots, Process Optimization

Stats:
- 500+ Interns
- 100+ Projects
- 50+ Clients

Contact Information:
- Email: info@afferenttech.com
- Phone: +91 7795500160
- Location: GUNTUR, ANDHRA PRADESH, INDIA
- Socials: Instagram (@afferenttechnologiespvtltd), LinkedIn (Afferent Technologies Pvt Ltd)
`;

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isSearch?: boolean;
}

export function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your Cosmic Assistant. How can I help you today? You can ask me about Afferent Technologies or anything else in the universe!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      if (!apiKey) {
        throw new Error("API Key not found. Please configure VITE_GEMINI_API_KEY.");
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: `You are an AI assistant for Afferent Technologies Pvt Ltd. 
        Use the following information to answer questions about the company: ${COMPANY_INFO}
        If a user asks something unrelated to the company, use your general knowledge to answer, 
        and if needed, simulate a web search to provide the most accurate information. 
        Always be professional, helpful, and maintain a cosmic/technological theme.`
      });

      const chat = model.startChat({
        history: messages.map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }],
        })),
      });

      const result = await chat.sendMessage(input);
      const responseText = result.response.text();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseText,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: error instanceof Error && error.message.includes("API Key") 
          ? "I'm sorry, I need an API key to function. Please set up the GEMINI_API_KEY in the environment variables." 
          : "I'm having trouble connecting to the cosmos right now. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-[#0a0a1a]/95 backdrop-blur-xl border border-electric-blue/30 rounded-2xl shadow-[0_0_30px_rgba(0,243,255,0.2)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-electric-blue/20 bg-gradient-to-r from-electric-blue/10 to-transparent flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-electric-blue/20 flex items-center justify-center border border-electric-blue/40">
                  <Bot className="w-6 h-6 text-electric-blue" />
                </div>
                <div>
                  <h3 className="text-sm font-display font-bold text-foreground">Cosmic Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Online</span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/10 text-muted-foreground hover:text-white"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Chat Area */}
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                        m.role === 'user'
                          ? 'bg-electric-blue text-white rounded-tr-none shadow-[0_4px_15px_rgba(0,243,255,0.3)]'
                          : 'bg-muted/50 border border-border/30 text-foreground rounded-tl-none'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1 opacity-60">
                        {m.role === 'user' ? (
                          <span className="text-[10px] uppercase font-bold">You</span>
                        ) : (
                          <>
                            <Bot className="w-3 h-3" />
                            <span className="text-[10px] uppercase font-bold">Assistant</span>
                          </>
                        )}
                      </div>
                      <p className="leading-relaxed whitespace-pre-wrap">{m.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted/50 border border-border/30 p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                      <Loader2 className="w-4 h-4 text-electric-blue animate-spin" />
                      <span className="text-xs text-muted-foreground italic">Consulting the stardust...</span>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-4 border-t border-electric-blue/20 bg-black/40">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything..."
                  className="bg-muted/20 border-border/30 focus:border-electric-blue/50 focus:ring-1 focus:ring-electric-blue/50 rounded-xl"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-electric-blue hover:bg-electric-blue-glow text-white rounded-xl px-4"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
              <p className="mt-2 text-[8px] text-center text-muted-foreground uppercase tracking-widest opacity-50">
                Powered by Afferent AI
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-electric-blue flex items-center justify-center text-white shadow-[0_0_20px_rgba(0,243,255,0.4)] group relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageSquare className="w-7 h-7" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Pulsing Ring */}
        {!isOpen && (
          <div className="absolute inset-[-4px] border-2 border-electric-blue/30 rounded-full animate-ping pointer-events-none" />
        )}
      </motion.button>
    </div>
  );
}
