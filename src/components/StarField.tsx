import { motion } from 'framer-motion';

interface StarFieldProps {
  count?: number;
}

const StarField = ({ count = 150 }: StarFieldProps) => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(count)].map((_, i) => {
        const size = Math.random() * 3 + 0.5;
        const isLarge = size > 2;
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size + 'px',
              height: size + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              background: isLarge 
                ? `radial-gradient(circle, hsl(var(--starlight)), hsl(var(--electric-blue) / 0.5))`
                : 'hsl(var(--starlight))',
              boxShadow: isLarge 
                ? `0 0 ${size * 2}px hsl(var(--electric-blue) / 0.3)`
                : 'none',
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, isLarge ? 1.3 : 1.1, 1],
            }}
            transition={{
              duration: Math.random() * 4 + 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'easeInOut',
            }}
          />
        );
      })}
      
      {/* Occasional shooting stars */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`shooting-${i}`}
          className="absolute h-px bg-gradient-to-r from-transparent via-starlight to-transparent"
          style={{
            width: '100px',
            left: Math.random() * 80 + '%',
            top: Math.random() * 50 + '%',
            transform: 'rotate(-45deg)',
          }}
          animate={{
            x: [0, -200],
            y: [0, 200],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatDelay: Math.random() * 10 + 5,
            delay: Math.random() * 5 + i * 3,
          }}
        />
      ))}
    </div>
  );
};

export default StarField;
