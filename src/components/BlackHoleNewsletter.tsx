import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

export const BlackHoleNewsletter = () => {
  const [email, setEmail] = useState('');
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    const updateSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribed:', email);
    setEmail('');
  };

  return (
    <section id="newsletter" className="py-16 sm:py-20 md:py-24 relative overflow-hidden flex items-center justify-center min-h-[400px] sm:min-h-[500px] md:min-h-[600px]">
      <div className="relative z-10 w-full max-w-2xl px-4">
        <div className="relative">
          {/* Black Hole Visual */}
          <div className="absolute inset-0 -z-10 flex items-center justify-center">
            <div className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[300px] md:h-[300px] rounded-full bg-black shadow-[0_0_40px_15px_rgba(100,100,255,0.3)] sm:shadow-[0_0_60px_20px_rgba(100,100,255,0.3)] animate-pulse" />
            <div className="absolute w-[180px] h-[180px] sm:w-[250px] sm:h-[250px] md:w-[350px] md:h-[350px] rounded-full border border-white/10 animate-[spin_20s_linear_infinite]" />
            <div className="absolute w-[210px] h-[210px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] rounded-full border border-white/5 animate-[spin_30s_linear_infinite_reverse]" />
            
            {/* Event Horizon Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-transparent rounded-full blur-3xl animate-pulse" />
          </div>

          <div className="text-center space-y-4 sm:space-y-6 md:space-y-8 relative py-8 sm:py-12 md:py-20">
            <div className="space-y-3 sm:space-y-4">
              <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-black tracking-tighter text-white">
                ENTER THE <span className="text-gradient-primary">EVENT HORIZON</span>
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-md mx-auto px-4">
                Subscribe to our newsletter and get pulled into the latest tech updates.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="relative max-w-md mx-auto group px-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@galaxy.com"
                className="w-full bg-black/40 border border-white/20 rounded-full px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-4 outline-none focus:border-electric-blue/50 transition-all text-white placeholder:text-white/30 backdrop-blur-sm text-sm sm:text-base"
                required
              />
              <button
                type="submit"
                className="absolute right-1 sm:right-1.5 md:right-2 top-1 sm:top-1.5 md:top-2 bottom-1 sm:bottom-1.5 md:bottom-2 px-3 sm:px-4 md:px-6 rounded-full bg-gradient-to-r from-electric-blue to-purple-600 text-white font-bold flex items-center gap-2 hover:scale-105 active:scale-95 transition-all text-xs sm:text-sm md:text-base"
              >
                <span className="hidden sm:inline">Join</span>
                <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Decorative background particles - only render after mount */}
      {windowSize.width > 0 && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * windowSize.width, 
                y: Math.random() * windowSize.height,
                opacity: 0 
              }}
              animate={{ 
                x: [null, windowSize.width / 2],
                y: [null, windowSize.height / 2],
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
      )}
    </section>
  );
};
