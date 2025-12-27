import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useMemo, useRef, useState, useEffect } from 'react';

interface StarFieldProps {
  count?: number;
}

const StarField = ({ count = 350 }: StarFieldProps) => {
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

    const dust = [...Array(80)].map((_, i) => ({
      id: `dust-${i}`,
      left: Math.random() * 100 + '%',
      top: Math.random() * 100 + '%',
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.15 + 0.05,
      duration: Math.random() * 30 + 20,
      delay: Math.random() * 15,
      color: ['#ffffff', '#aaccff', '#ffddcc'][Math.floor(Math.random() * 3)],
    }));
    setCosmicDust(dust);

    const meteors = [...Array(12)].map((_, i) => {
      const isComet = i < 3;
      const meteorColors = ['#ffffff', '#aaddff', '#ffcc88', '#88ffff'];
      const color = isComet ? '#66ddff' : meteorColors[i % meteorColors.length];
      
      return {
        id: `meteor-${i}`,
        isComet,
        color,
        duration: isComet ? 4 + Math.random() * 3 : 0.8 + Math.random() * 1.2,
        delay: Math.random() * 40 + i * 4,
        size: isComet ? 400 + Math.random() * 300 : 150 + Math.random() * 150,
        left: Math.random() * 100 + '%',
        top: Math.random() * 70 + '%',
        rotate: -30 - Math.random() * 25,
        repeatDelay: Math.random() * 25 + 20,
      };
    });
    setMeteorData(meteors);
  }, [count]);

  const nebulae = useMemo(() => [
    {
      colors: ['rgba(139, 92, 246, 0.08)', 'rgba(59, 130, 246, 0.06)', 'transparent'],
      width: '180vw',
      height: '160vh',
      left: '-40%',
      top: '-30%',
      duration: 120,
      blur: 120,
    },
    {
      colors: ['rgba(236, 72, 153, 0.06)', 'rgba(168, 85, 247, 0.05)', 'transparent'],
      width: '160vw',
      height: '140vh',
      left: '20%',
      top: '10%',
      duration: 150,
      blur: 150,
    },
    {
      colors: ['rgba(34, 211, 238, 0.05)', 'rgba(59, 130, 246, 0.04)', 'transparent'],
      width: '200vw',
      height: '180vh',
      left: '-60%',
      top: '30%',
      duration: 180,
      blur: 180,
    },
    {
      colors: ['rgba(251, 146, 60, 0.04)', 'rgba(239, 68, 68, 0.03)', 'transparent'],
      width: '140vw',
      height: '120vh',
      left: '50%',
      top: '-20%',
      duration: 200,
      blur: 100,
    },
  ], []);

  const galaxyArms = useMemo(() => [
    { rotate: 0, scale: 1, opacity: 0.03 },
    { rotate: 72, scale: 0.9, opacity: 0.025 },
    { rotate: 144, scale: 1.1, opacity: 0.02 },
    { rotate: 216, scale: 0.95, opacity: 0.025 },
    { rotate: 288, scale: 1.05, opacity: 0.02 },
  ], []);

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-[#030014]" />
      
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 150% 100% at 50% 0%, rgba(30, 27, 75, 0.4) 0%, transparent 50%),
            radial-gradient(ellipse 100% 150% at 100% 50%, rgba(88, 28, 135, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse 100% 150% at 0% 50%, rgba(30, 58, 138, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse 80% 80% at 50% 100%, rgba(17, 24, 39, 0.8) 0%, transparent 50%)
          `,
        }}
      />

      {mounted && (
        <motion.div 
          className="absolute"
          style={{
            width: '250vw',
            height: '250vh',
            left: '-75%',
            top: '-75%',
            background: `
              conic-gradient(from 0deg at 50% 50%, 
                transparent 0deg, 
                rgba(139, 92, 246, 0.015) 30deg, 
                transparent 60deg,
                rgba(59, 130, 246, 0.01) 90deg,
                transparent 120deg,
                rgba(236, 72, 153, 0.01) 150deg,
                transparent 180deg,
                rgba(34, 211, 238, 0.015) 210deg,
                transparent 240deg,
                rgba(168, 85, 247, 0.01) 270deg,
                transparent 300deg,
                rgba(251, 146, 60, 0.01) 330deg,
                transparent 360deg
              )
            `,
            filter: 'blur(60px)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 600, repeat: Infinity, ease: "linear" }}
        />
      )}

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
                rgba(147, 197, 253, ${arm.opacity}) 20deg,
                rgba(196, 181, 253, ${arm.opacity * 0.8}) 40deg,
                transparent 70deg,
                transparent 360deg
              )
            `,
            filter: 'blur(100px)',
            transform: `scale(${arm.scale})`,
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 800 + i * 100, repeat: Infinity, ease: "linear" }}
        />
      ))}

      {mounted && (
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '60vw',
            height: '60vh',
            background: `
              radial-gradient(ellipse at center,
                rgba(255, 255, 255, 0.03) 0%,
                rgba(199, 210, 254, 0.02) 20%,
                rgba(165, 180, 252, 0.01) 40%,
                transparent 70%
              )
            `,
            filter: 'blur(40px)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
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
              opacity: [0.4, 0.7, 0.4],
              scale: [1, 1.05, 1],
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
            background: dust.color,
            opacity: dust.opacity,
            filter: 'blur(1px)',
          }}
          animate={{
            x: [0, 80, 0],
            y: [0, 40, 0],
            opacity: [dust.opacity, dust.opacity * 2, dust.opacity],
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
            height: meteor.isComet ? '3px' : '2px',
            left: meteor.left,
            top: meteor.top,
            transform: `rotate(${meteor.rotate}deg)`,
            background: meteor.isComet 
              ? `linear-gradient(90deg, transparent 0%, ${meteor.color}44 20%, ${meteor.color} 80%, #ffffff 100%)`
              : `linear-gradient(90deg, transparent 0%, ${meteor.color}88 40%, ${meteor.color} 70%, transparent 100%)`,
            boxShadow: meteor.isComet 
              ? `0 0 30px ${meteor.color}, 0 0 60px ${meteor.color}66`
              : `0 0 15px ${meteor.color}`,
            borderRadius: '50%',
          }}
          animate={{
            x: [0, -1200],
            y: [0, 600],
            opacity: [0, 1, 1, 0],
            scaleX: meteor.isComet ? [0, 1, 1, 0.3] : [0, 1.5, 0],
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
                width: '6px',
                height: '6px',
                boxShadow: `0 0 20px 8px ${meteor.color}, 0 0 40px 15px ${meteor.color}66` 
              }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.3, repeat: Infinity }}
            />
          )}
        </motion.div>
      ))}

      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 50% 30% at 20% 20%, rgba(255, 255, 255, 0.02) 0%, transparent 50%),
            radial-gradient(ellipse 40% 25% at 80% 30%, rgba(200, 220, 255, 0.015) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 70% 80%, rgba(255, 200, 150, 0.01) 0%, transparent 50%)
          `,
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
        ? `0 0 ${size * 6}px ${color}, 0 0 ${size * 12}px ${color}66`
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
        width: size * 3 + 'px',
        height: size * 3 + 'px',
        transform: 'translate(-50%, -50%)',
        background: `radial-gradient(circle, ${color}22 0%, transparent 70%)`,
        filter: 'blur(8px)',
      }}
      animate={{
        scale: [1, 1.5, 1],
        opacity: [0.3, 0.6, 0.3],
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
        boxShadow: `0 0 ${size * 4}px ${color}, 0 0 ${size * 8}px ${color}88, 0 0 ${size * 16}px ${color}44`,
      }}
      animate={{
        opacity: [opacity, opacity * 0.6, opacity],
        scale: [1, 1.2, 1],
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
        width: size * 4 + 'px',
        height: '2px',
        transform: 'translate(-50%, -50%)',
        background: `linear-gradient(90deg, transparent 0%, ${color}44 30%, ${color} 50%, ${color}44 70%, transparent 100%)`,
      }}
      animate={{
        opacity: [0.3, 0.8, 0.3],
        scaleX: [0.8, 1.2, 0.8],
      }}
      transition={{
        duration: duration * 0.8,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    />
    <motion.div
      className="absolute"
      style={{
        width: '2px',
        height: size * 4 + 'px',
        transform: 'translate(-50%, -50%)',
        background: `linear-gradient(180deg, transparent 0%, ${color}44 30%, ${color} 50%, ${color}44 70%, transparent 100%)`,
      }}
      animate={{
        opacity: [0.3, 0.8, 0.3],
        scaleY: [0.8, 1.2, 0.8],
      }}
      transition={{
        duration: duration * 0.8,
        repeat: Infinity,
        delay: delay + 0.2,
        ease: 'easeInOut',
      }}
    />
  </motion.div>
);

export default StarField;
