import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useMemo } from 'react';

interface Planet3DProps {
  planetName: string;
  size: number;
  className?: string;
}

const planetConfigs: Record<string, {
  baseColor: string;
  highlightColor: string;
  shadowColor: string;
  glowColor: string;
  atmosphereColor: string;
  surfacePattern?: string;
  hasRings?: boolean;
  ringColors?: string[];
}> = {
  Mercury: {
    baseColor: '#8c8c8c',
    highlightColor: '#b5b5b5',
    shadowColor: '#3d3d3d',
    glowColor: 'rgba(140, 140, 140, 0.4)',
    atmosphereColor: 'rgba(180, 180, 180, 0.15)',
    surfacePattern: 'craters',
  },
  Venus: {
    baseColor: '#e8c67a',
    highlightColor: '#f5e6c8',
    shadowColor: '#8b6914',
    glowColor: 'rgba(232, 198, 122, 0.5)',
    atmosphereColor: 'rgba(255, 200, 100, 0.4)',
    surfacePattern: 'swirl',
  },
  Earth: {
    baseColor: '#4a90c2',
    highlightColor: '#64b5f6',
    shadowColor: '#1a3a5f',
    glowColor: 'rgba(74, 144, 194, 0.6)',
    atmosphereColor: 'rgba(100, 180, 255, 0.5)',
    surfacePattern: 'continents',
  },
  Mars: {
    baseColor: '#c1440e',
    highlightColor: '#e27b58',
    shadowColor: '#6b2408',
    glowColor: 'rgba(193, 68, 14, 0.5)',
    atmosphereColor: 'rgba(255, 150, 100, 0.3)',
    surfacePattern: 'dust',
  },
  Jupiter: {
    baseColor: '#d4a574',
    highlightColor: '#e8c9a0',
    shadowColor: '#5c3a28',
    glowColor: 'rgba(212, 165, 116, 0.5)',
    atmosphereColor: 'rgba(255, 200, 150, 0.3)',
    surfacePattern: 'bands',
  },
  Saturn: {
    baseColor: '#f4e4c1',
    highlightColor: '#fff8e8',
    shadowColor: '#8b7441',
    glowColor: 'rgba(244, 228, 193, 0.5)',
    atmosphereColor: 'rgba(255, 230, 180, 0.3)',
    surfacePattern: 'bands',
    hasRings: true,
    ringColors: ['#e4d3a2', '#c5a367', '#d4c392', '#a89060'],
  },
  Uranus: {
    baseColor: '#7dcfdc',
    highlightColor: '#b5e8ed',
    shadowColor: '#2a8a9a',
    glowColor: 'rgba(125, 207, 220, 0.5)',
    atmosphereColor: 'rgba(100, 220, 255, 0.4)',
    surfacePattern: 'smooth',
    hasRings: true,
    ringColors: ['#7dcfdc', '#4fb8c9'],
  },
  Neptune: {
    baseColor: '#3a6cb8',
    highlightColor: '#5b8bd4',
    shadowColor: '#1a3470',
    glowColor: 'rgba(58, 108, 184, 0.5)',
    atmosphereColor: 'rgba(80, 120, 255, 0.4)',
    surfacePattern: 'storms',
  },
};

const generateSphereGradient = (config: typeof planetConfigs.Earth, lightAngle: number = 315) => {
  const lightX = 30 + Math.cos(lightAngle * Math.PI / 180) * 20;
  const lightY = 30 + Math.sin(lightAngle * Math.PI / 180) * 20;
  
  return `
    radial-gradient(circle at ${lightX}% ${lightY}%, ${config.highlightColor} 0%, transparent 35%),
    radial-gradient(circle at ${100 - lightX}% ${100 - lightY}%, ${config.shadowColor} 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, ${config.baseColor} 0%, ${config.shadowColor} 100%)
  `;
};

