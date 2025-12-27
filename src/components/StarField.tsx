import { motion, useScroll, useTransform } from 'framer-motion';
import { useMemo, useRef, useState, useEffect } from 'react';

interface StarFieldProps {
  count?: number;
}

const AirshipItem = ({ left, top, size, duration, delay, color, type, driftX }: any) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left, top, width: size, height: size / 2 }}
    initial={{ x: -driftX, opacity: 0 }}
    animate={{ x: driftX, opacity: [0, 1, 1, 0] }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: "linear",
    }}
  >
    <div 
      className="absolute inset-0 rounded-full"
      style={{
        background: `linear-gradient(90deg, transparent, ${color} 50%, transparent)`,
        boxShadow: `0 0 15px ${color}`,
        clipPath: type === 0 
          ? 'polygon(0 50%, 20% 0, 80% 0, 100% 50%, 80% 100%, 20% 100%)'
          : type === 1
          ? 'polygon(0 0, 100% 50%, 0 100%, 20% 50%)'
          : 'polygon(10% 0, 90% 0, 100% 100%, 0 100%)'
      }}
    />
    <motion.div
      className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
      style={{ background: 'cyan', filter: 'blur(4px)' }}
      animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.5, 1] }}
      transition={{ duration: 0.2, repeat: Infinity }}
    />
  </motion.div>
);

const SatelliteItem = ({ left, top, size, duration, delay }: any) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left, top, width: size, height: size }}
    animate={{
      rotate: [0, 360],
      x: [0, 100, 0],
      y: [0, -50, 0],
    }}
    transition={{
      rotate: { duration: 120, repeat: Infinity, ease: "linear" },
      x: { duration: duration, repeat: Infinity, ease: "easeInOut" },
      y: { duration: duration * 1.2, repeat: Infinity, ease: "easeInOut" },
      delay,
    }}
  >
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-slate-400 rounded-sm shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
    <div className="absolute top-1/2 left-0 w-full h-1/6 bg-blue-900/80 -translate-y-1/2 rounded-sm border border-blue-400/30" />
    <motion.div 
      className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-1/2 bg-slate-300"
      animate={{ height: [size/2, size/1.5, size/2] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.div 
      className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full"
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 1, repeat: Infinity }}
    />
  </motion.div>
);

const StarItem = ({ size, left, top, color, opacity, duration, delay, isPulsating, isGiant, hasRays }: any) => (
  <motion.div
    className="absolute"
    style={{
      width: size + 'px',
      height: size + 'px',
      left,
      top,
    }}
    animate={{
      opacity: [opacity, opacity * 0.4, opacity],
      scale: isPulsating ? [1, 1.5, 1] : [1, 1.15, 1],
    }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
  >
    <div 
      className="absolute inset-0 rounded-full"
      style={{
        background: `radial-gradient(circle, white 0%, ${color} 50%, transparent 100%)`,
        boxShadow: isGiant 
          ? `0 0 ${size * 2}px ${color}, 0 0 ${size * 4}px ${color}50, 0 0 ${size * 6}px ${color}30`
          : `0 0 ${size}px ${color}80`,
      }}
    />
    {hasRays && (
      <>
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: size * 6,
            height: 1,
            background: `linear-gradient(90deg, transparent, ${color}80, white, ${color}80, transparent)`,
          }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: 1,
            height: size * 6,
            background: `linear-gradient(180deg, transparent, ${color}80, white, ${color}80, transparent)`,
          }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: size * 4,
            height: 1,
            background: `linear-gradient(90deg, transparent, ${color}60, white, ${color}60, transparent)`,
            transform: 'rotate(45deg)',
          }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: size * 4,
            height: 1,
            background: `linear-gradient(90deg, transparent, ${color}60, white, ${color}60, transparent)`,
            transform: 'rotate(-45deg)',
          }}
        />
      </>
    )}
  </motion.div>
);

