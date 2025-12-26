import { useState, useRef, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { Send } from 'lucide-react';

export const BlackHoleNewsletter = () => {
  const [email, setEmail] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 100 };
  const pullX = useSpring(mouseX, springConfig);
  const pullY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Calculate distance from center
      const dist = Math.sqrt(x * x + y * y);
      const maxDist = 300;
      
      if (dist < maxDist) {
        // Gravitational pull effect: move toward the mouse
        mouseX.set(x * 0.2);
        mouseY.set(y * 0.2);
      } else {
        mouseX.set(0);
        mouseY.set(0);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribed:', email);
    setEmail('');
  };

  return (
    <section id="newsletter" className="py-24 relative overflow-hidden flex items-center justify-center min-h-[600px]">
      <div ref={containerRef} className="relative z-10 w-full max-w-2xl px-4">
        <motion.div
          style={{ x: pullX, y: pullY }}
          className="relative"
        >
          {/* Black Hole Visual */}
          <div className="absolute inset-0 -z-10 flex items-center justify-center">
            <div className="w-[300px] h-[300px] rounded-full bg-black shadow-[0_0_60px_20px_rgba(100,100,255,0.3)] animate-pulse" />
            <div className="absolute w-[350px] h-[350px] rounded-full border border-white/10 animate-[spin_20s_linear_infinite]" />
            <div className="absolute w-[400px] h-[400px] rounded-full border border-white/5 animate-[spin_30s_linear_infinite_reverse]" />
            
            {/* Event Horizon Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-transparent rounded-full blur-3xl animate-pulse" />
          </div>

          <div className="text-center space-y-8 relative py-20">
            <div className="space-y-4">
              <h2 className="font-display text-4xl md:text-5xl font-black tracking-tighter text-white">
                ENTER THE <span className="text-gradient-primary">EVENT HORIZON</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-md mx-auto">
                Subscribe to our newsletter and get pulled into the latest tech updates.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="relative max-w-md mx-auto group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@galaxy.com"
                className="w-full bg-black/40 border border-white/20 rounded-full px-6 py-4 outline-none focus:border-electric-blue/50 transition-all text-white placeholder:text-white/30 backdrop-blur-sm"
                required
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bottom-2 px-6 rounded-full bg-gradient-to-r from-electric-blue to-purple-600 text-white font-bold flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
              >
                <span className="hidden sm:inline">Join</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Decorative background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: 0 
            }}
            animate={{ 
              x: [null, window.innerWidth / 2],
              y: [null, window.innerHeight / 2],
              opacity: [0, 1, 0],
              scale: [1, 0]
            }}
            transition={{ 
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
            className="absolute w-1 h-1 bg-blue-400 rounded-full blur-[1px]"
          />
        ))}
      </div>
    </section>
  );
};