const generateSurfaceDetails = (pattern: string | undefined, baseColor: string) => {
  switch (pattern) {
    case 'bands':
      return `
        repeating-linear-gradient(
          180deg,
          transparent 0px,
          rgba(255,255,255,0.08) 2px,
          rgba(0,0,0,0.08) 4px,
          transparent 6px,
          rgba(200,150,100,0.1) 8px,
          transparent 10px
        )
      `;
    case 'continents':
      return `
        radial-gradient(ellipse 35% 20% at 30% 45%, #2d5a27 0%, transparent 100%),
        radial-gradient(ellipse 25% 15% at 55% 35%, #3d6a37 0%, transparent 100%),
        radial-gradient(ellipse 20% 25% at 70% 55%, #2d5a27 0%, transparent 100%),
        radial-gradient(ellipse 15% 10% at 45% 65%, #4a7a47 0%, transparent 100%)
      `;
    case 'craters':
      return `
        radial-gradient(circle at 25% 30%, rgba(0,0,0,0.3) 0%, transparent 8%),
        radial-gradient(circle at 60% 45%, rgba(0,0,0,0.25) 0%, transparent 6%),
        radial-gradient(circle at 40% 70%, rgba(0,0,0,0.2) 0%, transparent 10%),
        radial-gradient(circle at 75% 25%, rgba(0,0,0,0.15) 0%, transparent 5%)
      `;
    case 'dust':
      return `
        radial-gradient(circle at 40% 50%, rgba(100,50,20,0.3) 0%, transparent 30%),
        radial-gradient(circle at 70% 40%, rgba(80,40,15,0.2) 0%, transparent 25%)
      `;
    case 'storms':
      return `
        radial-gradient(ellipse 20% 15% at 60% 50%, rgba(255,255,255,0.3) 0%, transparent 100%),
        radial-gradient(circle at 30% 40%, rgba(100,150,255,0.2) 0%, transparent 20%)
      `;
    case 'swirl':
      return `
        conic-gradient(from 45deg at 50% 50%, 
          transparent 0deg, 
          rgba(255,200,100,0.15) 30deg, 
          transparent 60deg,
          rgba(255,180,80,0.1) 120deg,
          transparent 180deg
        )
      `;
    default:
      return 'none';
  }
};

