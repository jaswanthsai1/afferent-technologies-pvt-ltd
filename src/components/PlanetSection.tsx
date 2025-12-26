import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PlanetSectionProps {
  id: string;
  planetName: string;
  planetColor: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  planetSize?: number;
  planetPosition?: 'left' | 'right' | 'center';
}

const PlanetSection = ({
  id,
  planetName,
  planetColor,
  title,
  subtitle,
  children,
  planetSize = 400,
  planetPosition = 'right',
}: PlanetSectionProps) => {
  const positionClasses = {
    left: '-left-32 top-1/2 -translate-y-1/2',
    right: '-right-32 top-1/2 -translate-y-1/2',
    center: 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
  };

  return (
    <section
      id={id}
      className="planet-section min-h-screen relative py-20 md:py-32"
    >
      {/* Planet Background */}
      <motion.div
        className={`absolute ${positionClasses[planetPosition]} pointer-events-none`}
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        viewport={{ once: false, amount: 0.3 }}
        style={{ width: planetSize, height: planetSize }}
      >
        {/* Planet glow */}
        <div
          className="absolute inset-0 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${planetColor} 0%, transparent 70%)`,
            opacity: 0.4,
          }}
        />
        
        {/* Planet body */}
        <motion.div
          className="absolute inset-0 rounded-full overflow-hidden"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          style={{
            background: `
              radial-gradient(circle at 30% 30%, 
                ${planetColor} 0%, 
                color-mix(in srgb, ${planetColor} 70%, black) 50%, 
                color-mix(in srgb, ${planetColor} 40%, black) 100%)
            `,
            boxShadow: `
              inset -30px -30px 60px rgba(0,0,0,0.6),
              inset 20px 20px 40px rgba(255,255,255,0.1),
              0 0 80px ${planetColor}40
            `,
          }}
        >
          {/* Surface texture */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `
                radial-gradient(ellipse at 50% 40%, transparent 50%, rgba(0,0,0,0.3) 100%),
                repeating-conic-gradient(from 0deg, transparent 0deg 10deg, rgba(255,255,255,0.05) 10deg 20deg)
              `,
            }}
          />
          
          {/* Atmospheric glow */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle at 70% 30%, rgba(255,255,255,0.2) 0%, transparent 50%)`,
            }}
          />
        </motion.div>

        {/* Rings for Saturn-like effect */}
        {planetName === 'Saturn' && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ transform: 'rotateX(75deg)' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
          >
            <div
              className="absolute rounded-full border-4 border-cosmic-orange/40"
              style={{
                width: planetSize * 1.6,
                height: planetSize * 1.6,
              }}
            />
            <div
              className="absolute rounded-full border-2 border-cosmic-orange/20"
              style={{
                width: planetSize * 1.8,
                height: planetSize * 1.8,
              }}
            />
          </motion.div>
        )}
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
          className={`max-w-3xl ${planetPosition === 'right' ? 'mr-auto' : planetPosition === 'left' ? 'ml-auto' : 'mx-auto text-center'}`}
        >
          {/* Planet label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: false }}
            className="flex items-center gap-3 mb-4"
          >
            <div
              className="w-3 h-3 rounded-full animate-pulse"
              style={{ background: planetColor }}
            />
            <span className="font-display text-sm tracking-[0.3em] uppercase text-muted-foreground">
              {planetName}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: false }}
            className="font-display text-4xl md:text-6xl font-black mb-4"
          >
            <span className="text-gradient-primary">{title}</span>
          </motion.h2>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: false }}
              className="text-lg md:text-xl text-muted-foreground mb-8"
            >
              {subtitle}
            </motion.p>
          )}

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: false }}
          >
            {children}
          </motion.div>
        </motion.div>
      </div>

      {/* Connecting stars/particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-starlight"
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default PlanetSection;
