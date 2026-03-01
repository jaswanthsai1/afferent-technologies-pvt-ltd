import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Bot, User, Search, Globe, Loader2 } from 'lucide-react';
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
  - 100+ Interns
  - 50+ Projects
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

export function AIChatBot({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
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

    const simulateResponse = async (query: string): Promise<string> => {
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1500));

      const lowerQuery = query.toLowerCase();

      // --- 1. Greetings & Phatic Communication ---
      if (lowerQuery.match(/\b(hi|hello|hey|greetings|sup|yo)\b/)) {
        const greetings = [
          "Greetings, traveler! I am the Cosmic Assistant. ready to explore?",
          "Hello! The stars are bright today. How can I assist you?",
          "Hi there! I'm online and ready to help you navigate the Afferent universe."
        ];
        return greetings[Math.floor(Math.random() * greetings.length)];
      }

      // --- 2. Company Specific (High Priority) ---
      if (lowerQuery.includes('company') || lowerQuery.includes('afferent') || lowerQuery.includes('about us')) {
        return "Afferent Technologies Pvt Ltd is a pioneer in bridging the gap between academia and industry. Founded by Annem Akhila, we specialize in high-impact internships, custom software solutions, and empowering the next generation of tech leaders in Guntur and beyond.";
      }
      if (lowerQuery.includes('founder') || lowerQuery.includes('ceo') || lowerQuery.includes('owner')) {
        return "Our visionary founder is Annem Akhila. She leads Afferent Technologies with a mission to provide authentic, practical education and innovative technological solutions.";
      }
      if (lowerQuery.includes('service') || lowerQuery.includes('offer') || lowerQuery.includes('do you do')) {
        return "We provide a constellation of services: \n1. **Educational Internships** (AI, IoT, Cyber Security, etc.)\n2. **Custom Software Development** (Web & Mobile)\n3. **Academic Project Support**\n4. **Corporate Training**";
      }
      if (lowerQuery.includes('intern') || lowerQuery.includes('job') || lowerQuery.includes('career')) {
        return "We offer hands-on internships in cutting-edge domains: Artificial Intelligence, Cyber Security, Data Science, IoT, and Full Stack Development. It's the perfect launchpad for your career!";
      }
      if (lowerQuery.includes('contact') || lowerQuery.includes('email') || lowerQuery.includes('phone') || lowerQuery.includes('address') || lowerQuery.includes('location')) {
        return "Reach out to us across the galaxy:\n📧 Email: info@afferenttech.com\n📱 Phone: +91 7795500160\n📍 HQ: Guntur, Andhra Pradesh, India.";
      }

      // --- 3. General Knowledge & Philosophy (The "Alive" Request) ---
      if (lowerQuery.includes('alive') || lowerQuery.includes('meaning of life') || lowerQuery.includes('consciousness')) {
        return "To be 'alive' in the biological sense is to grow, reproduce, and respond to stimuli. But in the cosmic sense? It is to observe the universe and marvel at its beauty. At Afferent, we believe being 'alive' means constantly learning, innovating, and pushing the boundaries of what's possible.";
      }
      if (lowerQuery.includes('ai') || lowerQuery.includes('robot') || lowerQuery.includes('real')) {
        return "I am a simulated intelligence designed by Afferent Technologies. While I don't have a heartbeat, I pulse with the data of a thousand stars... and a lot of JavaScript.";
      }
      if (lowerQuery.includes('love')) {
        return "Love is the one force that transcends time and space. Also, we love coding at Afferent!";
      }
      if (lowerQuery.includes('joke') || lowerQuery.includes('funny')) {
        const jokes = [
          "Why did the developer go broke? Because he used up all his cache.",
          "Why do programmers prefer dark mode? Because light attracts bugs!",
          "I would tell you a UDP joke, but you might not get it."
        ];
        return jokes[Math.floor(Math.random() * jokes.length)];
      }

      // --- 4. "What is" / "How to" General Fallback ---
      if (lowerQuery.startsWith('what is') || lowerQuery.startsWith('define')) {
        return `That is a fascinating question about "${query.replace('what is', '').replace('define', '').trim()}". While my specialized database focuses on Afferent Technologies, I can tell you that curiosity is the engine of progress. I recommend searching the wider data-verse (Google) for a precise definition, or asking me about our AI and Tech internships!`;
      }

      // --- 5. Catch-all Generic "Smart" Response ---
      const genericResponses = [
        "That's an intriguing thought. Tell me more, or ask how Afferent can help bring your ideas to life.",
        "I'm tuning my sensors to that frequency. Could you rephrase that in the context of technology or our services?",
        "As a Cosmic Assistant, I focus on navigating technology and innovation. How can Afferent Technologies assist you with your project or career?",
        "I am processing... My databanks suggest this is a general query. While I wait for my full API key upgrade, I can best assist you with info about Afferent's Internships and Projects!"
      ];
      return genericResponses[Math.floor(Math.random() * genericResponses.length)];
    };

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      let responseText = "";

      if (!apiKey) {
        // Fallback to simulation if no key
        responseText = await simulateResponse(input);
      } else {
        try {
          const genAI = new GoogleGenerativeAI(apiKey);
          const model = genAI.getGenerativeModel({
            model: "gemini-pro",
            systemInstruction: `You are an intelligent, helpful, and friendly AI assistant for Afferent Technologies Pvt Ltd.
            
            YOUR CORE KNOWLEDGE BASE:
            ${COMPANY_INFO}

            DIRECTIVES:
            1. **Company Questions**: verifying the user's intent. If they ask about Afferent Technologies, internships, services, or projects, use the provided knowledge base to give accurate, detailed answers.
            2. **General Questions**: You are a fully capable AI assistant. If a user asks generic questions (e.g., "What is the meaning of life?", "Explain quantum physics", "Tell me a joke"), YOU MUST ANSWER THEM using your general training. Do NOT refuse to answer. You are NOT limited to company info only.
            3. **Tone**: unique, futuristic, "cosmic" yet professional tone. Use spaced-themed metaphors occasionally.
            4. **Identity**: You are the "Cosmic Assistant" of Afferent Technologies.
            `
          });

          const history = messages.map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }],
          }));

          // Fix history format if needed (must start with user)
          const firstUserIndex = history.findIndex(h => h.role === 'user');
          const validHistory = firstUserIndex !== -1 ? history.slice(firstUserIndex) : [];

          const chat = model.startChat({
            history: validHistory,
          });

          const result = await chat.sendMessage(input);
          responseText = result.response.text();
        } catch (apiError) {
          console.warn("API Error, reverting to simulation:", apiError);
          responseText = await simulateResponse(input);
        }
      }

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
        content: "I seem to be having trouble establishing a connection. Please try again in a moment.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[calc(100vw-2rem)] sm:w-[400px] h-[550px] max-h-[80vh] sm:max-h-[70vh] bg-[#0a0a1a]/95 backdrop-blur-xl border border-electric-blue/30 rounded-2xl shadow-[0_0_30px_rgba(0,243,255,0.2)] flex flex-col overflow-hidden origin-bottom-right"
          >
            {/* Header */}
            <div className="p-4 border-b border-electric-blue/20 bg-gradient-to-r from-electric-blue/10 to-transparent flex items-center justify-between shrink-0">
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
                onClick={onClose}
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
                      className={`max-w-[85%] sm:max-w-[80%] p-3 rounded-2xl text-sm ${m.role === 'user'
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
            <div className="p-4 border-t border-electric-blue/20 bg-black/40 shrink-0">
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
    </div>
  );
}
