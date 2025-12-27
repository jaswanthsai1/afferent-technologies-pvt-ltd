import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useMemo, useRef, useState, useEffect } from 'react';

export function PlanetaryHeroBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const smoothMouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    smoothMouseX.set(mousePosition.x);
    smoothMouseY.set(mousePosition.y);
  }, [mousePosition.x, mousePosition.y, smoothMouseX, smoothMouseY]);

  const parallaxYBase = useTransform(scrollY, [0, 1000], [0, -150]);
  const parallaxYMid = useTransform(scrollY, [0, 1000], [0, -100]);
  const parallaxYFore = useTransform(scrollY, [0, 1000], [0, -50]);

  const mouseXBase = useTransform(smoothMouseX, (x) => x * 0.2);
  const mouseYBase = useTransform(smoothMouseY, (y) => y * 0.2);
  const mouseXMid = useTransform(smoothMouseX, (x) => x * 0.5);
  const mouseYMid = useTransform(smoothMouseY, (y) => y * 0.5);

  const particles = useMemo(() => [...Array(30)].map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: 5 + Math.random() * 10,
    delay: Math.random() * 5,
  })), []);

  const glows = useMemo(() => [
    { x: '75%', y: '85%', size: '400px', color: 'rgba(249, 115, 22, 0.25)', delay: 0 },
    { x: '85%', y: '75%', size: '300px', color: 'rgba(251, 146, 60, 0.2)', delay: 2 },
    { x: '20%', y: '80%', size: '350px', color: 'rgba(249, 115, 22, 0.15)', delay: 1 },
    { x: '85%', y: '45%', size: '500px', color: 'rgba(255, 200, 150, 0.1)', delay: 3 },
  ], []);

  const bgImage = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Screenshot-2025-12-27-133742-1766822869625.png";

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[#020010]">
      {/* Background Layer (Deep Space & Distant Stars) */}
      <motion.div 
        style={{ 
          y: parallaxYBase,
          x: mouseXBase,
          translateY: mouseYBase
        }}
        className="absolute inset-[-10%] z-0"
      >
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat opacity-90 scale-105"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      </motion.div>

      {/* Atmospheric Glow Layer (Midground) */}
      <motion.div 
        style={{ 
          y: parallaxYMid,
          x: mouseXMid,
          translateY: mouseYMid
        }}
        className="absolute inset-[-5%] z-10 mix-blend-screen"
      >
        {glows.map((glow, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: glow.x,
              top: glow.y,
              width: glow.size,
              height: glow.size,
              background: `radial-gradient(circle, ${glow.color} 0%, transparent 70%)`,
              filter: 'blur(40px)',
              transform: 'translate(-50%, -50%)',
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: glow.delay,
            }}
          />
        ))}
      </motion.div>

      {/* Floating Particles (Foreground) */}
      <div className="absolute inset-0 z-20">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute bg-white rounded-full opacity-30"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              boxShadow: '0 0 8px 1px rgba(255, 255, 255, 0.2)',
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Foreground Depth Overlay (Shadows at the bottom) */}
      <motion.div 
        style={{ y: parallaxYFore }}
        className="absolute bottom-0 left-0 w-full h-[60%] z-30 pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#020010] via-transparent to-transparent opacity-90" />
      </motion.div>

      {/* Cinematic Lens Flare (Simulating the bright sun in the image) */}
      <motion.div
        className="absolute right-[15%] top-[45%] w-[800px] h-[800px] rounded-full z-15 mix-blend-screen pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 200, 150, 0.2) 0%, rgba(255, 100, 50, 0.03) 40%, transparent 70%)',
          filter: 'blur(80px)',
          transform: 'translate(50%, -50%)',
        }}
        animate={{
          opacity: [0.4, 0.7, 0.4],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.8)] z-40" />
    </div>
  );
}

export default PlanetaryHeroBackground;
