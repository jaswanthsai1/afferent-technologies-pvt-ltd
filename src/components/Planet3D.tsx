import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Planet3DProps {
  planetName: string;
  size: number;
  className?: string;
}

const planetConfigs: Record<string, {
  texture: string;
  glowColor: string;
  atmosphereColor: string;
  hasRings?: boolean;
  ringTexture?: string;
  rotationSpeed?: number;
}> = {
  Mercury: {
    texture: 'https://www.solarsystemscope.com/textures/download/2k_mercury.jpg',
    glowColor: 'rgba(140, 140, 140, 0.4)',
    atmosphereColor: 'rgba(180, 180, 180, 0.15)',
    rotationSpeed: 40,
  },
  Venus: {
    texture: 'https://www.solarsystemscope.com/textures/download/2k_venus_atmosphere.jpg',
    glowColor: 'rgba(232, 198, 122, 0.5)',
    atmosphereColor: 'rgba(255, 200, 100, 0.4)',
    rotationSpeed: -60,
  },
  Earth: {
    texture: 'https://www.solarsystemscope.com/textures/download/2k_earth_daymap.jpg',
    glowColor: 'rgba(74, 144, 194, 0.6)',
    atmosphereColor: 'rgba(100, 180, 255, 0.5)',
    rotationSpeed: 30,
  },
  Mars: {
    texture: 'https://www.solarsystemscope.com/textures/download/2k_mars.jpg',
    glowColor: 'rgba(193, 68, 14, 0.5)',
    atmosphereColor: 'rgba(255, 150, 100, 0.3)',
    rotationSpeed: 35,
  },
  Jupiter: {
    texture: 'https://www.solarsystemscope.com/textures/download/2k_jupiter.jpg',
    glowColor: 'rgba(212, 165, 116, 0.5)',
    atmosphereColor: 'rgba(255, 200, 150, 0.3)',
    rotationSpeed: 20,
  },
  Saturn: {
    texture: 'https://www.solarsystemscope.com/textures/download/2k_saturn.jpg',
    glowColor: 'rgba(244, 228, 193, 0.5)',
    atmosphereColor: 'rgba(255, 230, 180, 0.3)',
    hasRings: true,
    rotationSpeed: 25,
  },
  Uranus: {
    texture: 'https://www.solarsystemscope.com/textures/download/2k_uranus.jpg',
    glowColor: 'rgba(125, 207, 220, 0.5)',
    atmosphereColor: 'rgba(100, 220, 255, 0.4)',
    hasRings: true,
    rotationSpeed: -35,
  },
  Neptune: {
    texture: 'https://www.solarsystemscope.com/textures/download/2k_neptune.jpg',
    glowColor: 'rgba(58, 108, 184, 0.5)',
    atmosphereColor: 'rgba(80, 120, 255, 0.4)',
    rotationSpeed: 30,
  },
};

export function Planet3D({ planetName, size, className = '' }: Planet3DProps) {
  const config = planetConfigs[planetName] || planetConfigs.Earth;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Mobile optimization: Reduce heavy blur effects but keep 3D rotation
  const blurAmount = isMobile ? '10px' : '40px';
  const secondaryBlur = isMobile ? '5px' : '20px';

  return (
    <div
      className={`relative ${className}`}
      style={{
        width: size,
        height: size,
      }}
    >
      {/* Outer Atmosphere Glow - Optimized for mobile */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '150%',
          height: '150%',
          left: '-25%',
          top: '-25%',
          background: `
            radial-gradient(circle, ${config.atmosphereColor} 0%, transparent 60%),
            radial-gradient(circle, ${config.glowColor.replace('0.5', '0.2')} 40%, transparent 70%)
          `,
          filter: `blur(${blurAmount})`,
          zIndex: -1
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Secondary Glow for Depth */}
      <div
        className="absolute rounded-full"
        style={{
          width: '120%',
          height: '120%',
          left: '-10%',
          top: '-10%',
          background: `radial-gradient(circle, ${config.glowColor} 0%, transparent 70%)`,
          filter: `blur(${secondaryBlur})`,
          opacity: 0.6,
          zIndex: -1
        }}
      />

      {/* The 3D Sphere */}
      <div
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{
          boxShadow: `
            inset -${size * 0.25}px -${size * 0.1}px ${size * 0.4}px rgba(0,0,0,0.95),
            inset ${size * 0.05}px ${size * 0.05}px ${size * 0.15}px rgba(255,255,255,0.4),
            0 0 ${size * 0.05}px ${config.glowColor}
          `,
          background: '#000',
        }}
      >
        {/* Texture Layer - The magic of 3D rotation in CSS */}
        <motion.div
          className="absolute"
          style={{
            width: '200%',
            height: '100%',
            backgroundImage: `url(${config.texture})`,
            backgroundSize: '50% 100%',
            backgroundRepeat: 'repeat-x',
            willChange: 'transform',
          }}
          animate={{
            x: ['0%', '-50%']
          }}
          transition={{
            duration: Math.abs(config.rotationSpeed || 30),
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Shading Layer (Static overlay to keep lighting consistent while texture rotates) */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: `
                radial-gradient(circle at 30% 30%, transparent 10%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.95) 100%),
                linear-gradient(120deg, rgba(255,255,255,0.15) 0%, transparent 40%)
              `,
            mixBlendMode: 'multiply'
          }}
        />

        {/* Atmospheric rim lighting (screen mode) */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${config.atmosphereColor} 0%, transparent 60%)`,
            mixBlendMode: 'screen',
            opacity: 0.4
          }}
        />
      </div>


      {/* Saturn's Rings */}
      {config.hasRings && planetName === 'Saturn' && (
        <div
          className="absolute"
          style={{
            width: size * 2.6,
            height: size * 0.8,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%) rotateX(75deg) rotateY(-15deg)',
            pointerEvents: 'none',
          }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: `${size * 0.15}px solid rgba(197, 163, 103, 0.4)`,
              boxShadow: `0 0 ${size * 0.1}px rgba(197, 163, 103, 0.2)`,
              background: `
                radial-gradient(circle, 
                  transparent 45%, 
                  rgba(197, 163, 103, 0.15) 48%,
                  rgba(197, 163, 103, 0.3) 55%,
                  rgba(197, 163, 103, 0.15) 65%,
                  transparent 70%
                )
              `,
            }}
          />
        </div>
      )}

      {/* Uranus's Rings (Vertical) */}
      {config.hasRings && planetName === 'Uranus' && (
        <div
          className="absolute"
          style={{
            width: size * 2.2,
            height: size * 0.4,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%) rotateZ(95deg) rotateX(80deg)',
            pointerEvents: 'none',
          }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: `2px solid rgba(125, 207, 220, 0.3)`,
              boxShadow: `0 0 10px rgba(125, 207, 220, 0.2)`,
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Planet3D;
