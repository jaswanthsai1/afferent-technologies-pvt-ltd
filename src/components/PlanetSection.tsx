import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactNode, useState, useEffect, useRef } from 'react';
import { Planet3D } from './Planet3D';

interface PlanetSectionProps {
  id: string;
  planetName: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  planetSize?: number;
  planetPosition?: 'left' | 'right' | 'center';
}

const getAtmosphereColor = (name: string) => {
  const colors: Record<string, string> = {
    Earth: 'rgba(100, 180, 255, 0.4)',
    Venus: 'rgba(255, 200, 100, 0.35)',
    Mars: 'rgba(255, 150, 100, 0.25)',
    Jupiter: 'rgba(255, 200, 150, 0.2)',
    Saturn: 'rgba(255, 230, 180, 0.2)',
    Uranus: 'rgba(100, 220, 255, 0.35)',
    Neptune: 'rgba(80, 120, 255, 0.35)',
    Mercury: 'rgba(180, 180, 180, 0.15)',
  };
  return colors[name] || 'rgba(255,255,255,0.1)';
};

const PlanetSection = ({
  id,
  planetName,
  title,
  subtitle,
  children,
  planetSize = 450,
  planetPosition = 'right',
}: PlanetSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const atmosphereColor = getAtmosphereColor(planetName);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const planetY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const positionClasses = {
    left: '-left-20 sm:-left-32 md:-left-20 top-1/2 -translate-y-1/2',
    right: 'left-1/2 sm:left-auto sm:-right-20 md:-right-10 top-1/2 -translate-y-1/2',
    center: 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
  };

  const mobileSize = Math.min(planetSize * 0.7, 280);

  const [particles, setParticles] = useState<{left: string, top: string, duration: number, delay: number, size: number}[]>([]);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    
    if (!mobile) {
      const newParticles = [...Array(20)].map(() => ({
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        duration: Math.random() * 4 + 3,
        delay: Math.random() * 3,
        size: Math.random() * 2 + 1,
      }));
      setParticles(newParticles);
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="planet-section min-h-screen relative py-16 sm:py-20 md:py-32 overflow-hidden"
    >
      <motion.div
        className={`absolute ${positionClasses[planetPosition]} pointer-events-none z-0`}
        style={{ 
          y: planetY,
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: 'easeOut' }}
        viewport={{ once: false, amount: 0.2 }}
      >
        <div className="hidden md:block">
          <Planet3D planetName={planetName} size={planetSize} />
        </div>
        <div className="block md:hidden">
          <Planet3D planetName={planetName} size={mobileSize} />
        </div>
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          className={`max-w-3xl ${planetPosition === 'right' ? 'mr-auto' : planetPosition === 'left' ? 'ml-auto' : 'mx-auto text-center'}`}
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: false }}
            className="flex items-center gap-4 mb-6"
          >
            <motion.div
              className="w-4 h-4 rounded-full"
              style={{ 
                background: atmosphereColor.replace('0.', '1.'),
                boxShadow: `0 0 20px ${atmosphereColor}, 0 0 40px ${atmosphereColor}`,
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="font-display text-sm tracking-[0.4em] uppercase text-muted-foreground/80">
              {planetName}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: false }}
            className="font-display text-4xl sm:text-5xl md:text-7xl font-black mb-6"
          >
            <span className="text-gradient-primary">{title}</span>
          </motion.h2>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              viewport={{ once: false }}
              className="text-lg sm:text-xl md:text-2xl text-muted-foreground/90 mb-8 sm:mb-10 leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            viewport={{ once: false }}
          >
            {children}
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {mounted && particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              left: particle.left,
              top: particle.top,
              background: 'white',
              boxShadow: `0 0 ${particle.size * 4}px rgba(255,255,255,0.5)`,
            }}
            animate={{
              opacity: [0.1, 0.8, 0.1],
              scale: [1, 1.8, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at ${planetPosition === 'right' ? '80%' : planetPosition === 'left' ? '20%' : '50%'} 50%, 
              ${atmosphereColor.replace(')', ', 0.05)')} 0%, 
              transparent 70%
            )
          `,
        }}
      />
    </section>
  );
};

export default PlanetSection;
