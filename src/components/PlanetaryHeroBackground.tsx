import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useMemo, useRef, useState, useEffect } from 'react';

export function PlanetaryHeroBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY } = useScroll();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      // Normalize mouse position to range [-1, 1]
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const smoothMouseX = useSpring(0, { stiffness: 50, damping: 25 });
  const smoothMouseY = useSpring(0, { stiffness: 50, damping: 25 });

  useEffect(() => {
    if (!isMobile) {
      smoothMouseX.set(mousePosition.x);
      smoothMouseY.set(mousePosition.y);
    }
  }, [mousePosition.x, mousePosition.y, smoothMouseX, smoothMouseY, isMobile]);

  // Parallax and Perspective transforms
  const parallaxYBase = useTransform(scrollY, [0, 1000], [0, isMobile ? -100 : -200]);
  const rotateX = useTransform(smoothMouseY, [-1, 1], [2, -2]); // Vertical tilt
  const rotateY = useTransform(smoothMouseX, [-1, 1], [-2, 2]); // Horizontal tilt
  
    // Multiple layers for deep 3D effect
    const starsCount = isMobile ? 15 : 100;
    const stars = useMemo(() => [...Array(starsCount)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      duration: 3 + Math.random() * 5,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.2,
    })), [isMobile, starsCount]);
  
    const groundEnergyCount = isMobile ? 2 : 15;
    const groundEnergy = useMemo(() => [...Array(groundEnergyCount)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      bottom: `${Math.random() * 40}%`,
      width: `${Math.random() * (isMobile ? 80 : 150) + 50}px`,
      height: `${Math.random() * 3 + 1}px`,
      delay: Math.random() * 4,
      duration: 2 + Math.random() * 3,
    })), [isMobile, groundEnergyCount]);


  const bgImage = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Screenshot-2025-12-27-133742-1766822869625.png";

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[#020008]"
      style={{ perspective: isMobile ? 'none' : '1200px' }}
    >
      {/* 3D Wrapper Layer */}
      <motion.div 
        style={{ 
          y: parallaxYBase,
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
          transformStyle: isMobile ? 'flat' : 'preserve-3d'
        }}
        className={`absolute inset-0 ${isMobile ? '' : 'inset-[-15%]'} z-0`}
      >
        {/* Main Image Layer (Base) */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-95 scale-110"
          style={{ 
            backgroundImage: `url(${bgImage})`,
            transform: isMobile ? 'none' : 'translateZ(-50px)' 
          }}
        />

        {/* Space Enhancement: Dynamic Star Field (Upper Layer) */}
        <div className="absolute inset-0 z-10" style={{ transform: isMobile ? 'none' : 'translateZ(20px)' }}>
          {stars.map((star) => (
            <motion.div
              key={star.id}
              className="absolute bg-white rounded-full"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: star.size,
                height: star.size,
                opacity: star.opacity,
                boxShadow: `0 0 ${star.size * 3}px rgba(255, 255, 255, 0.8)`,
              }}
              animate={{
                opacity: [star.opacity, star.opacity * 0.3, star.opacity],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: star.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: star.delay,
              }}
            />
          ))}
        </div>

        {/* Ground Enhancement: Energy Veins (Isolated to bottom 40%) */}
        <div className="absolute inset-0 z-20 overflow-hidden" style={{ transform: isMobile ? 'none' : 'translateZ(100px)' }}>
          {groundEnergy.map((vein) => (
            <motion.div
              key={vein.id}
              className="absolute rounded-full"
              style={{
                left: vein.left,
                bottom: vein.bottom,
                width: vein.width,
                height: vein.height,
                background: 'linear-gradient(90deg, transparent, rgba(249, 115, 22, 0.4), rgba(251, 191, 36, 0.6), rgba(249, 115, 22, 0.4), transparent)',
                filter: 'blur(3px)',
              }}
              animate={{
                opacity: [0.1, 0.5, 0.1],
                scaleX: [0.8, 1.2, 0.8],
                x: [-10, 10, -10],
              }}
              transition={{
                duration: vein.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: vein.delay,
              }}
            />
          ))}
        </div>

        {/* Cinematic Nebula Glows - REDUCED ON MOBILE */}
        <div className="absolute inset-0 z-15 mix-blend-screen" style={{ transform: isMobile ? 'none' : 'translateZ(40px)' }}>
          {/* Top Right Nova Glow */}
          {!isMobile && (
            <motion.div
              className="absolute right-[10%] top-[35%] w-[600px] h-[600px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
              animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          {/* Bottom Magma Glow */}
          <motion.div
            className={`absolute bottom-[-10%] left-[20%] ${isMobile ? 'w-[300px] h-[150px]' : 'w-[1000px] h-[400px]'} rounded-full`}
            style={{
              background: 'radial-gradient(ellipse, rgba(249, 115, 22, 0.2) 0%, transparent 80%)',
              filter: isMobile ? 'blur(30px)' : 'blur(50px)',
            }}
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* Static Overlays (Not affected by 3D tilt for stability) */}
      
      {/* Ground Heat Shimmer SVG Filter Overlay - DISABLED ON MOBILE */}
      {!isMobile && (
        <>
          <svg className="hidden">
            <filter id="heat-shimmer">
              <feTurbulence type="fractalNoise" baseFrequency="0.01 0.05" numOctaves="2" seed="1">
                <animate attributeName="seed" from="1" to="100" dur="10s" repeatCount="indefinite" />
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" scale="5" />
            </filter>
          </svg>
          
          <div 
            className="absolute bottom-0 left-0 w-full h-[45%] z-25 pointer-events-none opacity-40"
            style={{ filter: 'url(#heat-shimmer)' }}
          >
            <div className="w-full h-full bg-transparent" />
          </div>
        </>
      )}

      {/* Atmospheric Fog/Mist (Foreground) */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t from-[#020008] via-transparent to-transparent opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020008]/40 via-transparent to-transparent opacity-60" />
      </div>

      {/* Vignette & Color Grading */}
      <div className="absolute inset-0 z-40 pointer-events-none">
        <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.9)]" />
        <div className="absolute inset-0 bg-[#020008]/10 mix-blend-multiply" />
      </div>
    </div>
  );
}

export default PlanetaryHeroBackground;