const StarField = ({ count = 600 }: StarFieldProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const layer1Y = useTransform(scrollY, [0, 2000], [0, -150]);
  const layer2Y = useTransform(scrollY, [0, 2000], [0, -300]);
  const layer3Y = useTransform(scrollY, [0, 2000], [0, -450]);
  const layer4Y = useTransform(scrollY, [0, 2000], [0, -75]);

  const [starLayers, setStarLayers] = useState<any[][]>([[], [], [], []]);
  const [cosmicDust, setCosmicDust] = useState<any[]>([]);
  const [meteorData, setMeteorData] = useState<any[]>([]);
  const [starClusters, setStarClusters] = useState<any[]>([]);
  const [airships, setAirships] = useState<any[]>([]);
  const [satellites, setSatellites] = useState<any[]>([]);

  useEffect(() => {
    const layers: any[][] = [[], [], [], []];
    const starColors = [
      '#ffffff', '#fff8f0', '#ffeedd', '#aaccff', '#88bbff',
      '#ffddaa', '#ff9966', '#aaffff', '#ff88ff', '#88ffaa',
      '#ffe4b5', '#add8e6', '#dda0dd', '#98fb98',
    ];

    for (let i = 0; i < count; i++) {
      const layerIndex = Math.floor(Math.random() * 4);
      const size = Math.random() * (layerIndex === 3 ? 4 : layerIndex === 2 ? 2.5 : 1.5) + 0.4;
      const color = starColors[Math.floor(Math.random() * starColors.length)];
      const isGiant = Math.random() > 0.94;
      const isPulsating = Math.random() > 0.8;
      const hasRays = isGiant && Math.random() > 0.5;
      
      layers[layerIndex].push({
        id: i,
        size: isGiant ? size * 3.5 : size,
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        color,
        opacity: Math.random() * 0.4 + 0.5,
        duration: isPulsating ? Math.random() * 2 + 0.8 : Math.random() * 10 + 5,
        delay: Math.random() * 10,
        isPulsating,
        isGiant,
        hasRays,
      });
    }
    setStarLayers(layers);

    const dust = [...Array(200)].map((_, i) => ({
      id: `dust-${i}`,
      left: Math.random() * 100 + '%',
      top: Math.random() * 100 + '%',
      size: Math.random() * 4 + 1,
      opacity: Math.random() * 0.2 + 0.05,
      duration: Math.random() * 60 + 30,
      delay: Math.random() * 20,
      color: ['#ffffff', '#aaccff', '#ffddcc', '#ff88ff', '#88ffaa', '#ffcc99'][Math.floor(Math.random() * 6)],
      driftX: (Math.random() - 0.5) * 200,
      driftY: (Math.random() - 0.5) * 200,
    }));
    setCosmicDust(dust);

    const meteors = [...Array(20)].map((_, i) => ({
      id: `meteor-${i}`,
      color: ['#ffffff', '#aaddff', '#ffcc88', '#88ffff', '#ff88dd', '#88ff88'][i % 6],
      duration: 0.6 + Math.random() * 1.2,
      delay: Math.random() * 40 + i * 3,
      size: 120 + Math.random() * 280,
      left: Math.random() * 120 - 10 + '%',
      top: Math.random() * 50 + '%',
      rotate: -25 - Math.random() * 30,
      repeatDelay: Math.random() * 20 + 15,
    }));
    setMeteorData(meteors);

    const clusters = [...Array(8)].map((_, i) => ({
      id: `cluster-${i}`,
      left: Math.random() * 80 + 10 + '%',
      top: Math.random() * 80 + 10 + '%',
      size: 80 + Math.random() * 150,
      stars: Math.floor(Math.random() * 20) + 15,
      color: ['#8b5cf6', '#3b82f6', '#ec4899', '#22d3ee', '#a855f7', '#f97316'][i % 6],
      rotation: Math.random() * 360,
      duration: 200 + Math.random() * 200,
    }));
    setStarClusters(clusters);

    const ships = [...Array(12)].map((_, i) => ({
      id: `ship-${i}`,
      left: Math.random() * 120 - 10 + '%',
      top: Math.random() * 100 + '%',
      size: Math.random() * 40 + 20,
      duration: Math.random() * 40 + 30,
      delay: Math.random() * 20,
      color: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][i % 5],
      type: Math.floor(Math.random() * 3),
      driftX: Math.random() > 0.5 ? 2000 : -2000,
    }));
    setAirships(ships);

    const sats = [...Array(15)].map((_, i) => ({
      id: `sat-${i}`,
      left: Math.random() * 100 + '%',
      top: Math.random() * 100 + '%',
      size: Math.random() * 15 + 10,
      duration: Math.random() * 100 + 80,
      delay: Math.random() * 10,
    }));
    setSatellites(sats);
  }, [count]);

  const galaxyArms = useMemo(() => [
    { rotate: 0, color1: 'rgba(139, 92, 246, 0.08)', color2: 'rgba(59, 130, 246, 0.05)', duration: 350 },
    { rotate: 60, color1: 'rgba(236, 72, 153, 0.07)', color2: 'rgba(168, 85, 247, 0.04)', duration: 400 },
    { rotate: 120, color1: 'rgba(34, 211, 238, 0.08)', color2: 'rgba(59, 130, 246, 0.05)', duration: 450 },
    { rotate: 180, color1: 'rgba(249, 115, 22, 0.06)', color2: 'rgba(236, 72, 153, 0.04)', duration: 500 },
    { rotate: 240, color1: 'rgba(139, 92, 246, 0.07)', color2: 'rgba(34, 211, 238, 0.04)', duration: 550 },
    { rotate: 300, color1: 'rgba(168, 85, 247, 0.08)', color2: 'rgba(249, 115, 22, 0.05)', duration: 600 },
  ], []);

  const nebulaeClouds = useMemo(() => [
    { x: '15%', y: '20%', w: 800, h: 600, color: '#8b5cf6', opacity: 0.12, blur: 150, duration: 40 },
    { x: '70%', y: '15%', w: 700, h: 500, color: '#3b82f6', opacity: 0.1, blur: 130, duration: 45 },
    { x: '25%', y: '60%', w: 900, h: 700, color: '#ec4899', opacity: 0.08, blur: 180, duration: 50 },
    { x: '80%', y: '55%', w: 600, h: 600, color: '#22d3ee', opacity: 0.1, blur: 140, duration: 35 },
    { x: '50%', y: '40%', w: 1000, h: 800, color: '#a855f7', opacity: 0.06, blur: 200, duration: 55 },
    { x: '10%', y: '80%', w: 750, h: 550, color: '#f97316', opacity: 0.07, blur: 160, duration: 42 },
    { x: '60%', y: '75%', w: 650, h: 500, color: '#06b6d4', opacity: 0.09, blur: 145, duration: 48 },
  ], []);

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div 
        className="absolute inset-0"
        style={{ 
          background: `
            radial-gradient(ellipse 150% 100% at 50% 0%, #0a0520 0%, #030014 50%, #010008 100%),
            linear-gradient(180deg, #050020 0%, #020010 50%, #000005 100%)
          `
        }}
      />

      <div className="absolute inset-0" style={{ opacity: 0.4 }}>
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 30% 30%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
              radial-gradient(ellipse 60% 40% at 70% 60%, rgba(59, 130, 246, 0.12) 0%, transparent 50%),
              radial-gradient(ellipse 70% 45% at 20% 70%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      {mounted && (
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            width: '120vw',
            height: '120vh',
            background: `
              radial-gradient(circle at center, 
                rgba(255, 255, 255, 0.15) 0%, 
                rgba(200, 180, 255, 0.1) 5%,
                rgba(139, 92, 246, 0.08) 15%, 
                rgba(59, 130, 246, 0.05) 30%,
                rgba(168, 85, 247, 0.03) 50%,
                transparent 70%
              )
            `,
            filter: 'blur(40px)',
          }}
        />
      )}

      {mounted && (
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            width: '30vw',
            height: '30vh',
            background: `
              radial-gradient(circle at center, 
                rgba(255, 255, 255, 0.5) 0%, 
                rgba(255, 240, 230, 0.3) 20%,
                rgba(200, 180, 255, 0.15) 40%,
                transparent 70%
              )
            `,
            filter: 'blur(30px)',
          }}
        />
      )}

      {mounted && galaxyArms.map((arm, i) => (
        <motion.div
          key={`arm-${i}`}
          className="absolute top-1/2 left-1/2"
          style={{
            width: '400vw',
            height: '400vh',
            marginLeft: '-200vw',
            marginTop: '-200vh',
            background: `
              conic-gradient(from ${arm.rotate}deg at 50% 50%,
                transparent 0deg,
                ${arm.color1} 15deg,
                ${arm.color2} 30deg,
                transparent 50deg,
                transparent 360deg
              )
            `,
            filter: 'blur(80px)',
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: arm.duration, repeat: Infinity, ease: "linear" }}
        />
      ))}

      {mounted && (
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '300vw',
            height: '300vh',
            background: `
              conic-gradient(from 45deg at 50% 50%,
                transparent 0deg,
                rgba(139, 92, 246, 0.03) 30deg,
                transparent 60deg,
                rgba(59, 130, 246, 0.03) 90deg,
                transparent 120deg,
                rgba(236, 72, 153, 0.03) 150deg,
                transparent 180deg,
                rgba(34, 211, 238, 0.03) 210deg,
                transparent 240deg,
                rgba(168, 85, 247, 0.03) 270deg,
                transparent 300deg,
                rgba(249, 115, 22, 0.03) 330deg,
                transparent 360deg
              )
            `,
            filter: 'blur(60px)',
          }}
          animate={{ rotate: [0, -360] }}
          transition={{ duration: 800, repeat: Infinity, ease: "linear" }}
        />
      )}

      {mounted && nebulaeClouds.map((nebula, i) => (
        <motion.div
          key={`nebula-${i}`}
          className="absolute rounded-full"
          style={{
            left: nebula.x,
            top: nebula.y,
            width: nebula.w,
            height: nebula.h,
            background: `radial-gradient(ellipse at center, ${nebula.color} 0%, transparent 70%)`,
            opacity: nebula.opacity,
            filter: `blur(${nebula.blur}px)`,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [nebula.opacity, nebula.opacity * 1.5, nebula.opacity],
            x: [0, 30, -30, 0],
            y: [0, -20, 20, 0],
          }}
          transition={{
            duration: nebula.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {mounted && starClusters.map((cluster) => (
        <motion.div
          key={cluster.id}
          className="absolute"
          style={{
            left: cluster.left,
            top: cluster.top,
            width: cluster.size,
            height: cluster.size,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: cluster.duration, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(cluster.stars)].map((_, j) => {
            const angle = (j / cluster.stars) * Math.PI * 2;
            const radius = (Math.random() * 0.4 + 0.1) * cluster.size / 2;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            return (
              <motion.div
                key={j}
                className="absolute rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  width: Math.random() * 2 + 1,
                  height: Math.random() * 2 + 1,
                  background: cluster.color,
                  boxShadow: `0 0 ${Math.random() * 4 + 2}px ${cluster.color}`,
                  transform: `translate(${x}px, ${y}px)`,
                }}
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            );
          })}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: cluster.size * 0.8,
              height: cluster.size * 0.8,
              background: `radial-gradient(circle, ${cluster.color}20 0%, transparent 70%)`,
              filter: 'blur(10px)',
            }}
          />
        </motion.div>
      ))}

      <motion.div style={{ y: layer4Y }} className="absolute inset-0">
        {mounted && starLayers[3].map((star) => <StarItem key={`s4-${star.id}`} {...star} />)}
      </motion.div>
      <motion.div style={{ y: layer1Y }} className="absolute inset-0">
        {mounted && starLayers[0].map((star) => <StarItem key={`s1-${star.id}`} {...star} />)}
      </motion.div>
      <motion.div style={{ y: layer2Y }} className="absolute inset-0">
        {mounted && starLayers[1].map((star) => <StarItem key={`s2-${star.id}`} {...star} />)}
      </motion.div>
      <motion.div style={{ y: layer3Y }} className="absolute inset-0">
        {mounted && starLayers[2].map((star) => <StarItem key={`s3-${star.id}`} {...star} />)}
      </motion.div>

      {mounted && cosmicDust.map((dust) => (
        <motion.div
          key={dust.id}
          className="absolute rounded-full"
          style={{
            width: dust.size + 'px',
            height: dust.size + 'px',
            left: dust.left,
            top: dust.top,
            background: `radial-gradient(circle, ${dust.color} 0%, transparent 70%)`,
            opacity: dust.opacity,
          }}
          animate={{
            x: [0, dust.driftX, -dust.driftX / 2, 0],
            y: [0, dust.driftY, -dust.driftY / 2, 0],
            opacity: [dust.opacity, dust.opacity * 2, dust.opacity * 0.5, dust.opacity],
            scale: [1, 1.5, 0.8, 1],
          }}
          transition={{
            duration: dust.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {mounted && meteorData.map((meteor) => (
        <motion.div
          key={meteor.id}
          className="absolute"
          style={{
            left: meteor.left,
            top: meteor.top,
            width: `${meteor.size}px`,
            height: '2px',
            transform: `rotate(${meteor.rotate}deg)`,
            transformOrigin: 'left center',
          }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scaleX: [0, 1, 1, 0],
            x: [0, -meteor.size * 2],
            y: [0, meteor.size * 1.2],
          }}
          transition={{
            duration: meteor.duration,
            repeat: Infinity,
            repeatDelay: meteor.repeatDelay,
            delay: meteor.delay,
            ease: "easeOut"
          }}
        >
          <motion.div
            className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: 6,
              height: 6,
              background: 'white',
              boxShadow: `0 0 10px white, 0 0 20px ${meteor.color}, 0 0 40px ${meteor.color}`,
            }}
          />
          <div
            style={{
              width: '100%',
              height: '100%',
              background: `linear-gradient(90deg, transparent 0%, ${meteor.color}40 30%, ${meteor.color} 70%, white 100%)`,
              filter: 'blur(1px)',
            }}
          />
        </motion.div>
      ))}

      {mounted && [...Array(15)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
            background: `radial-gradient(circle, ${
              ['rgba(139, 92, 246, 0.1)', 'rgba(59, 130, 246, 0.1)', 'rgba(236, 72, 153, 0.08)', 'rgba(34, 211, 238, 0.1)'][i % 4]
            } 0%, transparent 70%)`,
            filter: 'blur(20px)',
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 20 + Math.random() * 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 10,
          }}
        />
      ))}

      {mounted && [...Array(5)].map((_, i) => (
        <motion.div
          key={`wave-${i}`}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
          style={{
            borderColor: ['rgba(139, 92, 246, 0.15)', 'rgba(59, 130, 246, 0.12)', 'rgba(236, 72, 153, 0.1)', 'rgba(34, 211, 238, 0.15)', 'rgba(168, 85, 247, 0.12)'][i],
            borderWidth: 1,
          }}
          initial={{ width: 100, height: 100, opacity: 0 }}
          animate={{
            width: [100, 2000],
            height: [100, 2000],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            delay: i * 3,
            ease: "easeOut",
          }}
        />
      ))}

      {mounted && airships.map((ship) => (
        <AirshipItem key={ship.id} {...ship} />
      ))}

      {mounted && satellites.map((sat) => (
        <SatelliteItem key={sat.id} {...sat} />
      ))}

      {mounted && [...Array(8)].map((_, i) => (
        <motion.div
          key={`stream-${i}`}
          className="absolute h-[1px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
          style={{
            width: '100%',
            left: 0,
            top: (i * 15) + 5 + '%',
          }}
          animate={{
            x: ['-100%', '100%'],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 20,
            ease: "linear",
          }}
        />
      ))}

      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
          opacity: 0.5,
        }}
      />
    </div>
  );
};

export default StarField;
