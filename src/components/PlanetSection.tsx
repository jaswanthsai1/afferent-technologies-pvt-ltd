import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { getPlanetStyle } from '../lib/planet-styles';

interface PlanetSectionProps {
  id: string;
  planetName: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  planetSize?: number;
  planetPosition?: 'left' | 'right' | 'center';
}

const PlanetSection = ({
  id,
  planetName,
  title,
  subtitle,
  children,
  planetSize = 400,
  planetPosition = 'right',
}: PlanetSectionProps) => {
  const planetStyle = getPlanetStyle(planetName);
    const positionClasses = {
      left: '-left-48 md:-left-32 top-1/2 -translate-y-1/2',
      right: '-right-48 md:-right-32 top-1/2 -translate-y-1/2',
      center: 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
    };

    const mobileSize = planetSize * 0.7;

    return (
      <section
        id={id}
        className="planet-section min-h-screen relative py-16 md:py-32 overflow-hidden"
      >
        {/* Planet Background */}
          <motion.div
            className={`absolute ${positionClasses[planetPosition]} pointer-events-none`}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 0.4, scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            viewport={{ once: false, amount: 0.3 }}
            style={{ width: 'var(--planet-width)', height: 'var(--planet-height)' }}
          >
            {/* Gravitational Distortion Effect */}
            <svg width="0" height="0" className="absolute">
              <defs>
                <filter id={`gravity-distortion-${id}`}>
                  <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" result="noise">
                    <animate attributeName="baseFrequency" values="0.01;0.015;0.01" dur="10s" repeatCount="indefinite" />
                  </feTurbulence>
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" />
                </filter>
              </defs>
            </svg>

            <motion.div 
              className="absolute inset-[-20%] rounded-full opacity-50 blur-xl"
              style={{ 
                background: `radial-gradient(circle, ${planetStyle.background} 0%, transparent 70%)`,
                filter: `url(#gravity-distortion-${id})`,
              }}
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            <style dangerouslySetInnerHTML={{ __html: `
              #${id} .pointer-events-none {
                --planet-width: ${mobileSize}px;
                --planet-height: ${mobileSize}px;
              }
              @media (min-width: 768px) {
                #${id} .pointer-events-none {
                  --planet-width: ${planetSize}px;
                  --planet-height: ${planetSize}px;
                }
              }
            `}} />
            {/* Planet glow */}
        <div
          className="absolute inset-0 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)`,
            opacity: 0.4,
          }}
        />
        
        {/* Planet body */}
        <motion.div
          className="absolute inset-0 rounded-full overflow-hidden shadow-2xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
          style={planetStyle}
        >
          {/* Atmospheric glow overlay */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1) 0%, transparent 60%)`,
            }}
          />
        </motion.div>

        {/* Orbiting Satellites */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`satellite-${i}`}
            className="absolute top-1/2 left-1/2"
            initial={{ rotate: i * 120 }}
            animate={{ rotate: (i * 120) + 360 }}
            transition={{
              duration: 15 + i * 5,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ 
              width: '150%', 
              height: '150%',
              marginLeft: '-75%',
              marginTop: '-75%',
              zIndex: i === 1 ? -1 : 2 // Some go behind
            }}
          >
            <motion.div 
              className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-1"
              animate={{
                scale: [0.8, 1, 0.8],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Satellite Body */}
              <div className="w-2 h-2 bg-slate-400 rounded-sm shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
              {/* Solar Panels */}
              <div className="w-4 h-1 bg-blue-900/60 border border-blue-400/30 rounded-sm" />
              <div className="w-4 h-1 bg-blue-900/60 border border-blue-400/30 rounded-sm" />
              
              {/* Signal Blink */}
              <motion.div 
                className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-red-500"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        ))}

        {/* Rings for Saturn */}
        {planetName === 'Saturn' && (
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[30%] rounded-[100%] border-[8px] border-[#e4d3a2]/30"
            style={{ 
              transform: 'translate(-50%, -50%) rotate(-15deg)',
              boxShadow: '0 0 20px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,0,0,0.5)'
            }}
          />
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
              style={{ background: planetStyle.background }}
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
