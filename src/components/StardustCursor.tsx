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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile('ontouchstart' in window || window.innerWidth < 768);
  }, []);

  const addParticle = useCallback((x: number, y: number) => {
    const colors = [
      'hsl(var(--electric-blue))',
      'hsl(var(--cosmic-orange))',
      '#ffffff',
      '#b3d9ff',
      '#ffe6cc'
    ];
    const id = Date.now() + Math.random();
    const newParticle: Particle = {
      id,
      x,
      y,
      size: Math.random() * 4 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 1,
    };

    setParticles((prev) => {
      const active = prev.slice(-15); // Keep max 15 particles to reduce DOM nodes
      return [...active, newParticle];
    });

    // Clean up particle after animation finishes to prevent memory leak
    setTimeout(() => {
      setParticles((prev) => prev.filter(p => p.id !== id));
    }, 1000);
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setMousePos({ x: e.clientX, y: e.clientY });
          // Only add particles sometimes to reduce DOM updates
          if (Math.random() > 0.5) {
            addParticle(e.clientX, e.clientY);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [addParticle]);

  if (isMobile) return null;

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
