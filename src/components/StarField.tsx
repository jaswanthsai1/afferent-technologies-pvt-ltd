import { motion, useScroll, useTransform } from 'framer-motion';
import { useMemo, useRef, useState, useEffect } from 'react';

interface StarFieldProps {
  count?: number;
}

interface StarItemProps {
  size: number;
  left: string | number;
  top: string | number;
  color: string;
  opacity: number;
  duration: number;
  delay: number;
  isPulsating: boolean;
  isGiant: boolean;
  hasRays: boolean;
  id?: number | string;
}

interface CosmicDust {
  id: string;
  left: string | number;
  top: string | number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  color: string;
  driftX: number;
  driftY: number;
}

interface StarCluster {
  id: string;
  left: string;
  top: string;
  size: number;
  stars: number;
  color: string;
  rotation: number;
  duration: number;
}

const StarItem = ({ size, left, top, color, opacity, duration, delay, isPulsating, isGiant, hasRays }: StarItemProps) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <motion.div
      className="absolute"
      style={{
        width: size + 'px',
        height: size + 'px',
        left,
        top,
        willChange: 'transform, opacity',
      }}
      animate={{
        opacity: [opacity, opacity * 0.4, opacity],
        scale: isPulsating ? [1, 1.5, 1] : [1, 1.05, 1],
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
          boxShadow: isGiant && !isMobile
            ? `0 0 ${size * 2}px ${color}, 0 0 ${size * 4}px ${color}50`
            : isGiant ? `0 0 ${size}px ${color}` : 'none',
        }}
      />
      {hasRays && !isMobile && (
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
        </>
      )}
    </motion.div>
  );
};

const StarField = ({ count = 300 }: StarFieldProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);
  }, []);

  const layer1Y = useTransform(scrollY, [0, 2000], [0, -80]);
  const layer2Y = useTransform(scrollY, [0, 2000], [0, -160]);
  const layer3Y = useTransform(scrollY, [0, 2000], [0, -240]);
  const layer4Y = useTransform(scrollY, [0, 2000], [0, -40]);

  const [starLayers, setStarLayers] = useState<StarItemProps[][]>([[], [], [], []]);
  const [cosmicDust, setCosmicDust] = useState<CosmicDust[]>([]);
  const [starClusters, setStarClusters] = useState<StarCluster[]>([]);

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    const finalCount = mobile ? Math.min(count, 40) : count;

    const layers: StarItemProps[][] = [[], [], [], []];
    const starColors = [
      '#ffffff', '#fff8f0', '#ffeedd', '#aaccff', '#88bbff',
      '#ffddaa', '#ff9966', '#aaffff', '#ff88ff', '#88ffaa',
    ];

    for (let i = 0; i < finalCount; i++) {
      const layerIndex = Math.floor(Math.random() * 4);
      const size = Math.random() * (layerIndex === 3 ? 3 : layerIndex === 2 ? 2 : 1.2) + 0.4;
      const color = starColors[Math.floor(Math.random() * starColors.length)];
      const isGiant = Math.random() > 0.95;
      const isPulsating = Math.random() > 0.85;
      const hasRays = isGiant && !mobile && Math.random() > 0.7;

      layers[layerIndex].push({
        id: i,
        size: isGiant ? size * 2.5 : size,
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        color,
        opacity: Math.random() * 0.4 + 0.5,
        duration: isPulsating ? Math.random() * 2 + 1 : Math.random() * 10 + 8,
        delay: Math.random() * 5,
        isPulsating,
        isGiant,
        hasRays,
      });
    }
    setStarLayers(layers);

    const dustCount = mobile ? 10 : 120;
    const dust = [...Array(dustCount)].map((_, i) => ({
      id: `dust-${i}`,
      left: Math.random() * 100 + '%',
      top: Math.random() * 100 + '%',
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.15 + 0.05,
      duration: Math.random() * 60 + 40,
      delay: Math.random() * 10,
      color: ['#ffffff', '#aaccff', '#ffddcc', '#ff88ff'][Math.floor(Math.random() * 4)],
      driftX: (Math.random() - 0.5) * 100,
      driftY: (Math.random() - 0.5) * 100,
    }));
    setCosmicDust(dust);

    const clusterCount = mobile ? 1 : 6;
    const clusters = [...Array(clusterCount)].map((_, i) => ({
      id: `cluster-${i}`,
      left: Math.random() * 80 + 10 + '%',
      top: Math.random() * 80 + 10 + '%',
      size: 60 + Math.random() * 100,
      stars: mobile ? 5 : 20,
      color: ['#8b5cf6', '#3b82f6', '#ec4899', '#22d3ee'][i % 4],
      rotation: Math.random() * 360,
      duration: 300 + Math.random() * 200,
    }));
    setStarClusters(clusters);
  }, [count]);


  const galaxyArms = useMemo(() => [
    { rotate: 0, color1: 'rgba(139, 92, 246, 0.05)', color2: 'rgba(59, 130, 246, 0.03)', duration: 400 },
    { rotate: 120, color1: 'rgba(34, 211, 238, 0.05)', color2: 'rgba(59, 130, 246, 0.03)', duration: 500 },
    { rotate: 240, color1: 'rgba(168, 85, 247, 0.05)', color2: 'rgba(249, 115, 22, 0.03)', duration: 600 },
  ], []);

  const nebulaeClouds = useMemo(() => {
    const mobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const clouds = [
      { x: '15%', y: '20%', w: 600, h: 400, color: '#8b5cf6', opacity: 0.08, blur: 100, duration: 45 },
      { x: '75%', y: '25%', w: 500, h: 400, color: '#3b82f6', opacity: 0.07, blur: 100, duration: 50 },
      { x: '50%', y: '60%', w: 800, h: 600, color: '#ec4899', opacity: 0.06, blur: 150, duration: 60 },
    ];
    return mobile ? clouds.slice(0, 2) : clouds;
  }, []);

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

      {mounted && !isMobile && galaxyArms.map((arm, i) => (
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

      {mounted && !isMobile && (
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

      {mounted && [...Array(15)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
            background: `radial-gradient(circle, ${['rgba(139, 92, 246, 0.1)', 'rgba(59, 130, 246, 0.1)', 'rgba(236, 72, 153, 0.08)', 'rgba(34, 211, 238, 0.1)'][i % 4]
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
