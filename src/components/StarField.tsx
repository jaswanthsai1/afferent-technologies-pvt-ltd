import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useMemo, useRef, useState, useEffect } from 'react';

interface StarFieldProps {
  count?: number;
}

const StarField = ({ count = 450 }: StarFieldProps) => {
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

  useEffect(() => {
    const layers: any[][] = [[], [], [], []];
    const starColors = [
      '#ffffff', '#fff8f0', '#ffeedd', '#aaccff', '#88bbff',
      '#ffddaa', '#ff9966', '#aaffff', '#ff88ff', '#88ffaa',
    ];

    for (let i = 0; i < count; i++) {
      const layerIndex = Math.floor(Math.random() * 4);
      const size = Math.random() * (layerIndex === 3 ? 3.5 : layerIndex === 2 ? 2.2 : 1.3) + 0.3;
      const color = starColors[Math.floor(Math.random() * starColors.length)];
      const isGiant = Math.random() > 0.96;
      const isPulsating = Math.random() > 0.85;
      
      layers[layerIndex].push({
        id: i,
        size: isGiant ? size * 2.8 : size,
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        color,
        opacity: Math.random() * 0.4 + 0.5,
        duration: isPulsating ? Math.random() * 1.8 + 0.6 : Math.random() * 8 + 4,
        delay: Math.random() * 10,
        isPulsating,
        isGiant,
      });
    }
    setStarLayers(layers);

    const dust = [...Array(120)].map((_, i) => ({
      id: `dust-${i}`,
      left: Math.random() * 100 + '%',
      top: Math.random() * 100 + '%',
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.15 + 0.05,
      duration: Math.random() * 45 + 25,
      delay: Math.random() * 20,
      color: ['#ffffff', '#aaccff', '#ffddcc', '#ff88ff', '#88ffaa'][Math.floor(Math.random() * 5)],
    }));
    setCosmicDust(dust);

    const meteors = [...Array(12)].map((_, i) => ({
      id: `meteor-${i}`,
      color: ['#ffffff', '#aaddff', '#ffcc88', '#88ffff'][i % 4],
      duration: 0.8 + Math.random() * 1.5,
      delay: Math.random() * 30 + i * 5,
      size: 100 + Math.random() * 200,
      left: Math.random() * 100 + '%',
      top: Math.random() * 60 + '%',
      rotate: -35 - Math.random() * 20,
      repeatDelay: Math.random() * 15 + 10,
    }));
    setMeteorData(meteors);
  }, [count]);

  const galaxyArms = useMemo(() => [
    { rotate: 0, color: 'rgba(139, 92, 246, 0.04)', duration: 400 },
    { rotate: 72, color: 'rgba(59, 130, 246, 0.04)', duration: 450 },
    { rotate: 144, color: 'rgba(236, 72, 153, 0.04)', duration: 500 },
    { rotate: 216, color: 'rgba(34, 211, 238, 0.04)', duration: 550 },
    { rotate: 288, color: 'rgba(168, 85, 247, 0.04)', duration: 600 },
  ], []);

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Deep Space Base */}
      <div 
        className="absolute inset-0"
        style={{ background: '#030014' }}
      />

      {/* Galaxy Core & Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: '100vw',
          height: '100vh',
          background: `
            radial-gradient(circle at center, rgba(255, 255, 255, 0.05) 0%, rgba(139, 92, 246, 0.03) 30%, transparent 70%),
            radial-gradient(circle at center, rgba(59, 130, 246, 0.02) 0%, transparent 60%)
          `,
          filter: 'blur(60px)',
        }}
      />

      {/* Rotating Galaxy Arms */}
      {mounted && galaxyArms.map((arm, i) => (
        <motion.div
          key={`arm-${i}`}
          className="absolute top-1/2 left-1/2"
          style={{
            width: '300vw',
            height: '300vh',
            marginLeft: '-150vw',
            marginTop: '-150vh',
            background: `
              conic-gradient(from ${arm.rotate}deg at 50% 50%,
                transparent 0deg,
                ${arm.color} 20deg,
                transparent 40deg,
                transparent 360deg
              )
            `,
            filter: 'blur(100px)',
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: arm.duration, repeat: Infinity, ease: "linear" }}
        />
      ))}

      {/* Nebulae Layers */}
      <div className="absolute inset-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-purple-900/10 blur-[120px]" />
        <div className="absolute top-[40%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[55%] h-[55%] rounded-full bg-indigo-900/10 blur-[130px]" />
      </div>

      {/* Star Layers with Parallax */}
      <motion.div style={{ y: layer4Y }} className="absolute inset-0">
        {mounted && starLayers[3].map((star) => <StarItem key={`s4-${star.id}`} {...star} isGiant={true} />)}
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

      {/* Cosmic Dust Particles */}
      {mounted && cosmicDust.map((dust) => (
        <motion.div
          key={dust.id}
          className="absolute rounded-full"
          style={{
            width: dust.size + 'px',
            height: dust.size + 'px',
            left: dust.left,
            top: dust.top,
            background: dust.color,
            opacity: dust.opacity,
            filter: 'blur(1px)',
          }}
          animate={{
            x: [0, 50, -50, 0],
            y: [0, 30, -30, 0],
            opacity: [dust.opacity, dust.opacity * 2, dust.opacity],
          }}
          transition={{
            duration: dust.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Meteors */}
      {mounted && meteorData.map((meteor) => (
        <motion.div
          key={meteor.id}
          className="absolute h-[1px]"
          style={{
            width: `${meteor.size}px`,
            left: meteor.left,
            top: meteor.top,
            transform: `rotate(${meteor.rotate}deg)`,
            background: `linear-gradient(90deg, transparent, ${meteor.color}, white)`,
            boxShadow: `0 0 10px ${meteor.color}`,
          }}
          animate={{
            x: [0, -1000],
            y: [0, 700],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: meteor.duration,
            repeat: Infinity,
            repeatDelay: meteor.repeatDelay,
            delay: meteor.delay,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

const StarItem = ({ size, left, top, color, opacity, duration, delay, isPulsating, isGiant }: any) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: size + 'px',
      height: size + 'px',
      left,
      top,
      background: color,
      boxShadow: isGiant ? `0 0 ${size * 4}px ${color}` : 'none',
    }}
    animate={{
      opacity: [opacity, opacity * 0.3, opacity],
      scale: isPulsating ? [1, 1.5, 1] : [1, 1.1, 1],
    }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
  />
);

export default StarField;
