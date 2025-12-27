import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useMemo, useRef, useState, useEffect } from 'react';

interface StarFieldProps {
  count?: number;
}

const StarField = ({ count = 200 }: StarFieldProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [cloudsCleared, setCloudsCleared] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Create different star layers for parallax effect
  const layer1Y = useTransform(scrollY, [0, 1000], [0, -100]);
  const layer2Y = useTransform(scrollY, [0, 1000], [0, -250]);
  const layer3Y = useTransform(scrollY, [0, 1000], [0, -400]);

  // Parallax for nebulae
  const nebula1Y = useTransform(scrollY, [0, 1000], [0, -150]);
  const nebula2Y = useTransform(scrollY, [0, 1000], [0, -300]);
  const nebula3Y = useTransform(scrollY, [0, 1000], [0, -450]);

  const [starLayers, setStarLayers] = useState<any[][]>([[], [], []]);
  const [cosmicDust, setCosmicDust] = useState<any[]>([]);
  const [meteorData, setMeteorData] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);

    // Generate stars
    const layers = [[], [], []];
    const colors = [
      'hsl(var(--starlight))',
      'hsl(var(--electric-blue))',
      'hsl(var(--cosmic-orange))',
      '#ffffff',
      '#b3d9ff',
      '#ffe6cc'
    ];

    for (let i = 0; i < count; i++) {
      const layerIndex = Math.floor(Math.random() * 3);
      const size = Math.random() * (layerIndex === 2 ? 3 : 1.5) + 0.5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const isVariable = Math.random() > 0.85;
      
      layers[layerIndex].push({
        id: i,
        size,
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        color,
        opacity: Math.random() * 0.7 + 0.3,
        duration: isVariable ? Math.random() * 2 + 1 : Math.random() * 4 + 3,
        delay: Math.random() * 5,
        isVariable,
      });
    }
    setStarLayers(layers);

    // Generate cosmic dust
    const dust = [...Array(40)].map((_, i) => ({
      id: `dust-${i}`,
      left: Math.random() * 100 + '%',
      top: Math.random() * 100 + '%',
      size: Math.random() * 4 + 2,
      opacity: Math.random() * 0.3 + 0.1,
      duration: Math.random() * 20 + 20,
      delay: Math.random() * 10,
    }));
    setCosmicDust(dust);

    // Generate meteor data
    const meteors = [...Array(8)].map((_, i) => {
      const isComet = i < 2;
      const meteorColors = ['#ffffff', 'hsl(var(--electric-blue))', 'hsl(var(--cosmic-orange))', '#b3d9ff'];
      const color = isComet ? 'hsl(var(--electric-blue) / 0.8)' : meteorColors[i % meteorColors.length];
      const duration = isComet ? 3 + Math.random() * 2 : 0.6 + Math.random() * 0.8;
      const delay = Math.random() * 30 + i * 5;
      const size = isComet ? 300 + Math.random() * 200 : 100 + Math.random() * 100;
      
      return {
        id: `celestial-${i}`,
        isComet,
        color,
        duration,
        delay,
        size,
        left: Math.random() * 100 + '%',
        top: Math.random() * 80 + '%',
        rotate: -25 - Math.random() * 20,
        repeatDelay: Math.random() * 20 + 15,
      };
    });
    setMeteorData(meteors);
  }, [count]);

    const nebulae = useMemo(() => {
      return [
        {
          color: 'hsla(210, 80%, 40%, 0.15)', // Electric Blue Nebula
          width: '140vw',
          height: '120vh',
          left: '-20%',
          top: '-10%',
          duration: 60,
          y: nebula1Y,
          rotate: [0, 360],
          blendMode: 'screen' as const,
        },
        {
          color: 'hsla(280, 70%, 50%, 0.12)', // Purple Nebula
          width: '120vw',
          height: '100vh',
          left: '30%',
          top: '30%',
          duration: 80,
          y: nebula2Y,
          rotate: [360, 0],
          blendMode: 'plus-lighter' as const,
        },
        {
          color: 'hsla(180, 70%, 50%, 0.1)', // Teal Nebula
          width: '150vw',
          height: '130vh',
          left: '-40%',
          top: '20%',
          duration: 100,
          y: nebula3Y,
          rotate: [0, -360],
          blendMode: 'screen' as const,
        }
      ];
    }, [nebula1Y, nebula2Y, nebula3Y]);

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-space-deep">
      {/* Deep Space Background Gradient */}
      <div className="absolute inset-0 bg-space-gradient opacity-60" />

      {/* Realistic Nebulae with Blend Modes and Rotation */}
      <AnimatePresence>
        {mounted && !cloudsCleared && nebulae.map((nebula, i) => (
          <motion.div
            key={`nebula-${i}`}
            className="absolute rounded-full blur-[150px]"
            style={{
              background: `radial-gradient(circle, ${nebula.color} 0%, transparent 80%)`,
              width: nebula.width,
              height: nebula.height,
              left: nebula.left,
              top: nebula.top,
              y: nebula.y,
              mixBlendMode: nebula.blendMode,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.6, 0.9, 0.6],
              rotate: nebula.rotate,
            }}
            exit={{ 
              opacity: 0, 
              scale: 1.5,
              filter: 'blur(200px)',
              transition: { duration: 2, ease: "easeOut" }
            }}
            transition={{
              duration: nebula.duration,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </AnimatePresence>

      {/* Galactic Core Glow Enhancement */}
      <AnimatePresence>
        {mounted && !cloudsCleared && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0, transition: { duration: 3 } }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vh] blur-[200px]"
            style={{
              background: 'radial-gradient(circle, hsla(210, 100%, 70%, 0.1) 0%, hsla(280, 100%, 50%, 0.05) 30%, transparent 70%)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Star Layers */}
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

      {/* Cosmic Dust Particles */}
      {mounted && cosmicDust.map((dust) => (
        <motion.div
          key={dust.id}
          className="absolute rounded-full bg-white blur-[1px]"
          style={{
            width: dust.size + 'px',
            height: dust.size + 'px',
            left: dust.left,
            top: dust.top,
            opacity: dust.opacity,
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
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
      
        {/* Upgraded Meteor Showers & Comets System */}
        {mounted && meteorData.map((meteor) => (
          <motion.div
            key={meteor.id}
            className="absolute h-[1.5px] blur-[0.5px]"
            style={{
              width: `${meteor.size}px`,
              left: meteor.left,
              top: meteor.top,
              transform: `rotate(${meteor.rotate}deg)`,
              background: meteor.isComet 
                ? `linear-gradient(90deg, transparent 0%, ${meteor.color} 80%, white 100%)`
                : `linear-gradient(90deg, transparent 0%, ${meteor.color} 50%, transparent 100%)`,
              boxShadow: meteor.isComet ? `0 0 20px ${meteor.color}` : `0 0 10px ${meteor.color}`,
              zIndex: meteor.isComet ? 1 : 0,
            }}
            animate={{
              x: [0, -1000],
              y: [0, 500],
              opacity: [0, 1, 1, 0],
              scaleX: meteor.isComet ? [0, 1, 1, 0.5] : [0, 2, 0],
            }}
            transition={{
              duration: meteor.duration,
              repeat: Infinity,
              repeatDelay: meteor.repeatDelay,
              delay: meteor.delay,
              ease: meteor.isComet ? "linear" : "easeOut"
            }}
          >
            {/* Comet Head Glow */}
            {meteor.isComet && (
              <motion.div 
                className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white"
                style={{ boxShadow: `0 0 15px 5px ${meteor.color}` }}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 0.2, repeat: Infinity }}
              />
            )}
          </motion.div>
        ))}
    </div>
  );
};

const StarItem = ({ size, left, top, color, opacity, duration, delay, isVariable }: any) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: size + 'px',
      height: size + 'px',
      left,
      top,
      background: color,
      boxShadow: (size > 2 || isVariable) ? `0 0 ${size * 4}px ${color}` : 'none',
    }}
    animate={{
      opacity: isVariable ? [opacity, opacity * 0.1, opacity] : [opacity, opacity * 0.3, opacity],
      scale: isVariable ? [1, 1.5, 0.8, 1] : [1, 1.2, 1],
    }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: isVariable ? 'anticipate' : 'easeInOut',
    }}
  />
);

export default StarField;
