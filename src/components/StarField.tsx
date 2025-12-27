import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useMemo, useRef, useState, useEffect } from 'react';

interface StarFieldProps {
  count?: number;
}

const StarField = ({ count = 400 }: StarFieldProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const layer1Y = useTransform(scrollY, [0, 2000], [0, -200]);
  const layer2Y = useTransform(scrollY, [0, 2000], [0, -400]);
  const layer3Y = useTransform(scrollY, [0, 2000], [0, -600]);
  const layer4Y = useTransform(scrollY, [0, 2000], [0, -100]);

  const [starLayers, setStarLayers] = useState<any[][]>([[], [], [], []]);
  const [cosmicDust, setCosmicDust] = useState<any[]>([]);
  const [meteorData, setMeteorData] = useState<any[]>([]);
  const [gridLines, setGridLines] = useState<any[]>([]);

  useEffect(() => {
    const layers: any[][] = [[], [], [], []];
    const starColors = [
      '#ffffff',
      '#fff8f0',
      '#ffeedd',
      '#aaccff',
      '#88bbff',
      '#ffddaa',
      '#ff9966',
      '#aaffff',
      '#ff88ff',
      '#88ffaa',
    ];

    for (let i = 0; i < count; i++) {
      const layerIndex = Math.floor(Math.random() * 4);
      const size = Math.random() * (layerIndex === 3 ? 4 : layerIndex === 2 ? 2.5 : 1.5) + 0.3;
      const color = starColors[Math.floor(Math.random() * starColors.length)];
      const isGiant = Math.random() > 0.95;
      const isPulsating = Math.random() > 0.8;
      
      layers[layerIndex].push({
        id: i,
        size: isGiant ? size * 2.5 : size,
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        color,
        opacity: Math.random() * 0.5 + 0.5,
        duration: isPulsating ? Math.random() * 1.5 + 0.5 : Math.random() * 6 + 4,
        delay: Math.random() * 8,
        isPulsating,
        isGiant,
      });
    }
    setStarLayers(layers);

    const dust = [...Array(100)].map((_, i) => ({
      id: `dust-${i}`,
      left: Math.random() * 100 + '%',
      top: Math.random() * 100 + '%',
      size: Math.random() * 4 + 1,
      opacity: Math.random() * 0.2 + 0.05,
      duration: Math.random() * 40 + 20,
      delay: Math.random() * 15,
      color: ['#ffffff', '#aaccff', '#ffddcc', '#ff88ff', '#88ffaa'][Math.floor(Math.random() * 5)],
    }));
    setCosmicDust(dust);

    const meteors = [...Array(15)].map((_, i) => {
      const isComet = i < 4;
      const meteorColors = ['#ffffff', '#aaddff', '#ffcc88', '#88ffff', '#ff88ff'];
      const color = isComet ? '#66ddff' : meteorColors[i % meteorColors.length];
      
      return {
        id: `meteor-${i}`,
        isComet,
        color,
        duration: isComet ? 4 + Math.random() * 3 : 0.8 + Math.random() * 1.2,
        delay: Math.random() * 40 + i * 3,
        size: isComet ? 400 + Math.random() * 300 : 150 + Math.random() * 150,
        left: Math.random() * 100 + '%',
        top: Math.random() * 70 + '%',
        rotate: -30 - Math.random() * 25,
        repeatDelay: Math.random() * 20 + 15,
      };
    });
    setMeteorData(meteors);

    const lines = [...Array(20)].map((_, i) => ({
      id: `grid-${i}`,
      isVertical: i < 10,
      position: (i % 10) * 10 + 5,
      opacity: Math.random() * 0.02 + 0.01,
      delay: Math.random() * 5,
    }));
    setGridLines(lines);
  }, [count]);

  const nebulae = useMemo(() => [
    {
      colors: ['rgba(139, 92, 246, 0.12)', 'rgba(59, 130, 246, 0.08)', 'transparent'],
      width: '200vw',
      height: '180vh',
      left: '-50%',
      top: '-40%',
      duration: 100,
      blur: 150,
    },
    {
      colors: ['rgba(236, 72, 153, 0.1)', 'rgba(168, 85, 247, 0.06)', 'transparent'],
      width: '180vw',
      height: '160vh',
      left: '30%',
      top: '0%',
      duration: 130,
      blur: 180,
    },
    {
      colors: ['rgba(34, 211, 238, 0.08)', 'rgba(59, 130, 246, 0.05)', 'transparent'],
      width: '220vw',
      height: '200vh',
      left: '-70%',
      top: '20%',
      duration: 160,
      blur: 200,
    },
    {
      colors: ['rgba(251, 146, 60, 0.06)', 'rgba(239, 68, 68, 0.04)', 'transparent'],
      width: '160vw',
      height: '140vh',
      left: '60%',
      top: '-30%',
      duration: 180,
      blur: 120,
    },
    {
      colors: ['rgba(52, 211, 153, 0.06)', 'rgba(16, 185, 129, 0.04)', 'transparent'],
      width: '150vw',
      height: '130vh',
      left: '-20%',
      top: '60%',
      duration: 200,
      blur: 160,
    },
  ], []);

  const galaxyArms = useMemo(() => [
    { rotate: 0, scale: 1, opacity: 0.04 },
    { rotate: 60, scale: 0.9, opacity: 0.03 },
    { rotate: 120, scale: 1.1, opacity: 0.025 },
    { rotate: 180, scale: 0.95, opacity: 0.03 },
    { rotate: 240, scale: 1.05, opacity: 0.025 },
    { rotate: 300, scale: 1, opacity: 0.02 },
  ], []);

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 100% 100% at 50% 50%, #050015 0%, #020010 50%, #000008 100%)
          `,
        }}
      />

      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 150% 100% at 50% 0%, rgba(30, 27, 75, 0.5) 0%, transparent 50%),
            radial-gradient(ellipse 100% 150% at 100% 50%, rgba(88, 28, 135, 0.2) 0%, transparent 50%),
            radial-gradient(ellipse 100% 150% at 0% 50%, rgba(30, 58, 138, 0.2) 0%, transparent 50%),
            radial-gradient(ellipse 120% 80% at 50% 100%, rgba(17, 24, 39, 0.9) 0%, transparent 50%)
          `,
        }}
      />

      {mounted && gridLines.map((line) => (
        <motion.div
          key={line.id}
          className="absolute"
          style={{
            ...(line.isVertical 
              ? { left: `${line.position}%`, top: 0, width: '1px', height: '100%' }
              : { top: `${line.position}%`, left: 0, height: '1px', width: '100%' }
            ),
            background: line.isVertical
              ? `linear-gradient(180deg, transparent 0%, rgba(139, 92, 246, ${line.opacity}) 20%, rgba(59, 130, 246, ${line.opacity}) 50%, rgba(139, 92, 246, ${line.opacity}) 80%, transparent 100%)`
              : `linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, ${line.opacity}) 20%, rgba(59, 130, 246, ${line.opacity}) 50%, rgba(139, 92, 246, ${line.opacity}) 80%, transparent 100%)`,
          }}
          animate={{
            opacity: [line.opacity, line.opacity * 2, line.opacity],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: line.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {mounted && (
        <motion.div 
          className="absolute"
          style={{
            width: '300vw',
            height: '300vh',
            left: '-100%',
            top: '-100%',
            background: `
              conic-gradient(from 0deg at 50% 50%, 
                transparent 0deg, 
                rgba(139, 92, 246, 0.02) 20deg, 
                transparent 40deg,
                rgba(59, 130, 246, 0.015) 60deg,
                transparent 80deg,
                rgba(236, 72, 153, 0.015) 100deg,
                transparent 120deg,
                rgba(34, 211, 238, 0.02) 140deg,
                transparent 160deg,
                rgba(168, 85, 247, 0.015) 180deg,
                transparent 200deg,
                rgba(251, 146, 60, 0.015) 220deg,
                transparent 240deg,
                rgba(52, 211, 153, 0.015) 260deg,
                transparent 280deg,
                rgba(255, 100, 150, 0.015) 300deg,
                transparent 320deg,
                rgba(100, 200, 255, 0.015) 340deg,
                transparent 360deg
              )
            `,
            filter: 'blur(80px)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 500, repeat: Infinity, ease: "linear" }}
        />
      )}

      {mounted && galaxyArms.map((arm, i) => (
        <motion.div
          key={`arm-${i}`}
          className="absolute top-1/2 left-1/2"
          style={{
            width: '350vw',
            height: '350vh',
            marginLeft: '-175vw',
            marginTop: '-175vh',
            background: `
              conic-gradient(from ${arm.rotate}deg at 50% 50%,
                transparent 0deg,
                rgba(147, 197, 253, ${arm.opacity}) 15deg,
                rgba(196, 181, 253, ${arm.opacity * 0.8}) 30deg,
                rgba(244, 114, 182, ${arm.opacity * 0.6}) 45deg,
                transparent 60deg,
                transparent 360deg
              )
            `,
            filter: 'blur(120px)',
            transform: `scale(${arm.scale})`,
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 700 + i * 80, repeat: Infinity, ease: "linear" }}
        />
      ))}

      {mounted && (
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '80vw',
            height: '80vh',
            background: `
              radial-gradient(ellipse at center,
                rgba(255, 255, 255, 0.05) 0%,
                rgba(199, 210, 254, 0.03) 15%,
                rgba(165, 180, 252, 0.02) 30%,
                rgba(139, 92, 246, 0.01) 50%,
                transparent 70%
              )
            `,
            filter: 'blur(50px)',
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <AnimatePresence>
        {mounted && nebulae.map((nebula, i) => (
          <motion.div
            key={`nebula-${i}`}
            className="absolute rounded-full"
            style={{
              background: `radial-gradient(ellipse at center, ${nebula.colors.join(', ')})`,
              width: nebula.width,
              height: nebula.height,
              left: nebula.left,
              top: nebula.top,
              filter: `blur(${nebula.blur}px)`,
              mixBlendMode: 'screen',
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.5, 0.8, 0.5],
              scale: [1, 1.08, 1],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: nebula.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </AnimatePresence>

      <motion.div style={{ y: layer4Y }} className="absolute inset-0">
        {mounted && starLayers[3].map((star) => (
          <GiantStar key={star.id} {...star} />
        ))}
      </motion.div>

      <motion.div style={{ y: layer1Y }} className="absolute inset-0">
        {mounted && starLayers[0].map((star) => (
          <StarItem key={star.id} {...star} />
        ))}
      </motion.div>

      <motion.div style={{ y: layer2Y }} className="absolute inset-0">
        {mounted && starLayers[1].map((star) => (
          <StarItem key={star.id} {...star} />
        ))}
      </motion.div>

      <motion.div style={{ y: layer3Y }} className="absolute inset-0">
        {mounted && starLayers[2].map((star) => (
          <StarItem key={star.id} {...star} />
        ))}
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
            filter: 'blur(1px)',
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            opacity: [dust.opacity, dust.opacity * 2.5, dust.opacity],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: dust.duration,
            repeat: Infinity,
            delay: dust.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {mounted && meteorData.map((meteor) => (
        <motion.div
          key={meteor.id}
          className="absolute"
          style={{
            width: `${meteor.size}px`,
            height: meteor.isComet ? '4px' : '2px',
            left: meteor.left,
            top: meteor.top,
            transform: `rotate(${meteor.rotate}deg)`,
            background: meteor.isComet 
              ? `linear-gradient(90deg, transparent 0%, ${meteor.color}44 15%, ${meteor.color}aa 50%, ${meteor.color} 85%, #ffffff 100%)`
              : `linear-gradient(90deg, transparent 0%, ${meteor.color}88 40%, ${meteor.color} 70%, transparent 100%)`,
            boxShadow: meteor.isComet 
              ? `0 0 40px ${meteor.color}, 0 0 80px ${meteor.color}88, 0 0 120px ${meteor.color}44`
              : `0 0 20px ${meteor.color}`,
            borderRadius: '50%',
          }}
          animate={{
            x: [0, -1400],
            y: [0, 700],
            opacity: [0, 1, 1, 0],
            scaleX: meteor.isComet ? [0, 1, 1, 0.2] : [0, 1.5, 0],
          }}
          transition={{
            duration: meteor.duration,
            repeat: Infinity,
            repeatDelay: meteor.repeatDelay,
            delay: meteor.delay,
            ease: meteor.isComet ? "linear" : "easeOut"
          }}
        >
          {meteor.isComet && (
            <motion.div 
              className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-white"
              style={{ 
                width: '8px',
                height: '8px',
                boxShadow: `0 0 25px 10px ${meteor.color}, 0 0 50px 20px ${meteor.color}88` 
              }}
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 0.25, repeat: Infinity }}
            />
          )}
        </motion.div>
      ))}

      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 50% 30% at 20% 20%, rgba(255, 255, 255, 0.03) 0%, transparent 50%),
            radial-gradient(ellipse 40% 25% at 80% 30%, rgba(200, 220, 255, 0.02) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 70% 80%, rgba(255, 200, 150, 0.015) 0%, transparent 50%),
            radial-gradient(ellipse 45% 35% at 15% 75%, rgba(150, 255, 200, 0.015) 0%, transparent 50%)
          `,
        }}
      />

      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(0, 0, 10, 0.3) 100%)',
        }}
      />
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
      background: isGiant 
        ? `radial-gradient(circle, ${color} 0%, ${color}88 40%, transparent 70%)`
        : color,
      boxShadow: isGiant 
        ? `0 0 ${size * 6}px ${color}, 0 0 ${size * 12}px ${color}66, 0 0 ${size * 18}px ${color}33`
        : size > 2 
          ? `0 0 ${size * 4}px ${color}88` 
          : 'none',
    }}
    animate={{
      opacity: isPulsating 
        ? [opacity, opacity * 0.2, opacity] 
        : [opacity, opacity * 0.5, opacity],
      scale: isPulsating 
        ? [1, 1.8, 0.6, 1] 
        : [1, 1.15, 1],
    }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: isPulsating ? 'easeInOut' : 'linear',
    }}
  />
);

const GiantStar = ({ size, left, top, color, opacity, duration, delay }: any) => (
  <motion.div
    className="absolute"
    style={{
      left,
      top,
    }}
  >
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size * 4 + 'px',
        height: size * 4 + 'px',
        transform: 'translate(-50%, -50%)',
        background: `radial-gradient(circle, ${color}33 0%, transparent 70%)`,
        filter: 'blur(10px)',
      }}
      animate={{
        scale: [1, 1.6, 1],
        opacity: [0.4, 0.7, 0.4],
      }}
      transition={{
        duration: duration * 1.5,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    />
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size + 'px',
        height: size + 'px',
        transform: 'translate(-50%, -50%)',
        background: `radial-gradient(circle, #ffffff 0%, ${color} 30%, ${color}66 60%, transparent 80%)`,
        boxShadow: `0 0 ${size * 5}px ${color}, 0 0 ${size * 10}px ${color}aa, 0 0 ${size * 20}px ${color}55`,
      }}
      animate={{
        opacity: [opacity, opacity * 0.6, opacity],
        scale: [1, 1.25, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    />
    <motion.div
      className="absolute"
      style={{
        width: size * 5 + 'px',
        height: '2px',
        transform: 'translate(-50%, -50%)',
        background: `linear-gradient(90deg, transparent 0%, ${color}55 25%, ${color} 50%, ${color}55 75%, transparent 100%)`,
      }}
      animate={{
        opacity: [0.4, 0.9, 0.4],
        scaleX: [0.7, 1.3, 0.7],
      }}
      transition={{
        duration: duration * 0.7,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    />
    <motion.div
      className="absolute"
      style={{
        width: '2px',
        height: size * 5 + 'px',
        transform: 'translate(-50%, -50%)',
        background: `linear-gradient(180deg, transparent 0%, ${color}55 25%, ${color} 50%, ${color}55 75%, transparent 100%)`,
      }}
      animate={{
        opacity: [0.4, 0.9, 0.4],
        scaleY: [0.7, 1.3, 0.7],
      }}
      transition={{
        duration: duration * 0.7,
        repeat: Infinity,
        delay: delay + 0.15,
        ease: 'easeInOut',
      }}
    />
    <motion.div
      className="absolute"
      style={{
        width: size * 3 + 'px',
        height: '1px',
        transform: 'translate(-50%, -50%) rotate(45deg)',
        background: `linear-gradient(90deg, transparent 0%, ${color}44 30%, ${color}88 50%, ${color}44 70%, transparent 100%)`,
      }}
      animate={{
        opacity: [0.2, 0.6, 0.2],
      }}
      transition={{
        duration: duration * 0.6,
        repeat: Infinity,
        delay: delay + 0.1,
        ease: 'easeInOut',
      }}
    />
    <motion.div
      className="absolute"
      style={{
        width: size * 3 + 'px',
        height: '1px',
        transform: 'translate(-50%, -50%) rotate(-45deg)',
        background: `linear-gradient(90deg, transparent 0%, ${color}44 30%, ${color}88 50%, ${color}44 70%, transparent 100%)`,
      }}
      animate={{
        opacity: [0.2, 0.6, 0.2],
      }}
      transition={{
        duration: duration * 0.6,
        repeat: Infinity,
        delay: delay + 0.2,
        ease: 'easeInOut',
      }}
    />
  </motion.div>
);

export default StarField;
