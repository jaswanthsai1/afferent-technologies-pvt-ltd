import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  life: number;
}

export const StardustCursor: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const colors = [
    'hsl(var(--electric-blue))',
    'hsl(var(--cosmic-orange))',
    '#ffffff',
    '#b3d9ff',
    '#ffe6cc'
  ];

  const addParticle = useCallback((x: number, y: number) => {
    const id = Date.now() + Math.random();
    const newParticle: Particle = {
      id,
      x,
      y,
      size: Math.random() * 4 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 1,
    };
    setParticles((prev) => [...prev.slice(-20), newParticle]);
  }, [colors]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      addParticle(e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [addParticle]);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({ ...p, life: p.life - 0.05 }))
          .filter((p) => p.life > 0)
      );
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{ 
              opacity: 0, 
              scale: 0,
              x: p.x + (Math.random() - 0.5) * 20,
              y: p.y + (Math.random() - 0.5) * 20
            }}
            exit={{ opacity: 0 }}
            className="absolute rounded-full blur-[1px]"
            style={{
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              boxShadow: `0 0 10px ${p.color}`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </AnimatePresence>
      
      {/* Subtle core cursor glow */}
      <motion.div
        className="absolute w-8 h-8 rounded-full blur-xl pointer-events-none"
        animate={{
          left: mousePos.x,
          top: mousePos.y,
          transition: { type: 'spring', damping: 20, stiffness: 250, mass: 0.5 }
        }}
        style={{
          backgroundColor: 'hsl(var(--electric-blue) / 0.3)',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  );
};
