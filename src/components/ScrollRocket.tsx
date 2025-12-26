import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Rocket } from 'lucide-react';

export const ScrollRocket: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 h-64 w-1 hidden lg:flex flex-col items-center z-[90]">
      {/* Track */}
      <div className="absolute inset-0 bg-white/10 rounded-full blur-[1px]" />
      
      {/* Progress Line */}
      <motion.div 
        className="absolute top-0 left-0 right-0 bg-electric-blue rounded-full origin-top"
        style={{ scaleY }}
      />
      
      {/* Rocket Icon */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2"
        style={{ top: `${scaleY.get() * 100}%` }}
        animate={{
          y: [0, -5, 0],
          x: ["-50%", "-50%", "-50%"]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="relative">
          <Rocket className="w-6 h-6 text-electric-blue rotate-180" />
          {/* Engine Flame */}
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ duration: 0.2, repeat: Infinity }}
            className="absolute -top-4 left-1/2 -translate-x-1/2 w-2 h-4 bg-cosmic-orange blur-[4px] rounded-full"
          />
        </div>
      </motion.div>
      
      {/* Tooltip labels */}
      <div className="absolute -left-12 top-0 text-[10px] text-white/40 uppercase tracking-tighter vertical-text rotate-180">Launch</div>
      <div className="absolute -left-12 bottom-0 text-[10px] text-white/40 uppercase tracking-tighter vertical-text rotate-180">Landing</div>
    </div>
  );
};
