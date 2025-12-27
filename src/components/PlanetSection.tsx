import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactNode, useState, useEffect, useRef } from 'react';
import { getPlanetStyle, getAtmosphereStyle, getRingStyle } from '../lib/planet-styles';

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
  planetSize = 450,
  planetPosition = 'right',
}: PlanetSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const planetStyle = getPlanetStyle(planetName);
  const atmosphereStyle = getAtmosphereStyle(planetName);
  const ringStyle = getRingStyle(planetName);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const planetY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const planetRotate = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const glowIntensity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  const positionClasses = {
    left: '-left-20 sm:-left-32 md:-left-20 top-1/2 -translate-y-1/2',
    right: '-right-20 sm:-right-32 md:-right-20 top-1/2 -translate-y-1/2',
    center: 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
  };

  const mobileSize = Math.min(planetSize * 0.55, 220);

  const [particles, setParticles] = useState<{left: string, top: string, duration: number, delay: number, size: number}[]>([]);
  const [mounted, setMounted] = useState(false);
  const [orbitParticles, setOrbitParticles] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    const newParticles = [...Array(20)].map(() => ({
      left: Math.random() * 100 + '%',
      top: Math.random() * 100 + '%',
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 3,
      size: Math.random() * 2 + 1,
    }));
    setParticles(newParticles);

    const orbits = [...Array(30)].map((_, i) => ({
      angle: (i / 30) * 360,
      distance: 55 + Math.random() * 15,
      size: Math.random() * 3 + 1,
      duration: 20 + Math.random() * 20,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.6 + 0.2,
    }));
    setOrbitParticles(orbits);
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="planet-section min-h-screen relative py-16 sm:py-20 md:py-32 overflow-hidden"
    >
      <motion.div
        className={`absolute ${positionClasses[planetPosition]} pointer-events-none`}
        style={{ 
          width: 'var(--planet-width)', 
          height: 'var(--planet-height)',
          y: planetY,
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 0.85, scale: 1 }}
        transition={{ duration: 1.8, ease: 'easeOut' }}
        viewport={{ once: false, amount: 0.2 }}
      >
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

        <motion.div
          className="absolute inset-[-40%] rounded-full"
          style={{
            background: `radial-gradient(circle, ${atmosphereStyle.color} 0%, transparent 70%)`,
            filter: `blur(${atmosphereStyle.blur}px)`,
            opacity: glowIntensity,
          }}
          animate={{
            scale: [1, 1.08, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute inset-[-60%] rounded-full opacity-30"
          style={{
            background: `radial-gradient(circle, ${atmosphereStyle.color} 0%, transparent 60%)`,
            filter: 'blur(60px)',
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {mounted && orbitParticles.map((particle, i) => (
          <motion.div
            key={`orbit-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              width: particle.size,
              height: particle.size,
              left: '50%',
              top: '50%',
              opacity: particle.opacity,
              boxShadow: `0 0 ${particle.size * 3}px rgba(255,255,255,0.5)`,
            }}
            animate={{
              x: [
                Math.cos(particle.angle * Math.PI / 180) * particle.distance + '%',
                Math.cos((particle.angle + 360) * Math.PI / 180) * particle.distance + '%',
              ],
              y: [
                Math.sin(particle.angle * Math.PI / 180) * particle.distance + '%',
                Math.sin((particle.angle + 360) * Math.PI / 180) * particle.distance + '%',
              ],
              opacity: [particle.opacity, particle.opacity * 0.3, particle.opacity],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "linear",
            }}
          />
        ))}

        {ringStyle && planetName === 'Saturn' && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '1000px' }}>
            {ringStyle.rings.map((ring, i) => (
              <motion.div
                key={`ring-${i}`}
                className="absolute rounded-full"
                style={{
                  width: `${ring.width}%`,
                  height: `${ring.height}%`,
                  border: `${ring.borderWidth}px solid ${ring.color}`,
                  opacity: ring.opacity,
                  transform: `rotateX(75deg) rotateZ(${ringStyle.tilt}deg)`,
                  boxShadow: `0 0 20px ${ring.color}44, inset 0 0 20px ${ring.color}22`,
                  background: i === 0 ? `
                    repeating-conic-gradient(
                      from 0deg,
                      ${ring.color}22 0deg 3deg,
                      transparent 3deg 6deg
                    )
                  ` : 'transparent',
                }}
                animate={{
                  rotateZ: [ringStyle.tilt, ringStyle.tilt + 360],
                }}
                transition={{
                  duration: 300 + i * 50,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: '280%',
                height: '55%',
                background: `linear-gradient(90deg, 
                  transparent 0%, 
                  rgba(228, 211, 162, 0.08) 20%,
                  rgba(197, 163, 103, 0.12) 40%,
                  rgba(228, 211, 162, 0.08) 60%,
                  transparent 100%
                )`,
                transform: `rotateX(75deg) rotateZ(${ringStyle.tilt}deg)`,
                filter: 'blur(2px)',
              }}
            />
          </div>
        )}

        <motion.div
          className="absolute inset-0 rounded-full overflow-hidden"
          style={{
            ...planetStyle,
            transformStyle: 'preserve-3d',
          }}
          animate={{ 
            rotateY: [0, 360],
          }}
          transition={{ 
            duration: 180, 
            repeat: Infinity, 
            ease: 'linear' 
          }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(circle at 25% 25%, rgba(255,255,255,0.3) 0%, transparent 40%),
                radial-gradient(circle at 75% 75%, rgba(0,0,0,0.5) 0%, transparent 50%)
              `,
            }}
          />

          {planetName === 'Earth' && (
            <>
              <motion.div
                className="absolute inset-[-5%] rounded-full opacity-25"
                style={{
                  background: `
                    radial-gradient(ellipse 30% 20% at 30% 40%, rgba(255,255,255,0.8) 0%, transparent 100%),
                    radial-gradient(ellipse 40% 25% at 60% 30%, rgba(255,255,255,0.6) 0%, transparent 100%),
                    radial-gradient(ellipse 25% 15% at 45% 70%, rgba(255,255,255,0.5) 0%, transparent 100%)
                  `,
                }}
                animate={{ 
                  rotate: -360,
                  x: [0, 5, 0, -5, 0],
                }}
                transition={{ 
                  rotate: { duration: 200, repeat: Infinity, ease: "linear" },
                  x: { duration: 30, repeat: Infinity, ease: "easeInOut" },
                }}
              />
              <motion.div
                className="absolute inset-[-3%] rounded-full"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, rgba(100, 180, 255, 0.15) 0%, transparent 60%)',
                }}
              />
            </>
          )}

          {planetName === 'Jupiter' && (
            <motion.div
              className="absolute rounded-full"
              style={{
                width: '18%',
                height: '12%',
                left: '60%',
                top: '55%',
                background: 'radial-gradient(ellipse, #c45c3b 0%, #8b3a25 50%, transparent 70%)',
                boxShadow: 'inset -3px -3px 8px rgba(0,0,0,0.5), 0 0 15px rgba(196, 92, 59, 0.3)',
              }}
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.9, 1, 0.9],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
          )}

          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(135deg, transparent 40%, rgba(0,0,0,0.6) 100%)',
            }}
          />
        </motion.div>

        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: `
              radial-gradient(circle at 20% 20%, rgba(255,255,255,0.4) 0%, transparent 25%),
              radial-gradient(circle at 25% 30%, rgba(255,255,255,0.2) 0%, transparent 15%)
            `,
          }}
        />

        <motion.div
          className="absolute -top-[5%] -left-[5%] w-[30%] h-[30%]"
          style={{
            background: `
              radial-gradient(ellipse at center, rgba(255,255,255,0.1) 0%, transparent 70%)
            `,
            filter: 'blur(3px)',
          }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
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
                background: atmosphereStyle.color.replace('0.', '1.'),
                boxShadow: `0 0 20px ${atmosphereStyle.color}, 0 0 40px ${atmosphereStyle.color}`,
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
              ${atmosphereStyle.color.replace(')', ', 0.05)')} 0%, 
              transparent 70%
            )
          `,
        }}
      />
    </section>
  );
};

export default PlanetSection;
