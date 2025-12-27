import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Radio, Zap, Cpu, Bell } from 'lucide-react';

const STATUS_MESSAGES = [
  "Deep Space Communication: Stable",
  "Oxygen Levels: 100%",
  "Shield Integrity: Optimal",
  "Dark Matter Density: Low",
  "Proximity Alert: All Clear",
  "Engine Status: Cruise Speed",
  "Next Planet: Approaching",
  "Solar Wind: 400km/s",
  "AI Core: Synchronized"
];

export const HolographicStatus: React.FC = () => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setIsVisible(true), 5000);
    
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentMessage((prev) => (prev + 1) % STATUS_MESSAGES.length);
        setIsVisible(true);
      }, 1000);
    }, 12000);

    return () => {
      clearTimeout(showTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-[90] hidden md:block">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.8 }}
            className="relative"
          >
            {/* Holographic Background */}
            <div className="absolute inset-0 bg-electric-blue/10 backdrop-blur-md border border-electric-blue/30 rounded-lg skew-x-[-12deg]" />
            
            {/* Content */}
            <div className="relative px-4 py-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-electric-blue/20 flex items-center justify-center">
                <motion.div
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Radio className="w-4 h-4 text-electric-blue" />
                </motion.div>
              </div>
              
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-electric-blue/60 font-mono">System Status</span>
                <span className="text-sm font-mono text-white/90 whitespace-nowrap">
                  {STATUS_MESSAGES[currentMessage]}
                </span>
              </div>
              
              {/* Scanline Effect */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
                <motion.div
                  animate={{ y: ['0%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-full h-1/2 bg-gradient-to-b from-transparent via-electric-blue/10 to-transparent opacity-30"
                />
              </div>
            </div>
            
            {/* Corner Accents */}
            <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-electric-blue" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-electric-blue" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
