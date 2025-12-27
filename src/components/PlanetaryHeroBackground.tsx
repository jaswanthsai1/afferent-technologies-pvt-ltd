import { motion, useScroll, useTransform } from 'framer-motion';
import { useMemo, useRef, useState, useEffect } from 'react';
import Planet3D from './Planet3D';

export function PlanetaryHeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    setMounted(true);
  }, []);

  const parallaxY1 = useTransform(scrollY, [0, 1000], [0, -200]);
  const parallaxY2 = useTransform(scrollY, [0, 1000], [0, -100]);
  const parallaxY3 = useTransform(scrollY, [0, 1000], [0, -50]);

  const nebulae = useMemo(() => [
    { x: '20%', y: '30%', w: 600, h: 400, color: '#8b5cf6', opacity: 0.15, blur: 120 },
    { x: '80%', y: '20%', w: 500, h: 500, color: '#f97316', opacity: 0.2, blur: 150 },
    { x: '50%', y: '50%', w: 800, h: 600, color: '#3b82f6', opacity: 0.1, blur: 180 },
  ], []);

  if (!mounted) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[#020010]">
      {/* Deep Space Base */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 80% 20%, #1a0b2e 0%, #020010 70%)'
        }}
      />

      {/* Nebulae */}
      {nebulae.map((nebula, i) => (
        <motion.div
          key={`nebula-${i}`}
          className="absolute rounded-full"
          style={{
            left: nebula.x,
            top: nebula.y,
            width: nebula.w,
            height: nebula.h,
            background: `radial-gradient(circle, ${nebula.color} 0%, transparent 70%)`,
            opacity: nebula.opacity,
            filter: `blur(${nebula.blur}px)`,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [nebula.opacity, nebula.opacity * 1.3, nebula.opacity],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Stars */}
      <div className="absolute inset-0 opacity-40">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              boxShadow: '0 0 5px white',
              opacity: Math.random() * 0.8 + 0.2,
            }}
          />
        ))}
      </div>

      {/* Planets (Positioned like the image) */}
      <motion.div style={{ y: parallaxY1 }} className="absolute inset-0">
        {/* Large Earth-like planet on the left */}
        <div className="absolute left-[5%] top-[25%] md:left-[10%] md:top-[30%]">
          <Planet3D planetName="Earth" size={window.innerWidth < 768 ? 200 : 400} />
        </div>
        
        {/* Small moon/planet near earth */}
        <div className="absolute left-[25%] top-[45%] md:left-[28%] md:top-[48%]">
          <Planet3D planetName="Mercury" size={40} />
        </div>
      </motion.div>

      <motion.div style={{ y: parallaxY2 }} className="absolute inset-0">
        {/* Jupiter-like planet in the center top */}
        <div className="absolute left-[35%] top-[5%] md:left-[40%] md:top-[10%] opacity-80">
          <Planet3D planetName="Jupiter" size={150} />
        </div>

        {/* Saturn with rings on the right */}
        <div className="absolute right-[10%] top-[15%] md:right-[15%] md:top-[20%]">
          <Planet3D planetName="Saturn" size={window.innerWidth < 768 ? 150 : 300} />
        </div>

        {/* Small planets scattered */}
        <div className="absolute right-[30%] top-[35%]">
          <Planet3D planetName="Mars" size={50} />
        </div>
        <div className="absolute right-[45%] top-[45%] opacity-60">
          <Planet3D planetName="Venus" size={30} />
        </div>
      </motion.div>

      {/* Bright Star / Sun Flare on the right */}
      <motion.div
        className="absolute right-[-10%] top-[40%] w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255, 200, 150, 0.4) 0%, rgba(255, 100, 50, 0.1) 40%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          opacity: [0.6, 0.8, 0.6],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Foreground Terrain (Rocky/Glowing Landscape) */}
      <motion.div 
        style={{ y: parallaxY3 }}
        className="absolute bottom-0 left-0 w-full h-[40vh] z-10"
      >
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            background: `
              linear-gradient(to top, #050010 20%, transparent 100%),
              radial-gradient(ellipse at 50% 100%, rgba(249, 115, 22, 0.2) 0%, transparent 70%)
            `,
            clipPath: 'polygon(0 100%, 0 40%, 10% 35%, 25% 50%, 40% 30%, 55% 45%, 70% 25%, 85% 40%, 100% 30%, 100% 100%)',
          }}
        >
          {/* Glowing Energy Lines on Terrain */}
          <div className="absolute inset-0 opacity-30">
             {[...Array(20)].map((_, i) => (
               <motion.div
                 key={i}
                 className="absolute h-[1px] bg-gradient-to-r from-transparent via-[#f97316] to-transparent"
                 style={{
                   left: `${Math.random() * 100}%`,
                   top: `${Math.random() * 100}%`,
                   width: `${Math.random() * 200 + 100}px`,
                   transform: `rotate(${Math.random() * 30 - 15}deg)`,
                 }}
                 animate={{
                   opacity: [0, 1, 0],
                 }}
                 transition={{
                   duration: 3 + Math.random() * 4,
                   repeat: Infinity,
                   delay: Math.random() * 5,
                 }}
               />
             ))}
          </div>
        </div>

        {/* Secondary Terrain Layer for depth */}
        <div 
          className="absolute inset-0 w-full h-full opacity-60"
          style={{
            background: 'linear-gradient(to top, #020005 30%, transparent 100%)',
            clipPath: 'polygon(0 100%, 0 60%, 15% 55%, 30% 65%, 45% 50%, 60% 60%, 75% 45%, 90% 55%, 100% 40%, 100% 100%)',
          }}
        />
      </motion.div>

      {/* Atmospheric Mist/Nebula at the bottom */}
      <div 
        className="absolute bottom-0 left-0 w-full h-[30vh] opacity-40"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, #8b5cf6 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
    </div>
  );
}

export default PlanetaryHeroBackground;
