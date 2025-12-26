import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useMemo, useRef, useState, useEffect } from 'react';

interface StarFieldProps {
  count?: number;
}

const StarField = ({ count = 200 }: StarFieldProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [cloudsCleared, setCloudsCleared] = useState(false);

  // Create different star layers for parallax effect
  const layer1Y = useTransform(scrollY, [0, 1000], [0, -100]);
  const layer2Y = useTransform(scrollY, [0, 1000], [0, -250]);
  const layer3Y = useTransform(scrollY, [0, 1000], [0, -400]);

  const starLayers = useMemo(() => {
    const layers = [[], [], []];
    const colors = [
      'hsl(var(--starlight))',
      'hsl(var(--electric-blue))',
      'hsl(var(--cosmic-orange))',
      '#ffffff',
      '#b3d9ff',
      '#ffe6cc'
    ];

    for (let i = 0; i < count; i++) {
      const layerIndex = Math.floor(Math.random() * 3);
      const size = Math.random() * (layerIndex === 2 ? 3 : 1.5) + 0.5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      layers[layerIndex].push({
        id: i,
        size,
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        color,
        opacity: Math.random() * 0.7 + 0.3,
        duration: Math.random() * 4 + 3,
        delay: Math.random() * 5,
      });
    }
    return layers;
  }, [count]);

  const nebulae = useMemo(() => {
    return [
      {
        color: 'hsl(var(--space-nebula) / 0.15)',
        width: '120vw',
        height: '100vh',
        left: '-10%',
        top: '0%',
        duration: 40,
      }
    ];
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-space-deep">
      {/* Deep Space Background Gradient */}
      <div className="absolute inset-0 bg-space-gradient opacity-50" />

      {/* Realistic Nebulae */}
      <AnimatePresence>
        {!cloudsCleared && nebulae.map((nebula, i) => (
          <motion.div
            key={`nebula-${i}`}
            className="absolute rounded-full blur-[120px]"
            style={{
              background: `radial-gradient(circle, ${nebula.color} 0%, transparent 70%)`,
              width: nebula.width,
              height: nebula.height,
              left: nebula.left,
              top: nebula.top,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5],
              rotate: [0, 360],
            }}
            exit={{ 
              opacity: 0, 
              scale: 1.5,
              filter: 'blur(200px)',
              transition: { duration: 1.5, ease: "easeOut" }
            }}
            transition={{
              duration: nebula.duration,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </AnimatePresence>

      {/* Galactic Core Glow */}
      <AnimatePresence>
        {!cloudsCleared && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0, transition: { duration: 2 } }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] blur-[150px]"
            style={{
              background: 'radial-gradient(circle, hsl(var(--electric-blue) / 0.15) 0%, transparent 60%)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Star Layers */}
      <motion.div style={{ y: layer1Y }} className="absolute inset-0">
        {starLayers[0].map((star) => (
          <StarItem key={star.id} {...star} />
        ))}
      </motion.div>

      <motion.div style={{ y: layer2Y }} className="absolute inset-0">
        {starLayers[1].map((star) => (
          <StarItem key={star.id} {...star} />
        ))}
      </motion.div>

      <motion.div style={{ y: layer3Y }} className="absolute inset-0">
        {starLayers[2].map((star) => (
          <StarItem key={star.id} {...star} />
        ))}
      </motion.div>
      
      {/* Occasional shooting stars */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`shooting-${i}`}
          className="absolute h-px bg-gradient-to-r from-transparent via-starlight to-transparent"
          style={{
            width: '150px',
            left: Math.random() * 80 + '%',
            top: Math.random() * 50 + '%',
            transform: 'rotate(-35deg)',
          }}
          animate={{
            x: [0, -400],
            y: [0, 250],
            opacity: [0, 1, 0],
            scaleX: [0, 1.5, 0],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            repeatDelay: Math.random() * 15 + 10,
            delay: Math.random() * 10 + i * 5,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
};

const StarItem = ({ size, left, top, color, opacity, duration, delay }: any) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: size + 'px',
      height: size + 'px',
      left,
      top,
      background: color,
      boxShadow: size > 2 ? `0 0 ${size * 3}px ${color}` : 'none',
    }}
    animate={{
      opacity: [opacity, opacity * 0.3, opacity],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: 'easeInOut',
    }}
  />
);

export default StarField;