export function Planet3D({ planetName, size, className = '' }: Planet3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const config = planetConfigs[planetName] || planetConfigs.Earth;
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 360]);
  
  const sphereLayers = useMemo(() => {
    const layers = [];
    const numLayers = 40;
    
    for (let i = 0; i < numLayers; i++) {
      const progress = i / (numLayers - 1);
      const z = Math.cos(progress * Math.PI) * (size / 2);
      const layerSize = Math.sin(progress * Math.PI) * size;
      const opacity = 0.6 + Math.sin(progress * Math.PI) * 0.4;
      
      layers.push({
        z,
        size: layerSize,
        opacity,
        offset: (progress - 0.5) * size,
      });
    }
    return layers;
  }, [size]);

  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`}
      style={{ 
        width: size, 
        height: size,
        perspective: '1500px',
        perspectiveOrigin: '50% 50%',
      }}
    >
      <motion.div
        className="absolute rounded-full"
        style={{
          width: size * 1.8,
          height: size * 1.8,
          left: '50%',
          top: '50%',
          x: '-50%',
          y: '-50%',
          background: `radial-gradient(circle, ${config.atmosphereColor} 0%, transparent 70%)`,
          filter: 'blur(30px)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute rounded-full"
        style={{
          width: size * 1.4,
          height: size * 1.4,
          left: '50%',
          top: '50%',
          x: '-50%',
          y: '-50%',
          background: `radial-gradient(circle, ${config.glowColor} 0%, transparent 60%)`,
          filter: 'blur(20px)',
        }}
      />

      <motion.div
        className="absolute"
        style={{
          width: size,
          height: size,
          transformStyle: 'preserve-3d',
          rotateY,
        }}
        animate={{
          rotateY: [0, 360],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div
          className="absolute rounded-full overflow-hidden"
          style={{
            width: '100%',
            height: '100%',
            background: generateSphereGradient(config),
            boxShadow: `
              inset -${size * 0.08}px -${size * 0.08}px ${size * 0.15}px rgba(0,0,0,0.8),
              inset ${size * 0.05}px ${size * 0.05}px ${size * 0.1}px rgba(255,255,255,0.1),
              0 0 ${size * 0.2}px ${config.glowColor},
              0 0 ${size * 0.4}px ${config.glowColor.replace('0.', '0.3')}
            `,
          }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: generateSurfaceDetails(config.surfacePattern, config.baseColor),
            }}
          />

          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: `
                radial-gradient(circle at 25% 25%, rgba(255,255,255,0.35) 0%, transparent 40%),
                radial-gradient(circle at 30% 35%, rgba(255,255,255,0.15) 0%, transparent 20%)
              `,
            }}
          />

          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(135deg, transparent 30%, rgba(0,0,0,0.6) 100%)',
            }}
          />
        </div>

        {sphereLayers.slice(0, 20).map((layer, i) => (
          <div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: layer.size,
              height: layer.size,
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) translateZ(${layer.z}px)`,
              background: `radial-gradient(circle, rgba(255,255,255,${0.02 * layer.opacity}) 0%, transparent 70%)`,
              opacity: layer.opacity * 0.3,
            }}
          />
        ))}
      </motion.div>

      {config.hasRings && planetName === 'Saturn' && (
        <div 
          className="absolute"
          style={{
            width: size * 2.5,
            height: size * 2.5,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%) rotateX(75deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          {config.ringColors?.map((color, i) => {
            const ringWidth = 220 - i * 25;
            const ringHeight = 220 - i * 25;
            return (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${ringWidth}%`,
                  height: `${ringHeight}%`,
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  border: `${12 - i * 2}px solid ${color}`,
                  opacity: 0.7 - i * 0.1,
                  boxShadow: `
                    0 0 20px ${color}66,
                    inset 0 0 30px ${color}33
                  `,
                  background: i === 0 ? `
                    repeating-conic-gradient(
                      from 0deg,
                      ${color}22 0deg 2deg,
                      transparent 2deg 4deg
                    )
                  ` : 'transparent',
                }}
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 400 + i * 100,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            );
          })}

          <div
            className="absolute rounded-full"
            style={{
              width: '240%',
              height: '240%',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              background: `
                radial-gradient(ellipse, 
                  transparent 35%,
                  rgba(228, 211, 162, 0.15) 40%,
                  rgba(197, 163, 103, 0.1) 50%,
                  rgba(228, 211, 162, 0.15) 60%,
                  transparent 65%
                )
              `,
              filter: 'blur(3px)',
            }}
          />
        </div>
      )}

      {config.hasRings && planetName === 'Uranus' && (
        <div 
          className="absolute"
          style={{
            width: size * 2,
            height: size * 2,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%) rotateX(10deg) rotateZ(98deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          {config.ringColors?.map((color, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${180 - i * 20}%`,
                height: `${180 - i * 20}%`,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                border: `${4 - i}px solid ${color}`,
                opacity: 0.4 - i * 0.1,
                boxShadow: `0 0 15px ${color}44`,
              }}
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 300 + i * 50,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
      )}

      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: size,
          height: size,
          background: `
            radial-gradient(circle at 20% 20%, rgba(255,255,255,0.5) 0%, transparent 25%),
            radial-gradient(circle at 25% 30%, rgba(255,255,255,0.25) 0%, transparent 15%)
          `,
        }}
      />

      <motion.div
        className="absolute"
        style={{
          width: size * 0.15,
          height: size * 0.15,
          left: '15%',
          top: '15%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%)',
          filter: 'blur(2px)',
        }}
        animate={{
          opacity: [0.4, 0.8, 0.4],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </div>
  );
}

export default Planet3D;
